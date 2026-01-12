package com.citybus.service;

import com.citybus.model.Schedule;

import java.util.List;

public interface ScheduleService {

    Schedule addSchedule(Schedule schedule);

    List<Schedule> getSchedulesByRoute(Long routeId);
}
