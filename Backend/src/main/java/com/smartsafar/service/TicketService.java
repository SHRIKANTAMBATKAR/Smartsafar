package com.smartsafar.service;

import com.smartsafar.dto.TicketBookingRequestDTO;
import com.smartsafar.dto.TicketResponseDTO;

import java.util.List;

public interface TicketService {

    TicketResponseDTO bookTicket(TicketBookingRequestDTO dto);

    List<TicketResponseDTO> getUserTickets(Long userId);

    TicketResponseDTO validateTicket(String qrToken);
}
