package com.citybus.service;

import com.citybus.model.Route;

import java.util.List;

public interface RouteService {

    Route addRoute(Route route);

    List<Route> searchRoutes(String source, String destination);
}
