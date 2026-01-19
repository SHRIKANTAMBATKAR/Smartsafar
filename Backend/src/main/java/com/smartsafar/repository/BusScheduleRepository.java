package com.smartsafar.repository;

import com.smartsafar.entity.BusSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusScheduleRepository extends JpaRepository<BusSchedule, Long> {

    List<BusSchedule> findByRouteId(Long routeId);
}
