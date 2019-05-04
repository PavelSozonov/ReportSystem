package ru.innoreport.service;

public interface ClassificationService {

    /**
     * Set entity code for report
     *
     * @param reportId id of report for which should be set entity code
     * @return entity code that was set
     */
    String setEntityCode(Long reportId);
}
