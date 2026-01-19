package com.smartsafar.service;

import com.smartsafar.dto.BusScheduleDTO;

import java.util.List;

public interface BusScheduleService {

    BusScheduleDTO addSchedule(BusScheduleDTO dto);

    List<BusScheduleDTO> getSchedulesByRoute(Long routeId);
}
