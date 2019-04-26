package ru.innoreport.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.innoreport.dao.User;
import ru.innoreport.service.UserService;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/user")
    public List<User> getUsersListView() {
        return userService.getUserListView();
    }

    @PutMapping(path = "/user", consumes = "application/json")
    public String updateUserList(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        String id = jsonObject.get("id").toString();
        String code = jsonObject.get("code").toString();
        String name = jsonObject.get("name").toString();
        String entity = jsonObject.get("entity").toString();
        return userService.updateUserList(id, code, name, entity);
    }

    @PostMapping(path = "/user", consumes = "application/json")
    public String insertIntoUserList(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        String code = jsonObject.get("code").toString();
        String name = jsonObject.get("name").toString();
        String entity = jsonObject.get("entity").toString();
        return userService.insertIntoUserList(code, name, entity);
    }

    @DeleteMapping(path = "/user/{id}")
    public String deleteFromUserList(@PathVariable("id") String id) throws Exception {
        return userService.deleteFromUserList(id);
    }

    @PutMapping(path = "/user/password", consumes = "application/json")
    public String setUserPassword(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        Long id = Long.parseLong(jsonObject.get("id").toString());
        String password = jsonObject.get("password").toString();
        return userService.setUserPassword(id, password);
    }
}
