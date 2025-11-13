package com.hari.leavemanagementsystem.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String department;
    private String role; // "EMPLOYEE" or "ADMIN"
}
