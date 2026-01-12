package com.citybus.controller;

import com.citybus.model.Payment;
import com.citybus.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/pay")
    public ResponseEntity<Payment> makePayment(
            @RequestParam Long ticketId,
            @RequestParam String paymentMode
    ) {
        return ResponseEntity.ok(
                paymentService.createPayment(ticketId, paymentMode)
        );
    }
}
