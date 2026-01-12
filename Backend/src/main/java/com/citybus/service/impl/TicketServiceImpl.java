package com.citybus.service.impl;

import com.citybus.model.Bus;
import com.citybus.model.Ticket;
import com.citybus.model.User;
import com.citybus.repository.BusRepository;
import com.citybus.repository.TicketRepository;
import com.citybus.repository.UserRepository;
import com.citybus.service.TicketService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final BusRepository busRepository;

    public TicketServiceImpl(TicketRepository ticketRepository,
                             UserRepository userRepository,
                             BusRepository busRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.busRepository = busRepository;
    }

    @Override
    public Ticket bookTicket(Long userId, Long busId, double fare) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setBus(bus);
        ticket.setFare(fare);
        ticket.setQrToken(UUID.randomUUID().toString());
        ticket.setStatus("VALID");
        ticket.setBookingTime(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    @Override
    public Ticket validateTicket(String qrToken) {

        Ticket ticket = ticketRepository.findByQrToken(qrToken)
                .orElseThrow(() -> new RuntimeException("Invalid QR Code"));

        if (!ticket.getStatus().equals("VALID")) {
            throw new RuntimeException("Ticket already used or expired");
        }

        ticket.setStatus("USED");
        ticket.setScanTime(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    @Override
    public List<Ticket> getUserTickets(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ticketRepository.findByUser(user);
    }
}
