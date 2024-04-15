package com.example.j3.seller;

import com.example.j3.authentication.jwt.JwtService;
import com.example.j3.role.Role;
import com.example.j3.user.User;
import com.example.j3.user.UserService;
import com.example.j3.userdetail.UserDetail;
import com.example.j3.userdetail.UserDetailDtoin;
import com.example.j3.userdetail.UserDetailService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.stream.Collectors;

import static com.example.j3.JavaStarterApplication.ACCESS_TOKEN_DURATION_SECONDS;

@RestController
@RequestMapping("/seller")
@AllArgsConstructor
public class SellerController {
    private JwtService jwtService;
    private UserService userService;
    private UserDetailService userDetailService;
    private SellerService sellerService;

    @PostMapping
    public ResponseEntity<?> saveUserDetails(
            @AuthenticationPrincipal UserDetails u,
            @RequestBody UserDetailDtoin userDetailDtoin
    ) {
        String email = u.getUsername();
        userService.appendRole(email, "SELLER");
        User user = userService.findByEmail(email);
        sellerService.save(new Seller(null, null, null, user));
        UserDetail ud = userDetailService.findByEmail(email);
        if (ud == null) {
            ud = new UserDetail();
            ud.setUser(user);
        }
        userDetailDtoin.update(ud);
        userDetailService.save(ud);
        String accessToken = jwtService.generateToken(
                ACCESS_TOKEN_DURATION_SECONDS,
                Map.of(
                        "email", user.getEmail(),
                        "roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList())
                )
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(accessToken);
    }
}
