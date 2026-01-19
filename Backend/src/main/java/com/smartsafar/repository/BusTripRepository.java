package com.smartsafar.repository;

import com.smartsafar.entity.BusTrip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusTripRepository extends JpaRepository<BusTrip, Long> {

    List<BusTrip> findByRouteIdAndStatus(Long routeId, String status);
}
