package com.smartsafar.controller;

import com.smartsafar.dto.PaymentRequestDTO;
import com.smartsafar.dto.PaymentResponseDTO;
import com.smartsafar.service.PaymentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin("*")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public PaymentResponseDTO makePayment(@RequestBody PaymentRequestDTO dto) {
        return paymentService.makePayment(dto);
    }
}
