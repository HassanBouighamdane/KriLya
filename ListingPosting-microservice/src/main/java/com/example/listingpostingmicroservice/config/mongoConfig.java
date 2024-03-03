package com.example.listingpostingmicroservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class mongoConfig extends AbstractMongoClientConfiguration {

    @Override
    protected String getDatabaseName() {
        return "Posting-Database";
    }

    @Override
    public boolean autoIndexCreation() {
        return true;
    }

// ...
}