package com.hari.leavemanagementsystem.controller;

import java.util.List;

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
import com.hari.leavemanagementsystem.security.CustomUserDetails;
import com.hari.leavemanagementsystem.service.LeaveRequestService;

import lombok.Data;

@RestController
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestService.getAllLeaveRequests();
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getLeaveRequestsByEmployee(
            @PathVariable Long employeeId,
            Authentication authentication
    ) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        boolean isEmployee = userDetails.getAuthorities()
                .stream().anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"));

        if (isEmployee && !userDetails.getId().equals(employeeId)) {
            throw new AccessDeniedException("You can only view your own leave requests");
        }
        return leaveRequestService.getLeaveRequestsByEmployeeId(employeeId);
    }

    /**
     * Employee creates a leave request.
     * Accepts a small DTO so that client provides leaveTypeId rather than a nested LeaveType object.
     */
    @PreAuthorize("hasRole('EMPLOYEE')")
    @PostMapping
    public ResponseEntity<LeaveRequest> createLeaveRequest(@RequestBody CreateLeaveRequestDto dto, Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // build LeaveRequest entity from DTO
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setStartDate(dto.getStartDate());
        leaveRequest.setEndDate(dto.getEndDate());
        leaveRequest.setReason(dto.getReason());
        // status will be set in service.saveLeaveRequest if null

        // attach employee and leave type using service helpers
        leaveRequestService.attachEmployeeToRequest(leaveRequest, userDetails.getId());
        leaveRequestService.attachLeaveTypeToRequest(leaveRequest, dto.getLeaveTypeId());

        LeaveRequest saved = leaveRequestService.saveLeaveRequest(leaveRequest);
        return ResponseEntity.status(201).body(saved);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLeaveRequest(@PathVariable Long id) {
        leaveRequestService.deleteLeaveRequest(id);
        return ResponseEntity.noContent().build();
    }

    // Small public DTO class for create request
    @Data
    public static class CreateLeaveRequestDto {
        private Long leaveTypeId;
        private java.time.LocalDate startDate;
        private java.time.LocalDate endDate;
        private String reason;
    }
}
