package com.hari.leavemanagementsystem.service;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hari.leavemanagementsystem.dto.CalendarDto;
import com.hari.leavemanagementsystem.model.Holiday;
import com.hari.leavemanagementsystem.model.LeaveRequest;
import com.hari.leavemanagementsystem.repository.HolidayRepository;
import com.hari.leavemanagementsystem.repository.LeaveRequestRepository;

import lombok.RequiredArgsConstructor;
    
@Service
@RequiredArgsConstructor
public class CalendarService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final HolidayRepository holidayRepository;

    public CalendarDto getCalendar(LocalDate start, LocalDate end, String role, Long userId) {

        List<LeaveRequest> leaves;

        if (role.equals("ROLE_ADMIN")) {
            leaves = leaveRequestRepository.findAllByDateRange(start, end);
        } else {
            leaves = leaveRequestRepository.findByEmployeeAndDateRange(userId, start, end);
        }

        List<Holiday> holidays = holidayRepository.findByDateBetween(start, end);

        CalendarDto dto = new CalendarDto();

        // Convert leaves → CalendarLeaveDto
        dto.setLeaves(
            leaves.stream().flatMap(leave -> {
                return leave.getDatesBetween()
                    .stream()
                    .map(date -> {
                        CalendarDto.CalendarLeaveDto l = new CalendarDto.CalendarLeaveDto();
                        l.setDate(date);
                        l.setType(leave.getLeaveType().getTypeName());
                        l.setStatus(leave.getStatus());
                        l.setEmployeeId(leave.getEmployee().getId());
                        return l;
                    });
            }).toList()
        );

        // Convert holidays → CalendarHolidayDto
        dto.setHolidays(
            holidays.stream().map(h -> {
                CalendarDto.CalendarHolidayDto hDto =
                    new CalendarDto.CalendarHolidayDto();
                hDto.setDate(h.getDate());
                hDto.setName(h.getName());
                return hDto;
            }).toList()
        );

        return dto;
    }
}
