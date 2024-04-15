package com.example.j3.authentication.email;

public interface EmailSenderService {
    void sendEmail(String toEmail, String subject, String body);
}
