package com.smartsafar.service;

import com.smartsafar.dto.AuthResponseDTO;
import com.smartsafar.dto.LoginRequestDTO;
import com.smartsafar.dto.RegisterRequestDTO;

public interface AuthService {

    AuthResponseDTO register(RegisterRequestDTO dto);

    AuthResponseDTO login(LoginRequestDTO dto);

    void logout(String token);
}
