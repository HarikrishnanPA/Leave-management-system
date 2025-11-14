package com.hari.leavemanagementsystem.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hari.leavemanagementsystem.model.Employee;
import com.hari.leavemanagementsystem.model.Notification;
import com.hari.leavemanagementsystem.repository.EmployeeRepository;
import com.hari.leavemanagementsystem.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final EmployeeRepository employeeRepository;

    // Admin can fetch all notifications (optional)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<Notification>> getAll() {
        // implement if needed: return all notifications
        throw new UnsupportedOperationException("Not implemented");
    }

    // Employee fetch own notifications
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/my")
    public ResponseEntity<List<Notification>> myNotifications(Principal principal) {
        Employee e = employeeRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return ResponseEntity.ok(notificationService.getNotificationsForUser(e));
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @PutMapping("/{id}/mark-read")
    public ResponseEntity<Notification> markRead(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }
}
