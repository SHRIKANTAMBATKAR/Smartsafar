package com.citybus.controller;

import com.citybus.dto.response.TicketResponse;
import com.citybus.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final TicketService ticketService;

    public UserController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/{userId}/tickets")
    public ResponseEntity<List<TicketResponse>> getUserTickets(
            @PathVariable Long userId
    ) {
        List<TicketResponse> response = ticketService.getUserTickets(userId)
                .stream()
                .map(ticket -> {
                    TicketResponse dto = new TicketResponse();
                    dto.setTicketId(ticket.getId());
                    dto.setBusNumber(ticket.getBus().getBusNumber());
                    dto.setFare(ticket.getFare());
                    dto.setStatus(ticket.getStatus());
                    dto.setQrToken(ticket.getQrToken());
                    dto.setBookingTime(ticket.getBookingTime());
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}
