package com.hari.leavemanagementsystem.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

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
import com.hari.leavemanagementsystem.payload.ApiResponse;
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

    // --------------------------------------------------------
    // ADMIN → Approve or Reject a Leave Request
    // --------------------------------------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/respond")
    public ResponseEntity<?> respondToRequest(
            @RequestBody RespondDto dto,
            Principal principal
    ) {

        Employee manager = employeeRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new IllegalArgumentException("Manager not found"));

        ManagerResponse responseObj = managerResponseService.respondToRequest(
                manager.getId(),
                dto.getRequestId(),
                dto.isApproved(),
                dto.getMessage()
        );

        ApiResponse response = new ApiResponse(
                "success",
                dto.isApproved()
                        ? "Leave request approved successfully"
                        : "Leave request rejected successfully",
                Map.of(
                        "requestId", dto.getRequestId(),
                        "approved", dto.isApproved(),
                        "managerResponse", responseObj
                )
        );

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------------
    // ADMIN or EMPLOYEE → Get Manager Responses for a Leave Request
    // --------------------------------------------------------
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/by-request/{requestId}")
    public ResponseEntity<?> getResponsesForRequest(
            @PathVariable Long requestId,
            Principal principal
    ) {

        Employee currentUser = employeeRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<ManagerResponse> responses =
                managerResponseService.getResponsesForRequest(requestId, currentUser);

        ApiResponse response = new ApiResponse(
                "success",
                "Manager responses retrieved successfully",
                Map.of(
                        "requestId", requestId,
                        "responses", responses
                )
        );

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------------
    // DTO used for responding to leave requests
    // --------------------------------------------------------
    @Data
    public static class RespondDto {
        private Long requestId;
        private boolean approved;
        private String message;
    }
}
