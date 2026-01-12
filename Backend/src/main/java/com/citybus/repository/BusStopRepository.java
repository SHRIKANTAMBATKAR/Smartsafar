package com.citybus.repository;

import com.citybus.model.BusStop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusStopRepository extends JpaRepository<BusStop, Long> {

    List<BusStop> findByRouteIdOrderByStopOrder(Long routeId);

}
