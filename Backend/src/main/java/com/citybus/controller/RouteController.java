package com.citybus.controller;

import com.citybus.dto.response.RouteResponse;
import com.citybus.model.Route;
import com.citybus.service.RouteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<RouteResponse>> searchRoutes(
            @RequestParam String source,
            @RequestParam String destination
    ) {
        List<Route> routes = routeService.searchRoutes(source, destination);

        List<RouteResponse> response = routes.stream().map(route -> {
            RouteResponse dto = new RouteResponse();
            dto.setRouteId(route.getId());
            dto.setSource(route.getSource());
            dto.setDestination(route.getDestination());
            dto.setStops(
                    route.getStops()
                            .stream()
                            .map(stop -> stop.getStopName())
                            .collect(Collectors.toList())
            );
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}
