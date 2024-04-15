package com.example.j3.security;

import jakarta.servlet.http.Cookie;

public class JwtCookie {

    public static Cookie createJwtCookie(String value, int duration){
        Cookie cookie = new Cookie("jwt", value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
//        cookie.setMaxAge(duration); // not needed - without max-age, the cookie is "session" cookie, meaning it will expire once browser is closed
        cookie.setAttribute("sameSite", "None");
        return cookie;
    }

    public static Cookie createEmptyJwtCookie(){
        return createJwtCookie(null, 0);
    }
}
