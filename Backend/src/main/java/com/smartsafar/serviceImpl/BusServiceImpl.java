package com.smartsafar.serviceImpl;

import com.smartsafar.dto.BusRequestDTO;
import com.smartsafar.dto.BusResponseDTO;
import com.smartsafar.entity.Bus;
import com.smartsafar.entity.Route;
import com.smartsafar.exception.ResourceNotFoundException;
import com.smartsafar.repository.BusRepository;
import com.smartsafar.repository.RouteRepository;
import com.smartsafar.service.BusService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusServiceImpl implements BusService {

    private final BusRepository busRepository;
    private final RouteRepository routeRepository;

    public BusServiceImpl(
            BusRepository busRepository,
            RouteRepository routeRepository
    ) {
        this.busRepository = busRepository;
        this.routeRepository = routeRepository;
    }

    // ➕ ADD BUS
    @Override
    public BusResponseDTO addBus(BusRequestDTO dto) {

        Route route = routeRepository.findById(dto.getRouteId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Route not found with id " + dto.getRouteId()
                        )
                );

        Bus bus = new Bus();
        bus.setBusNumber(dto.getBusNumber());
        bus.setBusType(dto.getBusType());
        bus.setCapacity(dto.getCapacity());
        bus.setRating(dto.getRating());
        bus.setFare(dto.getFare());
        bus.setRoute(route);

        Bus saved = busRepository.save(bus);
        return mapToDTO(saved);
    }

    // 🔍 SEARCH BUS
    @Override
    public List<BusResponseDTO> searchBus(String from, String to) {

        return busRepository
                .findByRoute_SourceAndRoute_Destination(from, to)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // 🔁 ENTITY → DTO
    private BusResponseDTO mapToDTO(Bus bus) {

        BusResponseDTO dto = new BusResponseDTO();
        dto.setBusId(bus.getBusId());
        dto.setBusNumber(bus.getBusNumber());
        dto.setBusType(bus.getBusType());
        dto.setCapacity(bus.getCapacity());
        dto.setRating(bus.getRating());
        dto.setFare(bus.getFare());
        dto.setRouteName(bus.getRoute().getRouteName());

        return dto;
    }
}
