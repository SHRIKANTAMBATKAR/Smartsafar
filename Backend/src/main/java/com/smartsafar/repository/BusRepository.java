package com.smartsafar.repository;

import com.smartsafar.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusRepository extends JpaRepository<Bus, Long> {

    List<Bus> findByRoute_SourceAndRoute_Destination(String source, String destination);
}
