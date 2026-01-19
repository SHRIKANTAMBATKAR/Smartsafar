package com.smartsafar.controller;

import com.smartsafar.dto.TicketBookingRequestDTO;
import com.smartsafar.dto.TicketResponseDTO;
import com.smartsafar.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin("*")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/book")
    public TicketResponseDTO bookTicket(
            @RequestBody TicketBookingRequestDTO dto
    ) {
        return ticketService.bookTicket(dto);
    }

    @GetMapping("/user/{userId}")
    public List<TicketResponseDTO> getUserTickets(@PathVariable Long userId) {
        return ticketService.getUserTickets(userId);
    }

    @PostMapping("/validate")
    public TicketResponseDTO validateTicket(@RequestParam String qrToken) {
        return ticketService.validateTicket(qrToken);
    }
}
