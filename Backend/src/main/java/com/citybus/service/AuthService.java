package com.citybus.service;

import com.citybus.model.User;

public interface AuthService {

    User registerUser(String fullName, String email, String password);

    User loginUser(String email, String password);
}
