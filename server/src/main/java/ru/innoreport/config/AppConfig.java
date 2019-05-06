package ru.innoreport.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.innoreport.service.classification.ClassificationService;
import ru.innoreport.service.classification.TagsClassificationService;
import ru.innoreport.service.storage.FireBaseStorageService;
import ru.innoreport.service.storage.StorageService;

@Configuration
public class AppConfig {

    @Bean
    public StorageService storageService() {
        return new FireBaseStorageService();
    }

    @Bean
    public ClassificationService classificationService() {
        return new TagsClassificationService();
    }
}
