package com.smartsafar.serviceImpl;

import com.smartsafar.dto.TicketBookingRequestDTO;
import com.smartsafar.dto.TicketResponseDTO;
import com.smartsafar.entity.Bus;
import com.smartsafar.entity.Ticket;
import com.smartsafar.exception.ResourceNotFoundException;
import com.smartsafar.repository.BusRepository;
import com.smartsafar.repository.TicketRepository;
import com.smartsafar.service.TicketService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final BusRepository busRepository;

    public TicketServiceImpl(
            TicketRepository ticketRepository,
            BusRepository busRepository
    ) {
        this.ticketRepository = ticketRepository;
        this.busRepository = busRepository;
    }

    // 🎫 BOOK TICKET
    @Override
    public TicketResponseDTO bookTicket(TicketBookingRequestDTO dto) {

        Ticket ticket = new Ticket();
        ticket.setUserId(dto.getUserId());
        ticket.setBusId(dto.getBusId());
        ticket.setRouteId(dto.getRouteId());
        ticket.setFromStop(dto.getFromStop());
        ticket.setToStop(dto.getToStop());
        ticket.setPassengerCount(dto.getPassengerCount());
        ticket.setTotalFare(dto.getTotalFare());

        ticket.setQrToken(UUID.randomUUID().toString());
        ticket.setStatus("BOOKED");

        Ticket savedTicket = ticketRepository.save(ticket);

        return mapToResponse(savedTicket);
    }

    // 👤 USER TICKET HISTORY
    @Override
    public List<TicketResponseDTO> getUserTickets(Long userId) {

        return ticketRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ✅ VALIDATE TICKET (QR)
    @Override
    public TicketResponseDTO validateTicket(String qrToken) {

        Ticket ticket = ticketRepository.findByQrToken(qrToken)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invalid or expired QR ticket")
                );

        if (!"BOOKED".equals(ticket.getStatus())) {
            throw new ResourceNotFoundException("Ticket already used or cancelled");
        }

        ticket.setStatus("USED");
        Ticket updated = ticketRepository.save(ticket);

        return mapToResponse(updated);
    }

    // 🔁 ENTITY → DTO MAPPER
    private TicketResponseDTO mapToResponse(Ticket ticket) {

        TicketResponseDTO dto = new TicketResponseDTO();
        dto.setTicketId(ticket.getTicketId());
        dto.setFromStop(ticket.getFromStop());
        dto.setToStop(ticket.getToStop());
        dto.setPassengerCount(ticket.getPassengerCount());
        dto.setTotalFare(ticket.getTotalFare());
        dto.setQrToken(ticket.getQrToken());
        dto.setStatus(ticket.getStatus());
        dto.setBookingTime(ticket.getBookingTime());

        // Optional: bus number (safe)
        if (ticket.getBusId() != null) {
            Bus bus = busRepository.findById(ticket.getBusId()).orElse(null);
            if (bus != null) {
                dto.setBusNumber(bus.getBusNumber());
            }
        }

        return dto;
    }
}
