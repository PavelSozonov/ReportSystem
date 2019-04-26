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
    private Long changeDate;

    @NotBlank
    private String number;
}
