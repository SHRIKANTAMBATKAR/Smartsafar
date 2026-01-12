package com.citybus.repository;

import com.citybus.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusRepository extends JpaRepository<Bus, Long> {

    Bus findByBusNumber(String busNumber);

    List<Bus> findByBusType(String busType);

}
