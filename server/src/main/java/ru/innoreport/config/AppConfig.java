package ru.innoreport.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.innoreport.service.classification.ClassificationService;
import ru.innoreport.service.storage.LocalStorageService;
import ru.innoreport.service.storage.StorageService;
import ru.innoreport.service.classification.TagsClassificationService;

@Configuration
public class AppConfig {

    @Bean
    public StorageService storageService() {
        return new LocalStorageService();
    }

    @Bean
    public ClassificationService classificationService() {
        return new TagsClassificationService();
    }
}
