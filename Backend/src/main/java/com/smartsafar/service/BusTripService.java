package com.smartsafar.service;

import com.smartsafar.dto.BusTripDTO;

import java.util.List;

public interface BusTripService {

    BusTripDTO startTrip(BusTripDTO dto);

    BusTripDTO updateLocation(Long tripId, double lat, double lng, int stopIndex);

    List<BusTripDTO> getActiveTrips(Long routeId);
}
