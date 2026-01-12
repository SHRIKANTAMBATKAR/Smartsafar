package com.citybus.service.impl;

import com.citybus.model.Route;
import com.citybus.repository.RouteRepository;
import com.citybus.service.RouteService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteServiceImpl implements RouteService {

    private final RouteRepository routeRepository;

    public RouteServiceImpl(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    @Override
    public Route addRoute(Route route) {
        return routeRepository.save(route);
    }

    @Override
    public List<Route> searchRoutes(String source, String destination) {
        return routeRepository.findBySourceAndDestination(source, destination);
    }
}
