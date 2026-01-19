package com.smartsafar.controller;

import com.smartsafar.dto.BusScheduleDTO;
import com.smartsafar.service.BusScheduleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@CrossOrigin("*")
public class BusScheduleController {

    private final BusScheduleService service;

    public BusScheduleController(BusScheduleService service) {
        this.service = service;
    }

    @PostMapping
    public BusScheduleDTO addSchedule(@RequestBody BusScheduleDTO dto) {
        return service.addSchedule(dto);
    }

    @GetMapping("/route/{routeId}")
    public List<BusScheduleDTO> getSchedules(@PathVariable Long routeId) {
        return service.getSchedulesByRoute(routeId);
    }
}
