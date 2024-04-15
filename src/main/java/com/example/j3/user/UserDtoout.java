package com.example.j3.user;

import com.example.j3.role.Role;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
public class UserDtoout {
    public String email;
    public List<String> roles;

    public UserDtoout(User user){
        email = user.getEmail();
        roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
    }
}