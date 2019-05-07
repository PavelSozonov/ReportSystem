package ru.innoreport.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import static org.junit.jupiter.api.Assertions.assertNotNull;
//import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.BodyInserters;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
class IntegrationTests {

    @LocalServerPort
    int port;

    private WebTestClient client;

    @BeforeEach
    void setup() {
        client = WebTestClient
                .bindToServer()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .baseUrl("http://localhost:" + port)
                .build();
    }

    @Test
    void createEntity() {
        String entity_id = client
                .post()
                .uri("/entitylist")
                .body(BodyInserters.fromObject("{'code': 'test_entity', 'name': 'Test Entity'}"))
                .exchange()
                .expectStatus().isOk()
                .expectBody().returnResult().toString();

        String user_id = client
                .post()
                .uri("/user")
                .body(BodyInserters.fromObject("{'code': 'test_user', 'name': 'Test User', 'entity': ''}"))
                .exchange()
                .expectStatus().isOk()
                .expectBody().returnResult().toString();

        assertNotNull(entity_id);
        assertNotNull(user_id);

//        System.out.println("/entitylist/" + entity_id);
//
//        client
//                .delete()
//                .uri("/entitylist/" + entity_id)
//                .exchange()
//                .expectStatus().isNoContent();
    }

}