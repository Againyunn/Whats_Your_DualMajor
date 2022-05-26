package com.comprehensivedesign.dualmajor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"com.comprehensivedesign.dualmajor.repository"})
@EntityScan(basePackages = {"com.comprehensivedesign.dualmajor.domain"})
public class DualmajorApplication {

	public static void main(String[] args) {
		SpringApplication.run(DualmajorApplication.class, args);
	}
}
