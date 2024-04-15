package com.example.j3.authentication;

import com.example.j3.authentication.email.EmailVerification;
import com.example.j3.authentication.email.EmailVerificationService;
import com.example.j3.authentication.email.SignUpEvent;
import com.example.j3.authentication.jwt.JwtService;
import com.example.j3.refreshtoken.RefreshToken;
import com.example.j3.refreshtoken.RefreshTokenService;
import com.example.j3.role.Role;
import com.example.j3.role.RoleService;
import com.example.j3.user.User;
import com.example.j3.user.UserDtoin;
import com.example.j3.user.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.example.j3.JavaStarterApplication.ACCESS_TOKEN_DURATION_SECONDS;
import static com.example.j3.JavaStarterApplication.REFRESH_TOKEN_DURATION_SECONDS;
import static com.example.j3.security.JwtCookie.createEmptyJwtCookie;
import static com.example.j3.security.JwtCookie.createJwtCookie;

@RestController
@AllArgsConstructor
public class AuthController {

    private AuthenticationManager authenticationManager;
    private ApplicationEventPublisher publisher;

    private UserService userService;
    private RoleService roleService;
    private EmailVerificationService emailVerificationService;
    private RefreshTokenService refreshTokenService;
    private JwtService jwtService;


    @PostMapping("/sign-up")
    public ResponseEntity<?> register(@RequestBody UserDtoin userDtoin) {
        if (userDtoin.isBad()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        publisher.publishEvent(new SignUpEvent(userDtoin));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/email-verified")
    public ResponseEntity<?> verifyEmail(@RequestParam("token") String tk) {
        EmailVerification ev = emailVerificationService.findByToken(tk);
        if (LocalDateTime.now().isAfter(ev.getExpiration())) {
            System.out.println("verificationToken expired");
            emailVerificationService.delete(ev);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<Role> defaultRoles = Collections.singletonList(roleService.getByName("USER"));
        userService.save(new User(
                null,
                ev.getUserEmail(),
                ev.getUserPassword(),
                defaultRoles,
                null
        ));
        emailVerificationService.removePasswordByToken(ev.getToken());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/sign-in")
    public ResponseEntity<String> login(@CookieValue(value = "jwt", required = false) String refreshTokenIn, @RequestBody UserDtoin userDtoin, HttpServletResponse response) {
        if (refreshTokenIn != null) {
            refreshTokenService.deleteByToken(refreshTokenIn);
        }
        if (userDtoin.isBad()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                userDtoin.email,
                userDtoin.password
        ));
        User user = userService.findByEmail(userDtoin.email);
        String refreshTokenOut = jwtService.generateToken(
                REFRESH_TOKEN_DURATION_SECONDS,
                Collections.singletonMap("email", user.getEmail())
        );
        refreshTokenService.save(new RefreshToken(null, refreshTokenOut, user));
        response.addCookie(createRefreshTokenCookie(refreshTokenOut));
        String accessToken = jwtService.generateToken(
                ACCESS_TOKEN_DURATION_SECONDS,
                Map.of(
                        "email", user.getEmail(),
                        "roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList())
                )
        );
        return ResponseEntity.ok(accessToken);
    }

    @GetMapping("/refresh")
    public ResponseEntity<String> refresh(@CookieValue(value = "jwt", required = false) String refreshTokenIn, HttpServletResponse response) {
        response.addCookie(createEmptyJwtCookie());
        if (refreshTokenIn == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User foundUser = userService.findByRefreshToken(refreshTokenIn);
        String decodedEmail;
        try {
            decodedEmail = jwtService.extractEmail(refreshTokenIn);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } finally {
            refreshTokenService.deleteByToken(refreshTokenIn);
        }

        if (foundUser == null || !foundUser.getEmail().equals(decodedEmail)) {
            // security attack (either refreshToken reuse or altering the token by man in the middle
            System.err.println("refreshToken compromised");
            User compromisedUser = userService.findByEmail(decodedEmail);
            refreshTokenService.deleteAllByEmail(compromisedUser.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String accessToken = jwtService.generateToken(
                ACCESS_TOKEN_DURATION_SECONDS,
                Map.of(
                        "email", decodedEmail,
                        "roles", foundUser.getRoles().stream().map(Role::getName).collect(Collectors.toList())
                )
        );
        String refreshTokenOut = jwtService.generateToken(
                REFRESH_TOKEN_DURATION_SECONDS,
                Collections.singletonMap("email", decodedEmail)
        );
        refreshTokenService.save(new RefreshToken(null, refreshTokenOut, foundUser));
        response.addCookie(createRefreshTokenCookie(refreshTokenOut));
        return ResponseEntity.ok(accessToken);
    }

    private static Cookie createRefreshTokenCookie(String refreshToken) {
        return createJwtCookie(refreshToken, REFRESH_TOKEN_DURATION_SECONDS);
    }
}
