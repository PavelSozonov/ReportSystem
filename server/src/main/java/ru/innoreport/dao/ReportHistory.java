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
public class ReportHistory implements Serializable {

    @Id
    private Long id;

    @NotBlank
    private Long report;

    @NotBlank
    private String number;

    @NotBlank
    private Integer status;

    @NotBlank
    private Long changeDate;
}
