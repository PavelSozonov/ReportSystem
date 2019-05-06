package ru.innoreport.service.classification;

import org.springframework.beans.factory.annotation.Autowired;
import ru.innoreport.dao.TagEntity;
import ru.innoreport.service.report.processing.ReportService;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;

public class TagsClassificationService implements ClassificationService {

    @Autowired
    ReportService reportService;

    @Override
    public String setEntityCode(String id) {
        List<TagEntity> tagsEntities = reportService.getTagsEntitiesForReport(id);
        String entity = tagsEntities
                .stream()
                .map(x -> x.getEntity())
                .collect(groupingBy(Function.identity(), counting()))
                .entrySet()
                .stream()
                .max(Comparator.comparing(Map.Entry::getValue))
                .get()
                .getKey();
        reportService.sendReportStatus(id, entity);
        return entity;
    }
}
