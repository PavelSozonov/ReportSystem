package ru.innoreport.service.classification;

public interface ClassificationService {

    /**
     * Set entity code for report
     *
     * @param id identifier of report for which should be set entity code
     * @return entity code that was set
     */
    String setEntityCode(String id);
}
