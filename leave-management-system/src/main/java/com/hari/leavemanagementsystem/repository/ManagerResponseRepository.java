package com.hari.leavemanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hari.leavemanagementsystem.model.Employee;
import com.hari.leavemanagementsystem.model.LeaveRequest;
import com.hari.leavemanagementsystem.model.ManagerResponse;

public interface ManagerResponseRepository extends JpaRepository<ManagerResponse, Long> {
    List<ManagerResponse> findByUser(Employee user);
    List<ManagerResponse> findByLeaveRequest(LeaveRequest leaveRequest);
    List<ManagerResponse> findByManager(Employee manager);
}
