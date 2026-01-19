package com.smartsafar.service;

import com.smartsafar.dto.DashboardResponse;

public interface DashboardService {

    DashboardResponse getDashboardData(Long userId);
}
