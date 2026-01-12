package com.citybus.util;

public class AppConstants {

    private AppConstants() {}

    // Roles
    public static final String ROLE_USER = "USER";
    public static final String ROLE_ADMIN = "ADMIN";

    // Ticket Status
    public static final String TICKET_VALID = "VALID";
    public static final String TICKET_USED = "USED";
    public static final String TICKET_EXPIRED = "EXPIRED";

    // Payment Status
    public static final String PAYMENT_SUCCESS = "SUCCESS";
    public static final String PAYMENT_FAILED = "FAILED";

    // Payment Modes
    public static final String PAYMENT_UPI = "UPI";
    public static final String PAYMENT_CARD = "CARD";
    public static final String PAYMENT_CASH = "CASH";
}
