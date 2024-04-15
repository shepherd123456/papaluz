package com.example.j3.authentication.email;

import com.example.j3.user.UserDtoin;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
@AllArgsConstructor
public class SignUpListener {
    private static final int EXPIRATION_MINUTES = 5;

    private PasswordEncoder passwordEncoder;
    private EmailVerificationService emailVerificationService;
    private EmailSenderService emailSenderService;

    @EventListener
    public void handleSingUp(SignUpEvent e) {
        UserDtoin userDtoin = (UserDtoin) e.getSource();
        EmailVerification token = emailVerificationService.save(new EmailVerification(
                null,
                userDtoin.email,
                passwordEncoder.encode(userDtoin.password),
                UUID.randomUUID().toString(),
                LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES)
        ));
        System.out.println(token.getExpiration());
        emailSenderService.sendEmail(token.getUserEmail(), "Complete Registration", "To confirm your account, please click here: " + "http://localhost:3000/email-verified?token=" + token.getToken());
    }
}
