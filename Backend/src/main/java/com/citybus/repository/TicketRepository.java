package com.citybus.repository;

import com.citybus.model.Ticket;
import com.citybus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    Optional<Ticket> findByQrToken(String qrToken);

    List<Ticket> findByUser(User user);

}
