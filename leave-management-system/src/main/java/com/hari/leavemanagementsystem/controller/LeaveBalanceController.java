package com.hari.leavemanagementsystem.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hari.leavemanagementsystem.model.Employee;
import com.hari.leavemanagementsystem.model.LeaveBalance;
import com.hari.leavemanagementsystem.repository.EmployeeRepository;
import com.hari.leavemanagementsystem.service.LeaveBalanceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/leave-balance")
@RequiredArgsConstructor
public class LeaveBalanceController {

    private final LeaveBalanceService leaveBalanceService;
    private final EmployeeRepository employeeRepository;

    /**
     * Employee or Admin: get their own leave balance.
     */
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/my")
    public ResponseEntity<List<LeaveBalance>> getMyBalance(Principal principal) {

        Employee user = employeeRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<LeaveBalance> balances = leaveBalanceService.getBalancesForEmployee(user);
        return ResponseEntity.ok(balances);
    }

    /**
     * Admin only: view leave balances of ALL employees.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<LeaveBalance>> getAllBalances() {
        List<LeaveBalance> balances = leaveBalanceService.getAllBalances();
        return ResponseEntity.ok(balances);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/init/{employeeId}")
    public ResponseEntity<?> initBalance(@PathVariable Long employeeId) {
        leaveBalanceService.initializeEmployeeLeaveBalances(employeeId);
        return ResponseEntity.ok("Leave balances initialized for employee " + employeeId);
    }

}
