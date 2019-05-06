package ru.innoreport.util;

import org.springframework.web.bind.annotation.RequestBody;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import java.io.StringReader;
import java.util.Objects;

public class JsonUtils {

    public static JsonObject getJsonObjectWithParams(@RequestBody(required = true) String json) {
        JsonObject jsonObject = getJsonObject(json);
        if (!Objects.isNull(jsonObject.get("params"))) {
            String params = removeQuotes(jsonObject.get("params").toString().replace("\\\"", "\""));
            jsonObject = getJsonObject(params);
        }
        return jsonObject;
    }

    private static JsonObject getJsonObject(@RequestBody(required = true) String json) {
        JsonObject jsonObject;
        try (JsonReader jsonReader = Json.createReader(new StringReader(json))) {
            jsonObject = jsonReader.readObject();
        }
        return jsonObject;
    }

    public static String removeQuotes(String value) {
        if (value.startsWith("\"")) {
            return value.substring(1, value.length() - 1);
        }
        return value;
    }

}
