package com.smartsafar.serviceImpl;

import com.smartsafar.dto.*;
import com.smartsafar.entity.User;
import com.smartsafar.exception.BadRequestException;
import com.smartsafar.repository.UserRepository;
import com.smartsafar.security.JwtUtil;
import com.smartsafar.service.AuthService;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    // 📝 REGISTER
    @Override
    public AuthResponseDTO register(RegisterRequestDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole("USER");

        User saved = userRepository.save(user);

        String token = jwtUtil.generateToken(
                saved.getEmail(),
                saved.getRole()
        );

        return new AuthResponseDTO(
                token,
                saved.getRole(),
                saved.getUserId(),
                saved.getName()
        );
    }

    // 🔐 LOGIN
    @Override
    public AuthResponseDTO login(LoginRequestDTO dto) {

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()
                )
        );

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid login"));

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole()
        );

        return new AuthResponseDTO(
                token,
                user.getRole(),
                user.getUserId(),
                user.getName()
        );
    }

    // 🚪 LOGOUT
    @Override
    public void logout(String token) {
        // JWT is stateless → frontend deletes token
        // Optional: add token blacklist if required
    }
}
