package com.smartsafar.service;

import com.smartsafar.dto.RouteDTO;
import java.util.List;

public interface RouteService {

    RouteDTO addRoute(RouteDTO dto);

    List<RouteDTO> getAllRoutes();
}
