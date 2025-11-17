package com.hari.leavemanagementsystem.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hari.leavemanagementsystem.model.LeaveRequest;
import com.hari.leavemanagementsystem.payload.ApiResponse;
import com.hari.leavemanagementsystem.security.CustomUserDetails;
import com.hari.leavemanagementsystem.service.LeaveRequestService;

import lombok.Data;

@RestController
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    // --------------------------------------------------------
    // ADMIN → Get ALL leave requests
    // --------------------------------------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<?> getAllLeaveRequests() {

        List<LeaveRequest> requests = leaveRequestService.getAllLeaveRequests();

        ApiResponse response = new ApiResponse(
                "success",
                "All leave requests retrieved successfully",
                Map.of("leaveRequests", requests)
        );

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------------
    // EMPLOYEE or ADMIN → Get leave requests of specific employee
    // --------------------------------------------------------
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getLeaveRequestsByEmployee(
            @PathVariable Long employeeId,
            Authentication authentication
    ) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        boolean isEmployee = userDetails.getAuthorities()
                .stream().anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"));

        // EMPLOYEE can only view their own requests
        if (isEmployee && !userDetails.getId().equals(employeeId)) {
            throw new AccessDeniedException("You can only view your own leave requests");
        }

        List<LeaveRequest> requests = leaveRequestService.getLeaveRequestsByEmployeeId(employeeId);

        ApiResponse response = new ApiResponse(
                "success",
                "Leave requests retrieved successfully",
                Map.of("leaveRequests", requests)
        );

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------------
    // EMPLOYEE → Create a leave request
    // --------------------------------------------------------
    @PreAuthorize("hasRole('EMPLOYEE')")
    @PostMapping
    public ResponseEntity<?> createLeaveRequest(
            @RequestBody CreateLeaveRequestDto dto,
            Authentication authentication
    ) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // Build LeaveRequest entity from DTO
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setStartDate(dto.getStartDate());
        leaveRequest.setEndDate(dto.getEndDate());
        leaveRequest.setReason(dto.getReason());

        // Attach employee + leave type
        leaveRequestService.attachEmployeeToRequest(leaveRequest, userDetails.getId());
        leaveRequestService.attachLeaveTypeToRequest(leaveRequest, dto.getLeaveTypeId());

        LeaveRequest saved = leaveRequestService.saveLeaveRequest(leaveRequest);

        ApiResponse response = new ApiResponse(
                "success",
                "Leave request created successfully",
                Map.of("leaveRequest", saved)
        );

        return ResponseEntity.status(201).body(response);
    }

    // --------------------------------------------------------
    // ADMIN → Delete a leave request
    // --------------------------------------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLeaveRequest(@PathVariable Long id) {

        leaveRequestService.deleteLeaveRequest(id);

        ApiResponse response = new ApiResponse(
                "success",
                "Leave request deleted successfully",
                Map.of("requestId", id)
        );

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------------
    // DTO used for creating leave requests
    // --------------------------------------------------------
    @Data
    public static class CreateLeaveRequestDto {
        private Long leaveTypeId;
        private java.time.LocalDate startDate;
        private java.time.LocalDate endDate;
        private String reason;
    }
}
