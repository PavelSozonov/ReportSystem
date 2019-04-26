package ru.innoreport.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Component;
import ru.innoreport.dao.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class UserService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<User> getUserListView() {

        return jdbcTemplate.query(
                "SELECT * FROM v_userlist",
                (rs, rowNum) -> new User(rs.getLong("nid"),
                        rs.getString("scode"),
                        rs.getString("sname"),
                        rs.getString("sentity")
                        )
        ).stream().collect(Collectors.toList());
    }

    public String deleteFromUserList(String id) {
        final SimpleJdbcCall deleteFromUserList = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_userlist_delete");
        final Map<String, Object> params = new HashMap<>();
        params.put("nid", id);

        final Map<String, Object> result = deleteFromUserList.execute(params);
        return result.get("returnvalue").toString();
    }

    public String insertIntoUserList(String code, String name, String entity) {
        final SimpleJdbcCall insertIntoUserList = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_userlist_insert");
        final Map<String, Object> params = new HashMap<>();
        params.put("scode", code);
        params.put("sname", name);
        params.put("sentity", entity);

        final Map<String, Object> result = insertIntoUserList.execute(params);
        return result.get("returnvalue").toString();
    }

    public String updateUserList(String id, String code, String name, String entity) {
        final SimpleJdbcCall updateUserList = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_userlist_update");
        final Map<String, Object> params = new HashMap<>();
        params.put("nid", id);
        params.put("scode", code);
        params.put("sname", name);
        params.put("sentity", entity);

        final Map<String, Object> result = updateUserList.execute(params);
        return result.get("returnvalue").toString();
    }
}
