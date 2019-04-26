package ru.innoreport.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.innoreport.service.EntityService;

@RestController
public class EntityController {

    @Autowired
    EntityService entityService;

    // Comment 1
    @PostMapping(path = "/entitylist", consumes = "application/json")
    public String insertIntoEntityList(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        String name = jsonObject.get("name").toString();
        String code = jsonObject.get("code").toString();
        return entityService.insertIntoEntityList(code, name);
    }

    @DeleteMapping(path = "/entitylist/{id}")
    public String deleteFromEntityList(@PathVariable("id") String id) throws Exception {
        return entityService.deleteFromEntityList(id);
    }

    @PutMapping(path = "/entitylist", consumes = "application/json")
    public String updateEntityList(@RequestBody(required = true) String json) throws Exception {
        JSONObject jsonObject = new JSONObject(json);
        String id = jsonObject.get("id").toString();
        String name = jsonObject.get("name").toString();
        String code = jsonObject.get("code").toString();
        return entityService.updateEntityList(id, code, name);
    }
}
