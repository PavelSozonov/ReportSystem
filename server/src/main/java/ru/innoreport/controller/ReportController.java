package ru.innoreport.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.innoreport.dao.Report;
import ru.innoreport.dao.ReportHistory;
import ru.innoreport.dao.ReportTags;
import ru.innoreport.service.classification.ClassificationService;
import ru.innoreport.service.report.processing.ReportService;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import java.io.StringReader;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ReportController {

    @Autowired
    ReportService reportService;

    @Autowired
    ClassificationService classificationService;

    @PostMapping(path = "/reports", consumes = "application/json")
    public String insertIntoReports(@RequestBody(required = true) String json) throws Exception {
        JsonObject jsonObject = getJsonObject(json);
        if (!Objects.isNull(jsonObject.get("params"))) {
            jsonObject = getJsonObject(jsonObject.get("params").toString());
        }
        final String title = removeQuotes(jsonObject.get("title").toString());
        final String description = removeQuotes(jsonObject.get("description").toString());
        final String sender = removeQuotes(jsonObject.get("sender").toString());
        final List<String> tags = jsonObject
                .getJsonArray("tags")
                .stream()
                .map(x -> removeQuotes(x.toString()))
                .collect(Collectors.toList());

        // Create report
        final String reportId = reportService.insertIntoReports(title, description, sender);

        // Set tags
        tags.stream().forEach(t -> reportService.insertReportTags(reportId, t));

        // Set entity
        classificationService.setEntityCode(reportId);

        return reportId;
    }

    private JsonObject getJsonObject(@RequestBody(required = true) String json) {
        JsonObject jsonObject;
        try (JsonReader jsonReader = Json.createReader(new StringReader(json))) {
            jsonObject = jsonReader.readObject();
        }
        return jsonObject;
    }

    @PostMapping(path = "/reports/tags", consumes = "application/json")
    public String insertReportTags(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        String reportId = jsonObject.get("report").toString();
        String tag = jsonObject.get("tag").toString();
        return reportService.insertReportTags(reportId, tag);
    }

    @GetMapping(path = "/tags")
    public List<String> getAllTags() {
        return reportService.getAllTags();
    }

    @GetMapping(path = "/reports/{id}/tags")
    public List<String> getTagsForReport(@PathVariable("id") String id) {
        return reportService.getTagsForReport(id);
    }

    @GetMapping("/reports/{username}")
    public List<Report> getReportsView(@PathVariable("username") String username) {
        return reportService.getReportsView(username, null);
    }

    @GetMapping("/reports/{username}/{entity}")
    public List<Report> getReportsView(@PathVariable("username") String username,
                                       @PathVariable("entity") String entity) {
        return reportService.getReportsView(username, entity);
    }

    @GetMapping("/report/history")
    public List<ReportHistory> getReportHistoryView() {
        return reportService.getReportHistoryView();
    }

    @GetMapping("/report/tag")
    public List<ReportTags> getReportTagView() {
        return reportService.getReportTagsView();
    }

    @PostMapping(path = "/tag", consumes = "application/json")
    public String insertIntoTagList(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        String code = jsonObject.get("code").toString();
        String name = jsonObject.get("name").toString();
        return reportService.insertIntoTagList(code, name);
    }

    @PostMapping(path = "/report/status", consumes = "application/json")
    public String sendReportStatus(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        String id = jsonObject.get("id").toString();
        String entity = jsonObject.get("entity").toString();
        return reportService.sendReportStatus(id, entity);
    }

    @PutMapping(path = "/report/status", consumes = "application/json")
    public String updateReportStatus(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        String id = jsonObject.get("id").toString();
        String status = jsonObject.get("status").toString();
        return reportService.updateReportStatus(id, status);
    }

    @PostMapping(path = "/report/history", consumes = "application/json")
    public String insertIntoReportHistory(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        String report = jsonObject.get("report").toString();
        String status = jsonObject.get("changeDate").toString();
        String changeDate = jsonObject.get("changeDate").toString();
        return reportService.insertIntoReportHistory(report, status, changeDate);
    }

    private String removeQuotes(String value) {
        if (value.startsWith("\"")) {
            return value.substring(1, value.length() - 1);
        }
        return value;
    }
}
