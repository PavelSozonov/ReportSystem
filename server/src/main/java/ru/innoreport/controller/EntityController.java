package ru.innoreport.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.innoreport.service.report.processing.EntityService;
import ru.innoreport.service.storage.StorageService;

import javax.json.JsonObject;

import static ru.innoreport.util.JsonUtils.getJsonObjectWithParams;

@RestController
@CrossOrigin(origins = "*")
public class EntityController {

    @Autowired
    EntityService entityService;

    @Autowired
    StorageService storageService;

    @PostMapping(path = "/entitylist", consumes = "application/json")
    public String insertIntoEntityList(@RequestBody(required = true) String json) throws Exception {
        JsonObject jsonObject = getJsonObjectWithParams(json);
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
        JsonObject jsonObject = getJsonObjectWithParams(json);
        String id = jsonObject.get("id").toString();
        String name = jsonObject.get("name").toString();
        String code = jsonObject.get("code").toString();
        return entityService.updateEntityList(id, code, name);
    }
}
