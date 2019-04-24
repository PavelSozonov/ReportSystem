package ru.innoreport.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.innoreport.dao.Report;
import ru.innoreport.dao.ReportHistory;
import ru.innoreport.dao.ReportTags;
import ru.innoreport.service.ReportService;

import java.util.List;

@RestController
public class ReportController {

    @Autowired
    ReportService reportService;

    @GetMapping("/report")
    public List<Report> getReportsView() {
        return reportService.getReportsView();
    }

    @GetMapping("/report/{id}")
    public Report getReport(@PathVariable("id") Long id) {
        return reportService.getReport(id);
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

    @PostMapping(path = "/report/tag", consumes = "application/json")
    public String insertReportTags(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        String report = jsonObject.get("report").toString();
        String tag = jsonObject.get("tag").toString();
        return reportService.insertReportTags(report, tag);
    }

    @PostMapping(path = "/report/status", consumes = "application/json")
    public String sendReportStatus(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        String id = jsonObject.get("id").toString();
        String entity = jsonObject.get("entity").toString();
        return reportService.sendReportStatus(id, entity);
    }

    @PostMapping(path = "/report", consumes = "application/json")
    public String insertIntoReports(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        String title = jsonObject.get("title").toString();
        String description = jsonObject.get("description").toString();
        String sender = jsonObject.get("description").toString();
        return reportService.insertIntoReports(title, description, sender);
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
    }}
