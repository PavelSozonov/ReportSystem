package ru.innoreport.dao;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TagEntity implements Serializable {

    @NotBlank
    private String code;

    private String entity;
}
