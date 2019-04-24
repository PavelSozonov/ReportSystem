package ru.innoreport.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.innoreport.dao.Report;
import ru.innoreport.dao.ReportHistory;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReportService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Report> getReportsView() {

        return jdbcTemplate.query(
                "SELECT * FROM v_reports",
                (rs, rowNum) -> new Report(rs.getLong("nid"),
                        rs.getString("stitle"),
                        rs.getString("sdescription"),
                        rs.getString("ssender"),
                        rs.getString("srecipient"),
                        rs.getInt("nstatus"),
                        rs.getString("dchangedate"),
                        rs.getString("snumber")
                )
        ).stream().collect(Collectors.toList());
    }

    public List<ReportHistory> getReportHistoryView() {

        return jdbcTemplate.query(
                "SELECT * FROM v_reporthistory",
                (rs, rowNum) -> new ReportHistory(rs.getLong("nid"),
                        rs.getLong("nreport"),
                        rs.getString("snumber"),
                        rs.getInt("nstatus"),
                        rs.getString("dchangedate")
                )
        ).stream().collect(Collectors.toList());
    }

    public Report getReport(Long id) {

        return jdbcTemplate.query(
                "SELECT * FROM reports WHERE id=?", new Object[] { id },
                (rs, rowNum) -> new Report(rs.getLong("id"),
                        rs.getString("title"),
                        rs.getString("description"),
                        rs.getString("sender"),
                        rs.getString("recipient"),
                        rs.getInt("status"),
                        rs.getString("changedate"),
                        rs.getString("number")
                )
        ).stream().collect(Collectors.toList()).get(0);
    }
}
