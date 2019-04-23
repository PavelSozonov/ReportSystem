/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ru.innoreport.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.innoreport.dao.Report;
import ru.innoreport.dao.User;
import ru.innoreport.service.ReportService;
import ru.innoreport.service.UserService;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/user")
    public List<User> getUsers() {
        return userService.getUsers();
    }


    @PostMapping(path = "/user", consumes = "application/json")
    public String addUser(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        String name = jsonObject.get("name").toString();
        return userService.addUser(name);
    }
}
