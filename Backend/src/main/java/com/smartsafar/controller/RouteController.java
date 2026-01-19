package com.smartsafar.controller;

import com.smartsafar.dto.RouteDTO;
import com.smartsafar.service.RouteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin("*")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @PostMapping
    public RouteDTO addRoute(@RequestBody RouteDTO dto) {
        return routeService.addRoute(dto);
    }

    @GetMapping
    public List<RouteDTO> getRoutes() {
        return routeService.getAllRoutes();
    }
}
