package com.example.j3.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// https://stackoverflow.com/questions/68206264/how-to-do-jpql-with-join-fetch-to-collect-the-multiple-joins-in-one-query
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u JOIN FETCH u.roles where u.email = :email")
    User findByEmail(@Param("email") String email);
    @Query("SELECT u FROM User u JOIN FETCH u.roles JOIN u.refreshTokens rt where rt.token = :refreshToken")
    User findByRefreshToken(@Param("refreshToken") String refreshToken);

    @Modifying
    @Query(nativeQuery = true,
    value = "INSERT INTO user_roles(user_id, role_id) " +
            "SELECT u.id, r.id FROM app_user u " +
            "JOIN role r ON r.name = :roleName " +
            "WHERE u.email = :email")
    void appendRole(@Param("email") String email, @Param("roleName") String roleName);
}
