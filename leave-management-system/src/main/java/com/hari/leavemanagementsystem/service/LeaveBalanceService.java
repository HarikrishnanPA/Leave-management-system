package com.hari.leavemanagementsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hari.leavemanagementsystem.model.Employee;
import com.hari.leavemanagementsystem.model.LeaveBalance;
import com.hari.leavemanagementsystem.model.LeaveType;
import com.hari.leavemanagementsystem.repository.EmployeeRepository;
import com.hari.leavemanagementsystem.repository.LeaveBalanceRepository;
import com.hari.leavemanagementsystem.repository.LeaveTypeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LeaveBalanceService {

    private final LeaveBalanceRepository leaveBalanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LeaveTypeRepository leaveTypeRepository;

    public List<LeaveBalance> getBalancesForEmployee(Employee e) {
        return leaveBalanceRepository.findByEmployee(e);
    }

    public LeaveBalance getBalance(Employee e, LeaveType type) {
        return leaveBalanceRepository.findByEmployeeAndLeaveType(e, type)
                .orElseThrow(() -> new IllegalArgumentException("Balance not found"));
    }

    @Transactional
    public LeaveBalance createOrUpdateBalance(LeaveBalance b) {
        // For initialization / admin adjustments
        return leaveBalanceRepository.save(b);
    }

    @Transactional
    public void deductBalance(Employee employee, LeaveType leaveType, int days) {
        LeaveBalance balance = leaveBalanceRepository.findByEmployeeAndLeaveType(employee, leaveType)
                .orElseThrow(() -> new IllegalArgumentException("No leave balance for this type"));

        if (balance.getAvailableDays() < days) {
            throw new IllegalArgumentException("Insufficient leave balance");
        }

        balance.setAvailableDays(balance.getAvailableDays() - days);
        balance.setUsedDays(balance.getUsedDays() + days);
        leaveBalanceRepository.save(balance);
    }

    public List<LeaveBalance> getAllBalances() {
        return leaveBalanceRepository.findAll();
    }

    @Transactional
    public void initializeEmployeeLeaveBalances(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        List<LeaveType> types = leaveTypeRepository.findAll();

        for (LeaveType type : types) {

            boolean exists = leaveBalanceRepository
                    .findByEmployeeAndLeaveType(employee, type)
                    .isPresent();

            if (!exists) {
                LeaveBalance balance = LeaveBalance.builder()
                        .employee(employee)
                        .leaveType(type)
                        .availableDays(type.getMaxDays())
                        .usedDays(0)
                        .build();

                leaveBalanceRepository.save(balance);
            }
        }
}


}
