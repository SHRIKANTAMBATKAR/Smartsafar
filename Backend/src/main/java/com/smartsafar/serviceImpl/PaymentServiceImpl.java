package com.smartsafar.serviceImpl;

import com.smartsafar.dto.PaymentRequestDTO;
import com.smartsafar.dto.PaymentResponseDTO;
import com.smartsafar.entity.Payment;
import com.smartsafar.exception.ResourceNotFoundException;
import com.smartsafar.repository.PaymentRepository;
import com.smartsafar.repository.TicketRepository;
import com.smartsafar.service.PaymentService;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final TicketRepository ticketRepository;

    public PaymentServiceImpl(
            PaymentRepository paymentRepository,
            TicketRepository ticketRepository
    ) {
        this.paymentRepository = paymentRepository;
        this.ticketRepository = ticketRepository;
    }

    @Override
    public PaymentResponseDTO makePayment(PaymentRequestDTO dto) {

        ticketRepository.findById(dto.getTicketId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Ticket not found with id " + dto.getTicketId()
                        )
                );

        Payment payment = new Payment();
        payment.setTicketId(dto.getTicketId());
        payment.setAmount(dto.getAmount());
        payment.setPaymentMode(dto.getPaymentMode());
        payment.setPaymentStatus("SUCCESS");

        Payment saved = paymentRepository.save(payment);

        PaymentResponseDTO response = new PaymentResponseDTO();
        response.setPaymentId(saved.getPaymentId());
        response.setTicketId(saved.getTicketId());
        response.setAmount(saved.getAmount());
        response.setPaymentMode(saved.getPaymentMode());
        response.setPaymentStatus(saved.getPaymentStatus());
        response.setTransactionTime(saved.getTransactionTime());

        return response;
    }
}
