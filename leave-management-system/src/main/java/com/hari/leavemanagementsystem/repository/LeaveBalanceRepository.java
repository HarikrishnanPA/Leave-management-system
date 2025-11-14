package com.hari.leavemanagementsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hari.leavemanagementsystem.model.Employee;
import com.hari.leavemanagementsystem.model.LeaveBalance;
import com.hari.leavemanagementsystem.model.LeaveType;

public interface LeaveBalanceRepository extends JpaRepository<LeaveBalance, Long> {
    List<LeaveBalance> findByEmployee(Employee employee);
    Optional<LeaveBalance> findByEmployeeAndLeaveType(Employee employee, LeaveType leaveType);
}
