package com.hari.leavemanagementsystem.controller;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hari.leavemanagementsystem.security.CustomUserDetails;

@RestController
@RequestMapping("/api/debug")
public class DebugController {

    @GetMapping("/me")
    public Map<String, Object> me(Authentication authentication) {
        if (authentication == null) {
            return Map.of("authenticated", false);
        }
        Object principal = authentication.getPrincipal();
        Map<String, Object> details = Map.of(
            "authenticated", authentication.isAuthenticated(),
            "principalClass", principal.getClass().getName(),
            "name", authentication.getName(),
            "authorities", authentication.getAuthorities().stream()
                    .map(a -> a.getAuthority()).collect(Collectors.toList())
        );

        if (principal instanceof CustomUserDetails u) {
            return Map.of(
                "authenticated", true,
                "username", u.getUsername(),
                "userId", u.getId(),
                "authorities", authentication.getAuthorities().stream().map(a -> a.getAuthority()).collect(Collectors.toList())
            );
        }

        return details;
    }
}
