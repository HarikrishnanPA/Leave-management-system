package com.hari.leavemanagementsystem.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hari.leavemanagementsystem.model.Holiday;
import com.hari.leavemanagementsystem.payload.ApiResponse;
import com.hari.leavemanagementsystem.repository.HolidayRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/holidays")
@RequiredArgsConstructor
public class HolidayController {

    private final HolidayRepository holidayRepository;

    // --------------------------------------------------------
    // ANYONE LOGGED IN → View all holidays
    // --------------------------------------------------------
    @GetMapping
    public ResponseEntity<?> getAll() {

        List<Holiday> holidays = holidayRepository.findAll();

        ApiResponse response = new ApiResponse(
                "success",
                "Holiday list retrieved successfully",
                Map.of("holidays", holidays)
        );

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------------
    // ADMIN → Create new holiday
    // --------------------------------------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Holiday payload) {

        var existing = holidayRepository.findByDate(payload.getDate());
        if (existing.isPresent()) {
            throw new RuntimeException("Holiday already exists for this date");
        }

        Holiday saved = holidayRepository.save(payload);

        ApiResponse response = new ApiResponse(
                "success",
                "Holiday created successfully",
                Map.of("holiday", saved)
        );

        return ResponseEntity.status(201).body(response);
    }

    // --------------------------------------------------------
    // ADMIN → Update holiday
    // --------------------------------------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Holiday payload) {

        Holiday holiday = holidayRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Holiday not found"));

        holiday.setName(payload.getName());
        holiday.setDate(payload.getDate());

        Holiday updated = holidayRepository.save(holiday);

        ApiResponse response = new ApiResponse(
                "success",
                "Holiday updated successfully",
                Map.of(
                        "holidayId", id,
                        "holiday", updated
                )
        );

        return ResponseEntity.ok(response);
    }

    // --------------------------------------------------------
    // ADMIN → Delete holiday
    // --------------------------------------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {

        holidayRepository.deleteById(id);

        ApiResponse response = new ApiResponse(
                "success",
                "Holiday deleted successfully",
                Map.of("holidayId", id)
        );

        return ResponseEntity.ok(response);
    }
}
