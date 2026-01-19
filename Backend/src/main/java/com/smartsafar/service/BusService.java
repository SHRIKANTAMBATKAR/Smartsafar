package com.smartsafar.service;

import com.smartsafar.dto.BusResponseDTO;
import com.smartsafar.dto.BusRequestDTO;

import java.util.List;

public interface BusService {

    BusResponseDTO addBus(BusRequestDTO dto);

    List<BusResponseDTO> searchBus(String from, String to);
}
