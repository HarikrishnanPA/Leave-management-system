package com.hari.leavemanagementsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hari.leavemanagementsystem.model.Employee;
import com.hari.leavemanagementsystem.model.LeaveRequest;
import com.hari.leavemanagementsystem.model.LeaveType;
import com.hari.leavemanagementsystem.model.ManagerResponse;
import com.hari.leavemanagementsystem.repository.EmployeeRepository;
import com.hari.leavemanagementsystem.repository.LeaveRequestRepository;
import com.hari.leavemanagementsystem.repository.ManagerResponseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ManagerResponseService {

    private final ManagerResponseRepository managerResponseRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final LeaveBalanceService leaveBalanceService;
    private final NotificationService notificationService;
    private final EmployeeRepository employeeRepository;

    /**
     * Manager (admin) responds to a leave request. This method:
     * - creates ManagerResponse
     * - updates LeaveRequest.status
     * - if approved -> deducts leave balance
     * - generates notification for the employee
     */
    @Transactional
    public ManagerResponse respondToRequest(Long managerId, Long requestId, boolean approved, String message) {
        Employee manager = employeeRepository.findById(managerId)
                .orElseThrow(() -> new IllegalArgumentException("Manager not found"));

        LeaveRequest request = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("LeaveRequest not found"));

        Employee employee = request.getEmployee();
        LeaveType leaveType = request.getLeaveType();

        // create manager response
        ManagerResponse response = ManagerResponse.builder()
                .manager(manager)
                .user(employee)
                .leaveRequest(request)
                .approved(approved)
                .message(message)
                .build();
        ManagerResponse savedResp = managerResponseRepository.save(response);

        // update leaveRequest status
        request.setStatus(approved ? "APPROVED" : "REJECTED");
        leaveRequestRepository.save(request);

        // if approved -> deduct leave balance
        if (approved) {
            long days = java.time.temporal.ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) + 1;
            int intDays = (int) days;
            leaveBalanceService.deductBalance(employee, leaveType, intDays);
        }

        // create notification for employee
        String notifMessage = approved
                ? String.format("Your leave request (ID %d) has been APPROVED", request.getId())
                : String.format("Your leave request (ID %d) has been REJECTED: %s", request.getId(), message);

        notificationService.createNotification(employee, "STATUS_UPDATE", notifMessage);

        return savedResp;
    }

    /**
     * Fetch all manager responses for a specific leave request.
     * - Admin can view ANY request
     * - Employee can only view responses for THEIR OWN leave request
     */
    public List<ManagerResponse> getResponsesForRequest(Long requestId, Employee currentUser) {

        LeaveRequest request = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("LeaveRequest not found"));

        // If normal employee, restrict access to their own request only
        if (!currentUser.getRole().equals("ROLE_ADMIN")) {
            if (!request.getEmployee().getId().equals(currentUser.getId())) {
                throw new RuntimeException("Not authorized to view manager responses for this request");
            }
        }

        return managerResponseRepository.findByLeaveRequest(request);
    }
}
