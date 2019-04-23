package ru.innoreport.dao;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import javax.persistence.Id;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Report implements Serializable {

    @Id
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String sender;

    private String recipient;

    @NotBlank
    private Integer status;

    @NotBlank
    private String changeDate;

    @NotBlank
    private String number;
}
