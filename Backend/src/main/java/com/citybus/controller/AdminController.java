package com.citybus.controller;

import com.citybus.model.Bus;
import com.citybus.model.Route;
import com.citybus.service.BusService;
import com.citybus.service.RouteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final BusService busService;
    private final RouteService routeService;

    public AdminController(BusService busService,
                           RouteService routeService) {
        this.busService = busService;
        this.routeService = routeService;
    }

    @GetMapping("/buses")
    public ResponseEntity<List<Bus>> getAllBuses() {
        return ResponseEntity.ok(busService.getAllBuses());
    }

    @GetMapping("/routes")
    public ResponseEntity<List<Route>> getAllRoutes() {
        return ResponseEntity.ok(routeService.searchRoutes("", ""));
    }
}
