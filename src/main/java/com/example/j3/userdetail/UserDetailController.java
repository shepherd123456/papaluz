package com.example.j3.userdetail;

import com.example.j3.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userdetail")
@AllArgsConstructor
public class UserDetailController {
    private UserService userService;
    private UserDetailService userDetailService;

    @PostMapping
    public ResponseEntity<?> saveUserDetails(
            @AuthenticationPrincipal UserDetails u,
            @RequestBody UserDetailDtoin userDetailDtoin
    ) {
        String email = u.getUsername();
        UserDetail ud = userDetailService.findByEmail(email);
        if(ud == null) {
            ud = new UserDetail();
            ud.setUser(userService.findByEmail(email));
        }
        userDetailDtoin.update(ud);
        userDetailService.save(ud);
        return ResponseEntity.ok().build();
    }
    @GetMapping
    public ResponseEntity<?> getUserDetails(
            @AuthenticationPrincipal UserDetails u
    ) {
        String email = u.getUsername();
        UserDetail ud = userDetailService.findByEmail(email);
        if (ud != null) {
            return ResponseEntity.ok(new UserDetailDtoout(ud));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
