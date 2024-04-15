package com.example.j3.user;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findByRefreshToken(String token) {
        return userRepository.findByRefreshToken(token);
    }

    @Override
    @Transactional
    public void appendRole(String email, String roleName) {
        userRepository.appendRole(email, roleName);
    }
}
