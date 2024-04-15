package com.example.j3.authentication.email;

public interface EmailVerificationService {
    EmailVerification save(EmailVerification token);
    EmailVerification findByToken(String token);
    void removePasswordByToken(String token);

    void delete(EmailVerification token);
}
