package com.smartsafar.service;

import com.smartsafar.dto.RouteStopDTO;
import java.util.List;

public interface RouteStopService {

    RouteStopDTO addStop(RouteStopDTO dto);

    List<RouteStopDTO> getStopsByRoute(Long routeId);
}

