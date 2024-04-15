package com.example.j3.userdetail;

import com.example.j3.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserDetailRepository extends JpaRepository<UserDetail, Long> {
    @Query("SELECT ud FROM UserDetail ud WHERE ud.user.email = :email")
    UserDetail findByEmail(@Param("email") String email);

    @Query("SELECT ud.profileImgFilename FROM UserDetail ud WHERE ud.user.email = :email")
    String getProfileImgFilename(@Param("email") String email);

    boolean existsByUser(User user);
}
