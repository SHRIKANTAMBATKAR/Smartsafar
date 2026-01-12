package com.citybus.service.impl;

import com.citybus.model.Payment;
import com.citybus.model.Ticket;
import com.citybus.repository.PaymentRepository;
import com.citybus.repository.TicketRepository;
import com.citybus.service.PaymentService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final TicketRepository ticketRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository,
                              TicketRepository ticketRepository) {
        this.paymentRepository = paymentRepository;
        this.ticketRepository = ticketRepository;
    }

    @Override
    public Payment createPayment(Long ticketId, String paymentMode) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        Payment payment = new Payment();
        payment.setTicket(ticket);
        payment.setPaymentMode(paymentMode);
        payment.setAmount(ticket.getFare());
        payment.setStatus("SUCCESS");
        payment.setTransactionId(UUID.randomUUID().toString());
        payment.setPaymentTime(LocalDateTime.now());

        return paymentRepository.save(payment);
    }
}
