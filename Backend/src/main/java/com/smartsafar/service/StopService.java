package com.smartsafar.service;

import com.smartsafar.dto.StopDTO;
import java.util.List;

public interface StopService {

    StopDTO addStop(StopDTO dto);

    List<StopDTO> getAllStops();
}
