package com.hari.leavemanagementsystem.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hari.leavemanagementsystem.model.Employee;
import com.hari.leavemanagementsystem.model.LeaveBalance;
import com.hari.leavemanagementsystem.payload.ApiResponse;
import com.hari.leavemanagementsystem.repository.EmployeeRepository;
import com.hari.leavemanagementsystem.service.LeaveBalanceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/leave-balance")
@RequiredArgsConstructor
public class LeaveBalanceController {

    private final LeaveBalanceService leaveBalanceService;
    private final EmployeeRepository employeeRepository;

    // --------------------------------------------------------
    // EMPLOYEE or ADMIN → Get own leave balance
    // --------------------------------------------------------
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/my")
    public ResponseEntity<?> getMyBalance(Principal principal) {

        Employee user = employeeRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<LeaveBalance> balances = leaveBalanceService.getBalancesForEmployee(user);

        ApiResponse response = new ApiResponse(
                "success",
                "Leave balances retrieved successfully",
                Map.of("leaveBalances", balances)
        );

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------------
    // ADMIN → Get leave balances of all employees
    // --------------------------------------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<?> getAllBalances() {

        List<LeaveBalance> balances = leaveBalanceService.getAllBalances();

        ApiResponse response = new ApiResponse(
                "success",
                "All employee leave balances retrieved successfully",
                Map.of("leaveBalances", balances)
        );

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------------
    // ADMIN → Initialize leave balance for an employee
    // --------------------------------------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/init/{employeeId}")
    public ResponseEntity<?> initBalance(@PathVariable Long employeeId) {

        leaveBalanceService.initializeEmployeeLeaveBalances(employeeId);

        ApiResponse response = new ApiResponse(
                "success",
                "Leave balances initialized successfully for employee",
                Map.of("employeeId", employeeId)
        );

        return ResponseEntity.ok(response);
    }
}
