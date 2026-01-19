package com.smartsafar.serviceImpl;

import com.smartsafar.dto.BusScheduleDTO;
import com.smartsafar.entity.BusSchedule;
import com.smartsafar.repository.BusScheduleRepository;
import com.smartsafar.service.BusScheduleService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusScheduleServiceImpl implements BusScheduleService {

    private final BusScheduleRepository repository;

    public BusScheduleServiceImpl(BusScheduleRepository repository) {
        this.repository = repository;
    }

    @Override
    public BusScheduleDTO addSchedule(BusScheduleDTO dto) {

        BusSchedule schedule = new BusSchedule();
        schedule.setBusId(dto.getBusId());
        schedule.setRouteId(dto.getRouteId());
        schedule.setDepartureTime(dto.getDepartureTime());
        schedule.setArrivalTime(dto.getArrivalTime());
        schedule.setFare(dto.getFare());

        BusSchedule saved = repository.save(schedule);
        return mapToDTO(saved);
    }

    @Override
    public List<BusScheduleDTO> getSchedulesByRoute(Long routeId) {

        return repository.findByRouteId(routeId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private BusScheduleDTO mapToDTO(BusSchedule schedule) {

        BusScheduleDTO dto = new BusScheduleDTO();
        dto.setScheduleId(schedule.getScheduleId());
        dto.setBusId(schedule.getBusId());
        dto.setRouteId(schedule.getRouteId());
        dto.setDepartureTime(schedule.getDepartureTime());
        dto.setArrivalTime(schedule.getArrivalTime());
        dto.setFare(schedule.getFare());

        return dto;
    }
}
