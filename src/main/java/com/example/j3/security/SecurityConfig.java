package com.example.j3.security;

import com.example.j3.authentication.jwt.JwtAuthFilter;
import com.example.j3.authentication.jwt.JwtLogoutHandler;
import com.example.j3.user.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig implements WebMvcConfigurer {
    @Autowired
    private JwtAuthFilter authFilter;
    @Autowired
    private JwtLogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(req -> req
                                .requestMatchers("/static/**").permitAll()
                                .requestMatchers("/assets/**").permitAll()
                                .requestMatchers("/images/**").permitAll()
                                .requestMatchers("/", "/index.html").permitAll()
                                .requestMatchers("/sign-up").permitAll()
                                .requestMatchers("/sign-in").permitAll()
                                .requestMatchers("/email-verified").permitAll()
                                .requestMatchers("/refresh").permitAll()
                                .requestMatchers("/logout").permitAll()

                                // temporary for testing purposes
//                        .requestMatchers("/users/**").hasAuthority("ADMIN")
                                .requestMatchers("/products/**").permitAll()
                                .requestMatchers("/categories/**").permitAll()
                                .requestMatchers("/seller/**").permitAll()
                                .requestMatchers("/buyer/**").permitAll()
                                .requestMatchers("/userdetail/**").hasAuthority("USER")
                                .requestMatchers("/dashboard/**").hasAnyAuthority("SELLER", "ADMIN")

                                .anyRequest().authenticated()
                )
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider());
        // https://stackoverflow.com/questions/36354405/spring-security-disable-logout-redirect
        http.logout().logoutSuccessHandler(logoutHandler);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Add DELETE to the allowed methods
                .allowCredentials(true);
    }
}
