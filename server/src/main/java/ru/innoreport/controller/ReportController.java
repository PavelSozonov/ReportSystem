/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ru.innoreport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.innoreport.service.ReportService;
import ru.innoreport.dao.Report;

import java.util.List;

@RestController
public class ReportController {

    @Autowired
    ReportService reportService;

    @GetMapping("/reports")
    public List<Report> getReports() {
        return reportService.getReports();
    }
}
