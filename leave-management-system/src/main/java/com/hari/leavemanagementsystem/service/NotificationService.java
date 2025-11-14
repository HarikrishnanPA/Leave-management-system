package com.hari.leavemanagementsystem.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import com.hari.leavemanagementsystem.model.Notification;
import com.hari.leavemanagementsystem.model.Employee;
import com.hari.leavemanagementsystem.repository.NotificationRepository;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    @Transactional
    public Notification createNotification(Employee recipient, String type, String message) {
        Notification n = Notification.builder()
                .user(recipient)
                .type(type)
                .message(message)
                .build();
        return notificationRepository.save(n);
    }

    public List<Notification> getNotificationsForUser(Employee user) {
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    @Transactional
    public Notification markAsRead(Long notificationId) {
        Notification n = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
        n.setReadAt(java.time.LocalDateTime.now());
        return notificationRepository.save(n);
    }
}
