package ru.innoreport.service.report.processing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("javadoc")
@Component
public class EntityService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public String insertIntoEntityList(String code, String name) {
        final SimpleJdbcCall insertIntoEntityList = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_entitylist_insert");
        final Map<String, Object> params = new HashMap<>();
        params.put("scode", code);
        params.put("sname", name);

        final Map<String, Object> result = insertIntoEntityList.execute(params);
        return result.get("returnvalue").toString();
    }

    public String deleteFromEntityList(String id) {
        final SimpleJdbcCall deleteFromEntityList = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_entitylist_delete");
        final Map<String, Object> params = new HashMap<>();
        params.put("nid", id);

        final Map<String, Object> result = deleteFromEntityList.execute(params);
        return result.get("returnvalue").toString();
    }

    public String updateEntityList(String id, String code, String name) {
        final SimpleJdbcCall updateEntityList = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_entitylist_update");
        final Map<String, Object> params = new HashMap<>();
        params.put("nid", id);
        params.put("scode", code);
        params.put("sname", name);

        final Map<String, Object> result = updateEntityList.execute(params);
        return result.get("returnvalue").toString();
    }
}
