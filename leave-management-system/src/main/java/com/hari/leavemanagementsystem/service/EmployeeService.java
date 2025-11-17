package com.hari.leavemanagementsystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hari.leavemanagementsystem.model.Employee;
import com.hari.leavemanagementsystem.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 🔥 Return only active employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findByActiveTrue();
    }

    // 🔥 Return only if active
    public Employee getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (!employee.isActive()) {
            throw new RuntimeException("Employee is deactivated");
        }

        return employee;
    }

    // 🔥 Used in login flow — block inactive users
    public Optional<Employee> getEmployeeByEmail(String email) {
        Optional<Employee> emp = employeeRepository.findByEmail(email);

        if (emp.isPresent() && !emp.get().isActive()) {
            throw new RuntimeException("User account is deactivated");
        }

        return emp;
    }

    public Employee saveEmployee(Employee employee) {
        if (employee.getPassword() != null && !employee.getPassword().isBlank()) {
            employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        }
        employee.setActive(true); // ensure new employee defaults to active
        return employeeRepository.save(employee);
    }

    // 🔥 Soft delete — do NOT remove from DB
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setActive(false); // safe delete
        employeeRepository.save(employee);
    }

    public List<Employee> getEmployeesByDepartment(String department) {
        return employeeRepository.findByDepartmentAndActiveTrue(department);
    }

}
