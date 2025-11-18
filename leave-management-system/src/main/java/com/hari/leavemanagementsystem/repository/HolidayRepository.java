package com.hari.leavemanagementsystem.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hari.leavemanagementsystem.model.Holiday;

public interface HolidayRepository extends JpaRepository<Holiday, Long> {
    Optional<Holiday> findByDate(LocalDate date);
    
    List<Holiday> findByDateBetween(LocalDate start, LocalDate end);

}
