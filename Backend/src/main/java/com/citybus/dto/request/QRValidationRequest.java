package com.citybus.dto.request;

public class QRValidationRequest {

    private String qrToken;

    public QRValidationRequest() {}

    public String getQrToken() {
        return qrToken;
    }

    public void setQrToken(String qrToken) {
        this.qrToken = qrToken;
    }
}
