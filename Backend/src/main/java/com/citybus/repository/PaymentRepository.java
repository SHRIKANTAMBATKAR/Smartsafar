package com.citybus.repository;

import com.citybus.model.Payment;
import com.citybus.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Find payment using ticket
    Optional<Payment> findByTicket(Ticket ticket);

    // Find payment using transaction ID
    Optional<Payment> findByTransactionId(String transactionId);

}
