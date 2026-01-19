package com.smartsafar.serviceImpl;

import com.smartsafar.dto.RouteStopDTO;
import com.smartsafar.entity.RouteStop;
import com.smartsafar.repository.RouteStopRepository;
import com.smartsafar.service.RouteStopService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RouteStopServiceImpl implements RouteStopService {

    private final RouteStopRepository repository;

    public RouteStopServiceImpl(RouteStopRepository repository) {
        this.repository = repository;
    }

    @Override
    public RouteStopDTO addStop(RouteStopDTO dto) {

        RouteStop stop = new RouteStop();
        stop.setRouteId(dto.getRouteId());
        stop.setStopName(dto.getStopName());
        stop.setStopOrder(dto.getStopOrder());

        RouteStop saved = repository.save(stop);
        return mapToDTO(saved);
    }

    @Override
    public List<RouteStopDTO> getStopsByRoute(Long routeId) {

        return repository.findByRouteIdOrderByStopOrder(routeId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private RouteStopDTO mapToDTO(RouteStop stop) {

        RouteStopDTO dto = new RouteStopDTO();
        dto.setId(stop.getId());
        dto.setRouteId(stop.getRouteId());
        dto.setStopName(stop.getStopName());
        dto.setStopOrder(stop.getStopOrder());

        return dto;
    }
}
