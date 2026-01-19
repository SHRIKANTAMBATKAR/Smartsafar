package com.smartsafar.service;

import com.smartsafar.dto.PaymentRequestDTO;
import com.smartsafar.dto.PaymentResponseDTO;

public interface PaymentService {

    PaymentResponseDTO makePayment(PaymentRequestDTO dto);
}
