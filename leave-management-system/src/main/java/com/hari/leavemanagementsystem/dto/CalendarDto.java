package com.hari.leavemanagementsystem.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class CalendarDto {

    private List<CalendarLeaveDto> leaves;
    private List<CalendarHolidayDto> holidays;

    @Data
    public static class CalendarLeaveDto {
        private LocalDate date;
        private String type;
        private String status;
        private Long employeeId; // only for admin
    }

    @Data
    public static class CalendarHolidayDto {
        private LocalDate date;
        private String name;
    }
}
