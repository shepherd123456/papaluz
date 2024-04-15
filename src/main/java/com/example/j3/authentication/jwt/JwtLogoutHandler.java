package com.example.j3.authentication.jwt;

import com.example.j3.refreshtoken.RefreshTokenService;
import com.example.j3.security.JwtCookie;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

// https://www.baeldung.com/spring-security-logout
@Component
public class JwtLogoutHandler implements LogoutSuccessHandler {
    @Autowired
    private RefreshTokenService refreshTokenService;
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String refreshToken = null;
        for(Cookie c : request.getCookies()){
            if(c.getName().equals("jwt")){
                refreshToken = c.getValue();
            }
        }
        refreshTokenService.deleteByToken(refreshToken);
        response.addCookie(JwtCookie.createEmptyJwtCookie());
        response.setStatus(HttpStatus.NO_CONTENT.value());
    }
}
