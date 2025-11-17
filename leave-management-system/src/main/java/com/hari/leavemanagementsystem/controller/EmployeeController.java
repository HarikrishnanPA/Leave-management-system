package com.hari.leavemanagementsystem.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hari.leavemanagementsystem.model.Employee;
import com.hari.leavemanagementsystem.payload.ApiResponse;
import com.hari.leavemanagementsystem.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // --------------------------------------------------------
    // GET ALL EMPLOYEES (Active only)
    // --------------------------------------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<?> getAllEmployees() {

        List<Employee> employees = employeeService.getAllEmployees();

        ApiResponse response = new ApiResponse(
                "success",
                "All active employees retrieved successfully",
                Map.of("employees", employees)
        );

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------------
    // GET EMPLOYEE BY ID
    // --------------------------------------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id) {

        Employee employee = employeeService.getEmployeeById(id);

        ApiResponse response = new ApiResponse(
                "success",
                "Employee retrieved successfully",
                Map.of("employee", employee)
        );

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------------
    // CREATE EMPLOYEE
    // --------------------------------------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {

        Employee saved = employeeService.saveEmployee(employee);

        ApiResponse response = new ApiResponse(
                "success",
                "Employee created successfully",
                Map.of("employee", saved)
        );

        return ResponseEntity.status(201).body(response);
    }

    // --------------------------------------------------------
    // SOFT DELETE EMPLOYEE
    // --------------------------------------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {

        employeeService.deleteEmployee(id);

        ApiResponse response = new ApiResponse(
                "success",
                "Employee marked as inactive successfully",
                Map.of("employeeId", id)
        );

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------------
    // GET EMPLOYEES BY DEPARTMENT (Active only)
    // --------------------------------------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/department/{department}")
    public ResponseEntity<?> getEmployeesByDepartment(@PathVariable String department) {

        List<Employee> employees = employeeService.getEmployeesByDepartment(department);

        ApiResponse response = new ApiResponse(
                "success",
                "Employees from department '" + department + "' retrieved successfully",
                Map.of("employees", employees)
        );

        return ResponseEntity.ok(response);
    }
}
