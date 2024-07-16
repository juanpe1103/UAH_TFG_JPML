package com.jpml.gestion.route;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RouteApplication {

    public static void main(String[] args) {
        SpringApplication.run(RouteApplication.class, args);
        System.out.println("Inicio APP.....");
    }
    @Bean
    CommandLineRunner runner() {
        return args -> {
        };
    }
}
