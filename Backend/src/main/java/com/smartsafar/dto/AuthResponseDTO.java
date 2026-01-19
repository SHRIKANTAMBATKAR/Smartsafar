package com.smartsafar.dto;

public class AuthResponseDTO {

    private String token;
    private String role;
    private Long userId;
    private String name;

    public AuthResponseDTO(String token, String role, Long userId, String name) {
        this.token = token;
        this.role = role;
        this.userId = userId;
        this.name = name;
    }

    public String getToken() { return token; }
    public String getRole() { return role; }
    public Long getUserId() { return userId; }
    public String getName() { return name; }
}
