package com.smartsafar.repository;

import com.smartsafar.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByUserId(Long userId);

    List<Ticket> findTop5ByUserIdOrderByBookingTimeDesc(Long userId);

    List<Ticket> findByUserIdAndStatus(Long userId, String status);
   
    Optional<Ticket> findByQrToken(String qrToken);
}
