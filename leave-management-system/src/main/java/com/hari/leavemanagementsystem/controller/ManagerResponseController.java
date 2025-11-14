package com.hari.leavemanagementsystem.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hari.leavemanagementsystem.model.Employee;
import com.hari.leavemanagementsystem.model.ManagerResponse;
import com.hari.leavemanagementsystem.repository.EmployeeRepository;
import com.hari.leavemanagementsystem.service.ManagerResponseService;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/manager-responses")
@RequiredArgsConstructor
public class ManagerResponseController {

    private final ManagerResponseService managerResponseService;
    private final EmployeeRepository employeeRepository;

    /**
     * Admin/Manager approves or rejects a leave request.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/respond")
    public ResponseEntity<ManagerResponse> respondToRequest(
            @RequestBody RespondDto dto,
            Principal principal
    ) {
        Employee manager = employeeRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new IllegalArgumentException("Manager not found"));

        ManagerResponse response = managerResponseService.respondToRequest(
                manager.getId(),
                dto.getRequestId(),
                dto.isApproved(),
                dto.getMessage()
        );

        return ResponseEntity.ok(response);
    }

    /**
     * Employee or Admin fetches all manager responses for a specific leave request.
     * - Admin can view any
     * - Employee can only view their own
     */
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/by-request/{requestId}")
    public ResponseEntity<List<ManagerResponse>> getResponsesForRequest(
            @PathVariable Long requestId,
            Principal principal
    ) {
        Employee currentUser = employeeRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<ManagerResponse> responses =
                managerResponseService.getResponsesForRequest(requestId, currentUser);

        return ResponseEntity.ok(responses);
    }

    /**
     * Public static DTO class (no more warnings).
     */
    @Data
    public static class RespondDto {
        private Long requestId;
        private boolean approved;
        private String message;
    }
}
