package com.example.j3.authentication.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Map;

public interface JwtService {
    String generateToken(int duration, Map<String, Object> context);
    boolean validateToken(String token, UserDetails userDetails);
    String extractEmail(String token) throws ExpiredJwtException;
    List<String> extractRoles(String token) throws ExpiredJwtException;
}
