package com.example.j3.authentication.jwt;

import com.example.j3.user.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class JwtServiceImpl implements JwtService {
    private static final String secret = "b00eb2089a46946219b336a32724a2e80a36fcbc24b03912b2d1314bc14bcf9cb964cf3aad6296f702491d278598cfd6fd9704baf271d25c2ae94ebe8b7e4887";
    private UserRepository userRepository;
    @Override
    public String generateToken(int durationInSeconds, Map<String, Object> context) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + durationInSeconds * 1000L);
        String token = Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(expiration)
                .claim("context", context)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
        return token;
    }

    @Override
    public boolean validateToken(String token, UserDetails userDetails) {
        return extractEmail(token).equals(userDetails.getUsername());
    }

    @Override
    public String extractEmail(String token) throws ExpiredJwtException {
        Map<String, Object> ctx = extractContext(token);
        return (String) ctx.get("email");
    }

    @Override
    public List extractRoles(String token) throws ExpiredJwtException{
        Map<String, Object> ctx = extractContext(token);
        Object roles = ctx.get("roles");
        if(roles instanceof Map){
            return Arrays.asList(((Map<?, ?>) roles).keySet().toArray());
        } else if(roles instanceof List){
            return (List) roles;
        } else {
            throw new RuntimeException("unknown type of roles extracted from jwt context");
        }
    }


    private Map extractContext(String token) throws ExpiredJwtException {
        return Jwts
                .parserBuilder()
                .setSigningKey(secret)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("context", Map.class);
    }
}
