package com.hari.leavemanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hari.leavemanagementsystem.model.LeaveType;
import com.hari.leavemanagementsystem.service.LeaveTypeService;

@RestController
@RequestMapping("/api/leave-types")
public class LeaveTypeController {

    @Autowired
    private LeaveTypeService leaveTypeService;

    @GetMapping
    public List<LeaveType> getAllLeaveTypes() {
        return leaveTypeService.getAllLeaveTypes();
    }

    @PostMapping
    public LeaveType createLeaveType(@RequestBody LeaveType leaveType) {
        return leaveTypeService.saveLeaveType(leaveType);
    }

    @DeleteMapping("/{id}")
    public void deleteLeaveType(@PathVariable Long id) {
        leaveTypeService.deleteLeaveType(id);
    }
}
