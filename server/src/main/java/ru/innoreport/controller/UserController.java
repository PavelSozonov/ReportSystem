package ru.innoreport.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.innoreport.dao.UserList;
import ru.innoreport.service.UserService;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/user")
    public List<UserList> getUsersListView() {
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
    public String deleteFromEntityList(@PathVariable("id") String id) throws Exception {
        return userService.deleteFromUserList(id);
    }
}
