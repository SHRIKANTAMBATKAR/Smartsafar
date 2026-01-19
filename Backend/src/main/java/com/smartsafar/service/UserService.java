package com.smartsafar.service;

import com.smartsafar.dto.UserRequestDTO;
import com.smartsafar.dto.UserResponseDTO;

import java.util.List;

public interface UserService {

    UserResponseDTO createUser(UserRequestDTO dto);

    UserResponseDTO getUserById(Long id);

    List<UserResponseDTO> getAllUsers();
}
