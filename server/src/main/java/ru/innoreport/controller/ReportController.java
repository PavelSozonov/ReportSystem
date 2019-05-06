package ru.innoreport.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.innoreport.dao.Report;
import ru.innoreport.dao.ReportHistory;
import ru.innoreport.dao.ReportTags;
import ru.innoreport.service.classification.ClassificationService;
import ru.innoreport.service.report.processing.ReportService;
import ru.innoreport.service.storage.StorageService;

import javax.json.JsonObject;
import java.util.List;
import java.util.stream.Collectors;

import static ru.innoreport.util.JsonUtils.getJsonObjectWithParams;
import static ru.innoreport.util.JsonUtils.removeQuotes;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ReportController {

    @Autowired
    ReportService reportService;

    @Autowired
    ClassificationService classificationService;

    @Autowired
    StorageService storageService;

    @DeleteMapping(path = "/reports/{id}")
    public String deleteFromReport(@PathVariable("id") String id) throws Exception {
        return reportService.deleteFromReports(id);
    }

    @PostMapping(path = "/reports", consumes = "application/json")
    public String insertIntoReports(@RequestBody(required = true) String json) throws Exception {
        JsonObject jsonObject = getJsonObjectWithParams(json);
        final String title = removeQuotes(jsonObject.get("title").toString());
        final String description = removeQuotes(jsonObject.get("description").toString());
        final String sender = removeQuotes(jsonObject.get("sender").toString());
        final String imageBase64 = removeQuotes(jsonObject.get("image").toString());
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

        // Upload image
        if (imageBase64 != null && !imageBase64.isEmpty()) {
            storageService.saveFile(imageBase64, reportId);
        }

        return reportId;
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
}
