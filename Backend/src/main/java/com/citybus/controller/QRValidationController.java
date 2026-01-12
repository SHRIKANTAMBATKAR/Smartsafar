package com.citybus.controller;

import com.citybus.dto.request.QRValidationRequest;
import com.citybus.dto.response.QRValidationResponse;
import com.citybus.model.Ticket;
import com.citybus.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/qr")
@CrossOrigin
public class QRValidationController {

    private final TicketService ticketService;

    public QRValidationController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/validate")
    public ResponseEntity<QRValidationResponse> validateTicket(
            @RequestBody QRValidationRequest request
    ) {
        Ticket ticket = ticketService.validateTicket(request.getQrToken());

        QRValidationResponse response = new QRValidationResponse();
        response.setValid(true);
        response.setMessage("Ticket is valid");
        response.setBusNumber(ticket.getBus().getBusNumber());
        response.setRoute(
                ticket.getBus().getBusNumber()
        );

        return ResponseEntity.ok(response);
    }
}
