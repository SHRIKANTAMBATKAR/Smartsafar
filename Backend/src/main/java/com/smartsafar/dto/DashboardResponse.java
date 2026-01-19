package com.smartsafar.dto;

import com.smartsafar.entity.Ticket;
import java.util.List;

public class DashboardResponse {

    private int totalTrips;
    private int rewardPoints;
    private List<Ticket> upcomingTrips;
    private List<Ticket> recentTrips;

    public int getTotalTrips() {
        return totalTrips;
    }

    public void setTotalTrips(int totalTrips) {
        this.totalTrips = totalTrips;
    }

    public int getRewardPoints() {
        return rewardPoints;
    }

    public void setRewardPoints(int rewardPoints) {
        this.rewardPoints = rewardPoints;
    }

    public List<Ticket> getUpcomingTrips() {
        return upcomingTrips;
    }

    public void setUpcomingTrips(List<Ticket> upcomingTrips) {
        this.upcomingTrips = upcomingTrips;
    }

    public List<Ticket> getRecentTrips() {
        return recentTrips;
    }

    public void setRecentTrips(List<Ticket> recentTrips) {
        this.recentTrips = recentTrips;
    }
}
