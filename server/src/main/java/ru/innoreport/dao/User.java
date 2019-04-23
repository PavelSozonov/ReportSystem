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

    @NotBlank
    private String code;

    @NotBlank
    private String name;

    private Long entity;
}
