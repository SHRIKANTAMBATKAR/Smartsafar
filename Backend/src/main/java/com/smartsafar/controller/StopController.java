package com.smartsafar.controller;

import com.smartsafar.dto.StopDTO;
import com.smartsafar.service.StopService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stops")
@CrossOrigin("*")
public class StopController {

    private final StopService stopService;

    public StopController(StopService stopService) {
        this.stopService = stopService;
    }

    @PostMapping
    public StopDTO addStop(@RequestBody StopDTO dto) {
        return stopService.addStop(dto);
    }

    @GetMapping
    public List<StopDTO> getStops() {
        return stopService.getAllStops();
    }
}
