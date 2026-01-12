package com.citybus.controller;

import com.citybus.dto.request.TicketBookingRequest;
import com.citybus.dto.response.TicketResponse;
import com.citybus.model.Ticket;
import com.citybus.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/book")
    public ResponseEntity<TicketResponse> bookTicket(
            @RequestBody TicketBookingRequest request
    ) {
        Ticket ticket = ticketService.bookTicket(
                request.getUserId(),
                request.getBusId(),
                request.getFare()
        );

        TicketResponse response = mapToTicketResponse(ticket);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TicketResponse>> getUserTickets(
            @PathVariable Long userId
    ) {
        List<TicketResponse> response = ticketService.getUserTickets(userId)
                .stream()
                .map(this::mapToTicketResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    private TicketResponse mapToTicketResponse(Ticket ticket) {
        TicketResponse dto = new TicketResponse();
        dto.setTicketId(ticket.getId());
        dto.setBusNumber(ticket.getBus().getBusNumber());
        dto.setRoute(
                ticket.getBus().getId() != null
                        ? ticket.getBus().getBusNumber()
                        : ""
        );
        dto.setFare(ticket.getFare());
        dto.setStatus(ticket.getStatus());
        dto.setQrToken(ticket.getQrToken());
        dto.setBookingTime(ticket.getBookingTime());
        return dto;
    }
}
