package com.hari.leavemanagementsystem.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hari.leavemanagementsystem.model.Employee;
import com.hari.leavemanagementsystem.model.Notification;
import com.hari.leavemanagementsystem.payload.ApiResponse;
import com.hari.leavemanagementsystem.repository.EmployeeRepository;
import com.hari.leavemanagementsystem.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final EmployeeRepository employeeRepository;

    // --------------------------------------------------------
    // EMPLOYEE or ADMIN → Get own notifications
    // --------------------------------------------------------
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/my")
    public ResponseEntity<?> myNotifications(Principal principal) {

        Employee e = employeeRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Notification> notifications = notificationService.getNotificationsForUser(e);

        ApiResponse response = new ApiResponse(
                "success",
                "User notifications retrieved successfully",
                Map.of("notifications", notifications)
        );

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------------
    // Mark notification as read
    // --------------------------------------------------------
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @PutMapping("/{id}/mark-read")
    public ResponseEntity<?> markRead(@PathVariable Long id) {

        Notification updated = notificationService.markAsRead(id);

        ApiResponse response = new ApiResponse(
                "success",
                "Notification marked as read successfully",
                Map.of(
                        "notificationId", id,
                        "notification", updated
                )
        );

        return ResponseEntity.ok(response);
    }
}
