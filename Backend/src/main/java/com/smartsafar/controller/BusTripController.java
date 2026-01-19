package com.smartsafar.controller;

import com.smartsafar.dto.BusTripDTO;
import com.smartsafar.service.BusTripService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin("*")
public class BusTripController {

    private final BusTripService service;

    public BusTripController(BusTripService service) {
        this.service = service;
    }

    @PostMapping("/start")
    public BusTripDTO startTrip(@RequestBody BusTripDTO dto) {
        return service.startTrip(dto);
    }

    @PutMapping("/update/{tripId}")
    public BusTripDTO updateTrip(
            @PathVariable Long tripId,
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam int stopIndex
    ) {
        return service.updateLocation(tripId, lat, lng, stopIndex);
    }

    @GetMapping("/active/{routeId}")
    public List<BusTripDTO> activeTrips(@PathVariable Long routeId) {
        return service.getActiveTrips(routeId);
    }
}
