package ru.innoreport.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Component;
import ru.innoreport.dao.UserList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class UserService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<UserList> getUserListView() {

        return jdbcTemplate.query(
                "SELECT * FROM v_userlist",
                (rs, rowNum) -> new UserList(rs.getLong("nid"),
                        rs.getString("scode"),
                        rs.getString("sname"),
                        rs.getString("sentity")
                        )
        ).stream().collect(Collectors.toList());
    }

    public String addUser(String userName) {
        final SimpleJdbcCall insertUser = new SimpleJdbcCall(jdbcTemplate).withFunctionName("f_userlist_insert");
        final Map<String, Object> params = new HashMap<>();
        params.put("scode", userName);
        params.put("sname", userName);
        params.put("sentity", 100);

        final Map<String, Object> result = insertUser.execute(params);
        return result.get("returnvalue").toString();
    }
}
