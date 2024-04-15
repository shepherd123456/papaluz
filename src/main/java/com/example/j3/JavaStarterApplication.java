package com.example.j3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;

import java.nio.file.Path;
import java.time.Duration;
import java.time.temporal.ChronoUnit;

@SpringBootApplication
public class JavaStarterApplication {
    public static final String baseURL = "https://papaluz.com";
    public static final int REFRESH_TOKEN_DURATION_SECONDS = (int) Duration.of(8, ChronoUnit.MINUTES).toSeconds();
    public static final int ACCESS_TOKEN_DURATION_SECONDS = (int) Duration.of(2, ChronoUnit.MINUTES).toSeconds();
    public static final Path PROFILE_IMAGE_ROOT = Path.of(System.getProperty("user.dir"), "images", "profiles");
    public static final Path PRODUCT_IMAGE_ROOT = Path.of(System.getProperty("user.dir"), "images", "products");
    public static final String PRIMARY_PRODUCT_IMAGE_MARK = "PRIMARY";

    public static void main(String[] args) {
        SpringApplication springApplication = new SpringApplication(JavaStarterApplication.class);
        springApplication.addListeners(new ApplicationPidFileWriter());
        springApplication.run(args);
    }
}
