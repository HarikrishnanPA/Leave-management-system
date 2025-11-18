package com.hari.leavemanagementsystem.controller;
import java.time.LocalDate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.hari.leavemanagementsystem.dto.CalendarDto;
import com.hari.leavemanagementsystem.payload.ApiResponse;
import com.hari.leavemanagementsystem.security.CustomUserDetails;
import com.hari.leavemanagementsystem.service.CalendarService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping
    public ApiResponse getCalendar(
            @RequestParam LocalDate start,
            @RequestParam LocalDate end,
            Authentication auth) {

        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();

        CalendarDto dto = calendarService.getCalendar(
                start,
                end,
                user.getRole(),
                user.getId()
        );

        return new ApiResponse(
                    "success",
                    "Calendar data fetched",
                    dto
            );
    }
}
