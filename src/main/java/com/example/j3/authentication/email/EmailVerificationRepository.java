package com.example.j3.authentication.email;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Long> {
    EmailVerification findByToken(String token);

    @Modifying
    @Query("UPDATE EmailVerification ev SET ev.userPassword = '' WHERE ev.token = :token")
    void removePasswordByToken(String token);
}
