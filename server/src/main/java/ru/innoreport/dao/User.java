package ru.innoreport.dao;

import lombok.*;

import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {

    @Id
    private Long id;

    // User login
    @NotBlank
    private String code;

    // Full user name
    @NotBlank
    private String name;

    // Department (if NULL then it is simple user, if not NULL then user is admin, can change status and see all reports)
    private String entity;
}
