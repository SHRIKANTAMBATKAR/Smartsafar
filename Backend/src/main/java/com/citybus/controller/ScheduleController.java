package com.citybus.controller;

import com.citybus.model.Schedule;
import com.citybus.service.ScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@CrossOrigin
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostMapping
    public ResponseEntity<Schedule> addSchedule(
            @RequestBody Schedule schedule
    ) {
        return ResponseEntity.ok(scheduleService.addSchedule(schedule));
    }

    @GetMapping("/route/{routeId}")
    public ResponseEntity<List<Schedule>> getSchedulesByRoute(
            @PathVariable Long routeId
    ) {
        return ResponseEntity.ok(
                scheduleService.getSchedulesByRoute(routeId)
        );
    }
}
