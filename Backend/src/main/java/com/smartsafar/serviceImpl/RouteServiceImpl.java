package com.smartsafar.serviceImpl;

import com.smartsafar.dto.RouteDTO;
import com.smartsafar.entity.Route;
import com.smartsafar.repository.RouteRepository;
import com.smartsafar.service.RouteService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RouteServiceImpl implements RouteService {

    private final RouteRepository routeRepository;

    public RouteServiceImpl(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    @Override
    public RouteDTO addRoute(RouteDTO dto) {

        Route route = new Route();
        route.setRouteName(dto.getRouteName());
        route.setSource(dto.getSource());
        route.setDestination(dto.getDestination());
        route.setTotalStops(dto.getTotalStops());
        route.setFrequencyMinutes(dto.getFrequencyMinutes());

        Route saved = routeRepository.save(route);

        return mapToDTO(saved);
    }

    @Override
    public List<RouteDTO> getAllRoutes() {

        return routeRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private RouteDTO mapToDTO(Route route) {

        RouteDTO dto = new RouteDTO();
        dto.setRouteId(route.getRouteId());
        dto.setRouteName(route.getRouteName());
        dto.setSource(route.getSource());
        dto.setDestination(route.getDestination());
        dto.setTotalStops(route.getTotalStops());
        dto.setFrequencyMinutes(route.getFrequencyMinutes());

        return dto;
    }
}
