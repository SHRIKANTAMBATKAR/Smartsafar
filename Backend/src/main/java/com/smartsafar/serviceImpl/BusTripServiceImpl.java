package com.smartsafar.serviceImpl;

import com.smartsafar.dto.BusTripDTO;
import com.smartsafar.entity.BusTrip;
import com.smartsafar.exception.ResourceNotFoundException;
import com.smartsafar.repository.BusTripRepository;
import com.smartsafar.service.BusTripService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusTripServiceImpl implements BusTripService {

    private final BusTripRepository repository;

    public BusTripServiceImpl(BusTripRepository repository) {
        this.repository = repository;
    }

    @Override
    public BusTripDTO startTrip(BusTripDTO dto) {

        BusTrip trip = new BusTrip();
        trip.setBusId(dto.getBusId());
        trip.setRouteId(dto.getRouteId());
        trip.setCurrentLat(dto.getCurrentLat());
        trip.setCurrentLng(dto.getCurrentLng());
        trip.setCurrentStopIndex(dto.getCurrentStopIndex());
        trip.setStatus("ACTIVE");

        BusTrip saved = repository.save(trip);
        return mapToDTO(saved);
    }

    @Override
    public BusTripDTO updateLocation(Long tripId, double lat, double lng, int stopIndex) {

        BusTrip trip = repository.findById(tripId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Bus trip not found with id " + tripId)
                );

        trip.setCurrentLat(lat);
        trip.setCurrentLng(lng);
        trip.setCurrentStopIndex(stopIndex);
        trip.setLastUpdated(LocalDateTime.now());

        BusTrip updated = repository.save(trip);
        return mapToDTO(updated);
    }

    @Override
    public List<BusTripDTO> getActiveTrips(Long routeId) {

        return repository.findByRouteIdAndStatus(routeId, "ACTIVE")
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private BusTripDTO mapToDTO(BusTrip trip) {

        BusTripDTO dto = new BusTripDTO();
        dto.setTripId(trip.getTripId());
        dto.setBusId(trip.getBusId());
        dto.setRouteId(trip.getRouteId());
        dto.setCurrentLat(trip.getCurrentLat());
        dto.setCurrentLng(trip.getCurrentLng());
        dto.setCurrentStopIndex(trip.getCurrentStopIndex());
        dto.setStatus(trip.getStatus());
        dto.setLastUpdated(trip.getLastUpdated());

        return dto;
    }
}
