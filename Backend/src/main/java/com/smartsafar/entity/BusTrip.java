package com.smartsafar.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bus_trips")
public class BusTrip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tripId;
    private Long busId;
    private Long routeId;
    private double currentLat;
    private double currentLng;
    private int currentStopIndex;
    private String status; // ACTIVE, COMPLETED
    private LocalDateTime lastUpdated = LocalDateTime.now();
    public Long getTripId() {
        return tripId;
    }

    public Long getBusId() {
        return busId;
    }

    public void setBusId(Long busId) {
        this.busId = busId;
    }

    public Long getRouteId() {
        return routeId;
    }

    public void setRouteId(Long routeId) {
        this.routeId = routeId;
    }

    public double getCurrentLat() {
        return currentLat;
    }

    public void setCurrentLat(double currentLat) {
        this.currentLat = currentLat;
    }

    public double getCurrentLng() {
        return currentLng;
    }

    public void setCurrentLng(double currentLng) {
        this.currentLng = currentLng;
    }

    public int getCurrentStopIndex() {
        return currentStopIndex;
    }

    public void setCurrentStopIndex(int currentStopIndex) {
        this.currentStopIndex = currentStopIndex;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

	public void setLastUpdated(LocalDateTime now) {
		// TODO Auto-generated method stub
		
	}

	public LocalDateTime getLastUpdated() {
		// TODO Auto-generated method stub
		return null;
	}
}
