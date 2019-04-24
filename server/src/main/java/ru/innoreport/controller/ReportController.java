/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ru.innoreport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
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

    @GetMapping("/report_history")
    public List<ReportHistory> getReportHistoryView() {
        return reportService.getReportHistoryView();
    }

    @GetMapping("/report_tags")
    public List<ReportTags> getReportTagView() {
        return reportService.getReportTagsView();
    }
}
