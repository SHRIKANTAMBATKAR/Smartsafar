package com.citybus.util;

import java.time.LocalDateTime;

public class DateUtil {

    private DateUtil() {}

    public static LocalDateTime now() {
        return LocalDateTime.now();
    }
}
