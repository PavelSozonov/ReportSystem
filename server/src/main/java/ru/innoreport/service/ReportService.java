package ru.innoreport.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.innoreport.dao.Report;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReportService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Report> getReports() {

        return jdbcTemplate.query(
                "SELECT id, title, description, sender, recipient, status, changedate, number FROM reports",
                (rs, rowNum) -> new Report(rs.getLong("id"),
                        rs.getString("title"),
                        rs.getString("description"),
                        rs.getString("sender"),
                        rs.getString("recipient"),
                        rs.getInt("status"),
                        rs.getString("changedate"),
                        rs.getString("number")
                        )
        ).stream().collect(Collectors.toList());
    }

}
