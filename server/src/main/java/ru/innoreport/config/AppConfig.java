package ru.innoreport.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.innoreport.service.ClassificationService;
import ru.innoreport.service.LocalStorageService;
import ru.innoreport.service.StorageService;
import ru.innoreport.service.TagsClassificationService;

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
