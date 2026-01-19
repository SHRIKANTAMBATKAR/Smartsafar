package com.smartsafar.serviceImpl;

import com.smartsafar.dto.StopDTO;
import com.smartsafar.entity.Stop;
import com.smartsafar.repository.StopRepository;
import com.smartsafar.service.StopService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StopServiceImpl implements StopService {

    private final StopRepository repository;

    public StopServiceImpl(StopRepository repository) {
        this.repository = repository;
    }

    @Override
    public StopDTO addStop(StopDTO dto) {

        Stop stop = new Stop();
        stop.setStopName(dto.getStopName());
        stop.setLatitude(dto.getLatitude());
        stop.setLongitude(dto.getLongitude());

        Stop saved = repository.save(stop);
        return mapToDTO(saved);
    }

    @Override
    public List<StopDTO> getAllStops() {

        return repository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private StopDTO mapToDTO(Stop stop) {

        StopDTO dto = new StopDTO();
        dto.setStopId(stop.getStopId());
        dto.setStopName(stop.getStopName());
        dto.setLatitude(stop.getLatitude());
        dto.setLongitude(stop.getLongitude());

        return dto;
    }
}
