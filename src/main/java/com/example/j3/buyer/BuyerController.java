package com.example.j3.buyer;

import com.example.j3.address.Address;
import com.example.j3.authentication.email.BuyerRegistrationEvent;
import com.example.j3.role.RoleService;
import com.example.j3.user.User;
import com.example.j3.user.UserService;
import com.example.j3.userdetail.UserDetail;
import com.example.j3.userdetail.UserDetailDtoout;
import com.example.j3.userdetail.UserDetailService;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/buyer")
@AllArgsConstructor
public class BuyerController {
    private static final int randomPasswordLength = 10;

    private PasswordEncoder passwordEncoder;
    private ApplicationEventPublisher publisher;
    private UserService userService;
    private UserDetailService userDetailService;
    private RoleService roleService;

    @PostMapping
    public ResponseEntity<?> saveBuyer(@RequestBody BuyerDtoin buyerDtoin) {
        Address address = new Address(buyerDtoin.address);
        User user = userService.findByEmail(buyerDtoin.email);
        if (user == null) {
            String randomPassword = randomPassword();
            userDetailService.save(new UserDetail(
                    buyerDtoin.fullName,
                    List.of(address),
                    null,
                    buyerDtoin.citizenship,
                    buyerDtoin.phone,
                    new User(
                            null,
                            buyerDtoin.email,
                            passwordEncoder.encode(randomPassword),
                            Collections.singletonList(roleService.getByName("USER")),
                            null
                    )));
            publisher.publishEvent(new BuyerRegistrationEvent(Map.of(
                    "email", buyerDtoin.email,
                    "password", randomPassword
            )));
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } else if(!userDetailService.existsByUser(user)) {
            UserDetail ud = userDetailService.save(new UserDetail(buyerDtoin.fullName, List.of(address), null, null, buyerDtoin.phone, user));
            return ResponseEntity.status(HttpStatus.CREATED).body(new UserDetailDtoout(ud));
        } else {
            return ResponseEntity.ok().build();
        }
    }

    private String randomPassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-_=+";
        StringBuilder password = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < BuyerController.randomPasswordLength; i++) {
            int randomIndex = random.nextInt(chars.length());
            password.append(chars.charAt(randomIndex));
        }
        return password.toString();
    }
}
