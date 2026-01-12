package com.citybus.controller;

import com.citybus.dto.request.LoginRequest;
import com.citybus.dto.request.RegisterRequest;
import com.citybus.dto.response.AuthResponse;
import com.citybus.model.User;
import com.citybus.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

        private final AuthService authService;

        public AuthController(AuthService authService) {
                this.authService = authService;
        }

        @PostMapping("/register")
        public ResponseEntity<AuthResponse> register(
                        @RequestBody RegisterRequest request) {
                User user = authService.registerUser(
                                request.getFullName(),
                                request.getEmail(),
                                request.getPassword());

                AuthResponse response = new AuthResponse();
                response.setUserId(user.getId());
                response.setFullName(user.getFullName());
                response.setEmail(user.getEmail());
                response.setRoles(
                                user.getRoles().stream()
                                                .map(role -> role.getName())
                                                .collect(Collectors.toSet()));

                return ResponseEntity.ok(response);
        }

        @PostMapping("/login")
        public ResponseEntity<AuthResponse> login(
                        @RequestBody LoginRequest request) {
                User user = authService.loginUser(
                                request.getEmail(),
                                request.getPassword());

                AuthResponse response = new AuthResponse();
                response.setUserId(user.getId());
                response.setFullName(user.getFullName());
                response.setEmail(user.getEmail());
                response.setRoles(
                                user.getRoles().stream()
                                                .map(role -> role.getName())
                                                .collect(Collectors.toSet()));

                return ResponseEntity.ok(response);
        }
}
