package com.example.j3.userdetail;

import com.example.j3.user.User;

public interface UserDetailService {
    UserDetail save(UserDetail userDetail);
    UserDetail findByEmail(String email);
    String getProfileImgFilename(String email);
    boolean existsByUser(User user);
}
