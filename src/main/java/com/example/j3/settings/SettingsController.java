package com.example.j3.settings;

import com.example.j3.user.UserService;
import com.example.j3.userdetail.UserDetail;
import com.example.j3.userdetail.UserDetailService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static com.example.j3.JavaStarterApplication.PROFILE_IMAGE_ROOT;

@RestController
@RequestMapping("/settings")
@AllArgsConstructor
public class SettingsController {
    private UserService userService;
    private UserDetailService userDetailService;

    @PostMapping("personal/profileImage")
    public ResponseEntity<?> saveProfileImage(
            @AuthenticationPrincipal UserDetails u,
            @RequestPart("profileImage") MultipartFile image
    ) throws IOException {
        String email = u.getUsername();
        Path root = Files.createDirectories(PROFILE_IMAGE_ROOT);
        UserDetail ud = userDetailService.findByEmail(email);
        if (ud == null) {
            ud = new UserDetail();
            ud.setUser(userService.findByEmail(email));
        } else {
            String oldFilename = ud.getProfileImgFilename();
            if (oldFilename != null) {
                Files.deleteIfExists(root.resolve(oldFilename));
            }
        }
        String imgOriginalFilename = image.getOriginalFilename();
        String imgExtension = imgOriginalFilename.substring(imgOriginalFilename.lastIndexOf(".") + 1);
        String filename = email + "." + imgExtension;
        Path imgPath = root.resolve(filename);
        image.transferTo(imgPath);
        ud.setProfileImgFilename(filename);
        userDetailService.save(ud);
        return ResponseEntity.ok().build();
    }

    @GetMapping("personal/profileImage")
    public ResponseEntity<?> getProfileImage(@AuthenticationPrincipal UserDetails u) {
        String email = u.getUsername();
        String profileImgFilename = userDetailService.getProfileImgFilename(email);
        if(profileImgFilename != null){
            Path profilePath = PROFILE_IMAGE_ROOT.resolve(profileImgFilename);
            Resource profileResource = new FileSystemResource(profilePath);
            return ResponseEntity.ok()
                    .header("Content-Type", "image/type")
                    .body(profileResource);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
