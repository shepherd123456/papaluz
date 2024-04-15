package com.example.j3.user;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private PasswordEncoder passwordEncoder;
    private UserService userService;

    @PutMapping
    public ResponseEntity<?> updateAccount(
            @AuthenticationPrincipal UserDetails u,
            @RequestBody UserDtoin userDtoin
    ){
        if(userDtoin.isBad()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        User user = userService.findByEmail(u.getUsername());
        if(!userDtoin.password.isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDtoin.password));
        }
        if(!userDtoin.email.equals(user.getEmail())) {
            user.setEmail(userDtoin.email);
        }
        userService.save(user);
        return ResponseEntity.ok().build();
    }
}