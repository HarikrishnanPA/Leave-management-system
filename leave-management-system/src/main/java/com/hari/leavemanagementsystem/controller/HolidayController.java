package com.hari.leavemanagementsystem.controller;

import java.util.List;

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
import com.hari.leavemanagementsystem.repository.HolidayRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/holidays")
@RequiredArgsConstructor
public class HolidayController {

    private final HolidayRepository holidayRepository;

    @GetMapping
    public ResponseEntity<List<Holiday>> getAll() {
        return ResponseEntity.ok(holidayRepository.findAll());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Holiday> create(@RequestBody Holiday payload) {
        // check duplicate date
        var existing = holidayRepository.findByDate(payload.getDate());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        var saved = holidayRepository.save(payload);
        return ResponseEntity.ok(saved);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Holiday> update(@PathVariable Long id, @RequestBody Holiday payload) {
        Holiday h = holidayRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Holiday not found"));
        h.setName(payload.getName());
        h.setDate(payload.getDate());
        return ResponseEntity.ok(holidayRepository.save(h));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        holidayRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
