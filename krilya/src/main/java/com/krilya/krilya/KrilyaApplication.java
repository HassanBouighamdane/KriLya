package com.krilya.krilya;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.krilya.krilya.repository")
public class KrilyaApplication {

	public static void main(String[] args) {
		SpringApplication.run(KrilyaApplication.class, args);
	}

}
