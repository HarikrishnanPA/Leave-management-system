package com.hari.leavemanagementsystem.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hari.leavemanagementsystem.model.Notification;
import com.hari.leavemanagementsystem.model.Employee;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(Employee user);
}
