package com.citybus.repository;

import com.citybus.model.Schedule;
import com.citybus.model.Bus;
import com.citybus.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    // Find schedules by bus
    List<Schedule> findByBus(Bus bus);

    // Find schedules by route
    List<Schedule> findByRoute(Route route);

    // Find schedules by route and active status
    List<Schedule> findByRouteAndActive(Route route, boolean active);

}
