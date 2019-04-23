package ru.innoreport.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Component;
import ru.innoreport.dao.Report;
import ru.innoreport.dao.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class UserService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<User> getUsers() {

        return jdbcTemplate.query(
                "SELECT id, code, name, entity FROM userlist",
                (rs, rowNum) -> new User(rs.getLong("id"),
                        rs.getString("code"),
                        rs.getString("name"),
                        rs.getLong("entity")
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
