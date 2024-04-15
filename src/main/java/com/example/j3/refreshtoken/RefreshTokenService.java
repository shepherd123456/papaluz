package com.example.j3.refreshtoken;
public interface RefreshTokenService {
    RefreshToken save(RefreshToken refreshToken);
    void deleteAllByEmail(String email);
    void deleteByToken(String token);
}
