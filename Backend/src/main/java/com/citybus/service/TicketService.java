package com.citybus.service;

import com.citybus.model.Ticket;

import java.util.List;

public interface TicketService {

    Ticket bookTicket(Long userId, Long busId, double fare);

    Ticket validateTicket(String qrToken);

    List<Ticket> getUserTickets(Long userId);
}
