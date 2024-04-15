package com.example.j3.authentication.email;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailVerificationServiceImpl implements EmailVerificationService {
    private EmailVerificationRepository emailVerificationRepository;
    @Override
    public EmailVerification save(EmailVerification emailVerification) {
        return emailVerificationRepository.save(emailVerification);
    }

    @Override
    public EmailVerification findByToken(String token) {
        return emailVerificationRepository.findByToken(token);
    }

    @Override
    @Transactional
    public void removePasswordByToken(String token) {
        emailVerificationRepository.removePasswordByToken(token);
    }

    @Override
    public void delete(EmailVerification token) {
        emailVerificationRepository.delete(token);
    }
}
