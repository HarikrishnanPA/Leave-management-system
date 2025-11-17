package com.hari.leavemanagementsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hari.leavemanagementsystem.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);

    // 🔥 fetch only active employees
    List<Employee> findByActiveTrue();
    List<Employee> findByDepartmentAndActiveTrue(String department);

}
