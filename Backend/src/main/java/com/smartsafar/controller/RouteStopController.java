package com.smartsafar.controller;

import com.smartsafar.dto.RouteStopDTO;
import com.smartsafar.service.RouteStopService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/route-stops")
@CrossOrigin("*")
public class RouteStopController {

    private final RouteStopService service;

    public RouteStopController(RouteStopService service) {
        this.service = service;
    }

    @PostMapping
    public RouteStopDTO addStop(@RequestBody RouteStopDTO dto) {
        return service.addStop(dto);
    }

    @GetMapping("/{routeId}")
    public List<RouteStopDTO> getStops(@PathVariable Long routeId) {
        return service.getStopsByRoute(routeId);
    }
}
