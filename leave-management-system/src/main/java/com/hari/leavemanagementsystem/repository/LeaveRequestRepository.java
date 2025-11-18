package com.hari.leavemanagementsystem.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hari.leavemanagementsystem.model.LeaveRequest;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmployeeId(Long employeeId);

    @Query("SELECT lr FROM LeaveRequest lr WHERE lr.startDate <= :end AND lr.endDate >= :start")
    List<LeaveRequest> findAllByDateRange(LocalDate start, LocalDate end);

    @Query("SELECT lr FROM LeaveRequest lr WHERE lr.employee.id = :empId AND lr.startDate <= :end AND lr.endDate >= :start")
    List<LeaveRequest> findByEmployeeAndDateRange(Long empId, LocalDate start, LocalDate end);


}
