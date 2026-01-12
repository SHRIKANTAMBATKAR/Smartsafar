package com.citybus.service.impl;

import com.citybus.model.Route;
import com.citybus.model.Schedule;
import com.citybus.repository.RouteRepository;
import com.citybus.repository.ScheduleRepository;
import com.citybus.service.ScheduleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final RouteRepository routeRepository;

    public ScheduleServiceImpl(ScheduleRepository scheduleRepository,
                               RouteRepository routeRepository) {
        this.scheduleRepository = scheduleRepository;
        this.routeRepository = routeRepository;
    }

    @Override
    public Schedule addSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    @Override
    public List<Schedule> getSchedulesByRoute(Long routeId) {

        Route route = routeRepository.findById(routeId)
                .orElseThrow(() -> new RuntimeException("Route not found"));

        return scheduleRepository.findByRouteAndActive(route, true);
    }
}
