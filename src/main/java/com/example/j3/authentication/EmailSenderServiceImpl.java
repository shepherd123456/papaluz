package com.example.j3.authentication;

import com.example.j3.authentication.email.EmailSenderService;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import static com.example.j3.JavaStarterApplication.PRIMARY_EMAIL;

@Service
@AllArgsConstructor
public class EmailSenderServiceImpl implements EmailSenderService {
    private JavaMailSender mailSender;
    @Override
    public void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(PRIMARY_EMAIL);
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);

        System.out.println("mail sent successfully...");
    }
}
