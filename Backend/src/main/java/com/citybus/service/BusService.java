package com.citybus.service;

import com.citybus.model.Bus;

import java.util.List;

public interface BusService {

    Bus addBus(Bus bus);

    List<Bus> getAllBuses();

    Bus getBusById(Long id);

}
