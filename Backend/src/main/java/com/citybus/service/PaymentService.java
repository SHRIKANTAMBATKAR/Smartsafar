package com.citybus.service;

import com.citybus.model.Payment;

public interface PaymentService {

    Payment createPayment(Long ticketId, String paymentMode);
}
