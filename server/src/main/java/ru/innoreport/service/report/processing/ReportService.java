package ru.innoreport.service.report.processing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Component;
import ru.innoreport.dao.Report;
import ru.innoreport.dao.ReportHistory;
import ru.innoreport.dao.ReportTags;
import ru.innoreport.dao.TagEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SuppressWarnings("javadoc")
@Component
public class ReportService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Report> getReportsView(String username, String entity) {
        String queryString = "SELECT * FROM v_reports";
        queryString = entity != null
            ? queryString + " WHERE srecipient = '" + entity + "'"
            : queryString;

        return (List<Report>)jdbcTemplate.query(
            queryString, (rs, rowNum) -> new Report(rs.getLong("nid"),
                rs.getString("stitle"),
                rs.getString("sdescription"),
                rs.getString("ssender"),
                rs.getString("srecipient"),
                rs.getInt("nstatus"),
                rs.getTimestamp("dchangedate").getTime(),
                rs.getString("snumber")
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
                        rs.getTimestamp("changedate").getTime(),
                        rs.getString("number")
                )
        ).stream().collect(Collectors.toList()).get(0);
    }

    public List<ReportTags> getReportTagsView() {

        return jdbcTemplate.query(
                "SELECT * FROM v_reporttags",
                (rs, rowNum) -> new ReportTags(rs.getLong("nid"),
                        rs.getLong("nreport"),
                        rs.getString("snumber"),
                        rs.getString("scode")
                )
        ).stream().collect(Collectors.toList());
    }

    public String insertIntoReportHistory(String report, String status, String changeDate) {
        final SimpleJdbcCall insertIntoReportHistory = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_reporthistory_insert");
        final Map<String, Object> params = new HashMap<>();
        params.put("nreport", report);
        params.put("nstatus", status);
        params.put("dchangedate", changeDate);

        final Map<String, Object> result = insertIntoReportHistory.execute(params);
        return result.get("returnvalue").toString();
    }

    public String updateReportStatus(String id, String status) {
        final SimpleJdbcCall changeReportStatus = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_reports_changestatus");
        final Map<String, Object> params = new HashMap<>();
        params.put("nid", id);
        params.put("nstatus", status);

        final Map<String, Object> result = changeReportStatus.execute(params);
        return result.get("returnvalue").toString();
    }

    public String deleteFromReports(String id) {
        final SimpleJdbcCall deleteFromReports = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_reports_delete");
        final Map<String, Object> params = new HashMap<>();
        params.put("nid", id);

        final Map<String, Object> result = deleteFromReports.execute(params);
        return result.get("returnvalue").toString();
    }

    public String insertIntoReports(String title, String description, String sender) {
        final SimpleJdbcCall insertIntoReports = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_reports_insert");
        final Map<String, Object> params = new HashMap<>();
        params.put("stitle", title);
        params.put("sdescription", description);
        params.put("ssender", sender);

        final Map<String, Object> result = insertIntoReports.execute(params);
        return result.get("returnvalue").toString();
    }

    public String sendReportStatus(String id, String entity) {
        final SimpleJdbcCall sentReportsStatus = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_reports_send");
        final Map<String, Object> params = new HashMap<>();
        params.put("nid", id);
        params.put("sentity", entity);

        final Map<String, Object> result = sentReportsStatus.execute(params);
        return result.get("returnvalue").toString();
    }

    public String insertReportTags(String reportId, String tag) {
        final SimpleJdbcCall insertReportTags = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_reporttags_insert");
        final Map<String, Object> params = new HashMap<>();
        params.put("nreport", Long.parseLong(reportId));
        params.put("stag", tag);

        final Map<String, Object> result = insertReportTags.execute(params);
        return result.get("returnvalue").toString();
    }

    public String insertIntoTagList(String code, String name, String entity) {
        final SimpleJdbcCall insertIntoTagList = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_taglist_insert");
        final Map<String, Object> params = new HashMap<>();
        params.put("scode", code);
        params.put("sname", name);
        params.put("sentity", entity);

        final Map<String, Object> result = insertIntoTagList.execute(params);
        return result.get("returnvalue").toString();
    }

    public List<String> getTagsForReport(String id) {
        String queryString = "SELECT scode FROM v_reporttags WHERE nreport = '" + id + "'";

        return (List<String>)jdbcTemplate.query(
                queryString, (rs, rowNum) -> new String(rs.getString("scode"))
        ).stream().collect(Collectors.toList());
    }

    public List<ReportHistory> getHistoryForReport(String id) {
        String queryString = "SELECT nstatus, dchangedate FROM v_reporthistory WHERE nreport = '" + id + "'";

        return (List<ReportHistory>)jdbcTemplate.query(
                queryString, (rs, rowNum) -> new ReportHistory(rs.getInt("nstatus"),
                    rs.getTimestamp("dchangedate").getTime())
        ).stream().collect(Collectors.toList());
    }

    public List<TagEntity> getTagsEntitiesForReport(String id) {
        String queryString = "SELECT scode,sentity FROM v_reporttags WHERE nreport = '" + id + "'";

        return (List<TagEntity>)jdbcTemplate.query(
                queryString, (rs, rowNum) -> new TagEntity(rs.getString("scode"),
                        rs.getString("sentity"))
        ).stream().collect(Collectors.toList());
    }

    public List<String> getAllTags() {
        String queryString = "SELECT scode,sentity FROM v_taglist";

        return (List<String>)jdbcTemplate.query(
                queryString, (rs, rowNum) -> new String(rs.getString("scode"))
        ).stream().collect(Collectors.toList());
    }
}
