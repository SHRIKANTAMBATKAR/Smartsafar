package com.smartsafar.serviceImpl;

import com.smartsafar.dto.DashboardResponse;
import com.smartsafar.entity.Ticket;
import com.smartsafar.entity.User;
import com.smartsafar.repository.TicketRepository;
import com.smartsafar.repository.UserRepository;
import com.smartsafar.service.DashboardService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public DashboardServiceImpl(TicketRepository ticketRepository,
                                UserRepository userRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    @Override
    public DashboardResponse getDashboardData(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Ticket> allTickets = ticketRepository.findByUserId(userId);
        List<Ticket> upcomingTrips = ticketRepository.findByUserIdAndStatus(userId, "BOOKED");
        List<Ticket> recentTrips = ticketRepository
                .findTop5ByUserIdOrderByBookingTimeDesc(userId);

        DashboardResponse response = new DashboardResponse();
        response.setTotalTrips(allTickets.size());
        response.setRewardPoints(user.getRewardPoints());
        response.setUpcomingTrips(upcomingTrips);
        response.setRecentTrips(recentTrips);

        return response;
    }
}
