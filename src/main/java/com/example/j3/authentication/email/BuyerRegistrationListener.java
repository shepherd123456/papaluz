package com.example.j3.authentication.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class BuyerRegistrationListener {
    @Autowired
    private EmailSenderService emailSenderService;

    @EventListener
    public void handleRegistration(BuyerRegistrationEvent e) {
        Map<String, String> emailPassword = (Map<String, String>) e.getSource();
        emailSenderService.sendEmail(emailPassword.get("email"), "Buyer registration", "You have been registered with temporary password:\n" + emailPassword.get("password") + "\nPlease log in, and change your password in your profile");
    }
}
