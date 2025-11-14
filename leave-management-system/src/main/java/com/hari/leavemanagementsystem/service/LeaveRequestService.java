package com.hari.leavemanagementsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hari.leavemanagementsystem.model.Employee;
import com.hari.leavemanagementsystem.model.LeaveRequest;
import com.hari.leavemanagementsystem.model.LeaveType;
import com.hari.leavemanagementsystem.repository.EmployeeRepository;
import com.hari.leavemanagementsystem.repository.LeaveRequestRepository;
import com.hari.leavemanagementsystem.repository.LeaveTypeRepository;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LeaveTypeRepository leaveTypeRepository;

    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    public LeaveRequest getLeaveRequestById(Long id) {
        return leaveRequestRepository.findById(id).orElse(null);
    }

    public List<LeaveRequest> getLeaveRequestsByEmployeeId(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    public LeaveRequest saveLeaveRequest(LeaveRequest leaveRequest) {

        // 👉 Always set default status for new leave requests
        if (leaveRequest.getStatus() == null) {
            leaveRequest.setStatus("PENDING");
        }

        return leaveRequestRepository.save(leaveRequest);
    }

    public void deleteLeaveRequest(Long id) {
        leaveRequestRepository.deleteById(id);
    }

    // ✅ Helper for linking the logged-in employee
    public void attachEmployeeToRequest(LeaveRequest leaveRequest, Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + employeeId));
        leaveRequest.setEmployee(employee);
    }

    // ✅ Helper for linking leave type by id
    public void attachLeaveTypeToRequest(LeaveRequest leaveRequest, Long leaveTypeId) {
        LeaveType leaveType = leaveTypeRepository.findById(leaveTypeId)
                .orElseThrow(() -> new RuntimeException("LeaveType not found with ID: " + leaveTypeId));
        leaveRequest.setLeaveType(leaveType);
    }
}
