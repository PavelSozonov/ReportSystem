package ru.innoreport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.innoreport.dao.User;
import ru.innoreport.service.report.processing.UserService;

import javax.json.JsonObject;
import java.util.List;

import static ru.innoreport.util.JsonUtils.getJsonObjectWithParams;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public List<User> getUsersListView() {
        return userService.getUserListView();
    }

    @GetMapping(path = "/users/{username}")
    public User getUserView(@PathVariable("username") String username) throws Exception {
        return userService.getUserView(username);
    }

    @PutMapping(path = "/user", consumes = "application/json")
    public String updateUserList(@RequestBody(required = true) String json) throws Exception {
        JsonObject jsonObject = getJsonObjectWithParams(json);
        String id = jsonObject.get("id").toString();
        String code = jsonObject.get("code").toString();
        String name = jsonObject.get("name").toString();
        String entity = jsonObject.get("entity").toString();
        return userService.updateUserList(id, code, name, entity);
    }

    @PostMapping(path = "/user", consumes = "application/json")
    public String insertIntoUserList(@RequestBody(required = true) String json) throws Exception {
        JsonObject jsonObject = getJsonObjectWithParams(json);
        String code = jsonObject.get("code").toString();
        String name = jsonObject.get("name").toString();
        String entity = jsonObject.get("entity").toString();
        return userService.insertIntoUserList(code, name, entity);
    }

    @DeleteMapping(path = "/users/{id}")
    public String deleteFromUserList(@PathVariable("id") String id) throws Exception {
        return userService.deleteFromUserList(id);
    }

    @PutMapping(path = "/user/password", consumes = "application/json")
    public String setUserPassword(@RequestBody(required = true) String json) throws Exception {
        JsonObject jsonObject = getJsonObjectWithParams(json);
        Long id = Long.parseLong(jsonObject.get("id").toString());
        String password = jsonObject.get("password").toString();
        return userService.setUserPassword(id, password);
    }
}
