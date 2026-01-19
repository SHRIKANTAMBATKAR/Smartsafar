package com.smartsafar.controller;

import com.smartsafar.dto.BusResponseDTO;
import com.smartsafar.service.BusService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin("*")
public class BusController {

    private final BusService busService;

    public BusController(BusService busService) {
        this.busService = busService;
    }

    @GetMapping("/search")
    public List<BusResponseDTO> searchBus(
            @RequestParam String from,
            @RequestParam String to
    ) {
        return busService.searchBus(from, to);
    }
    
}
