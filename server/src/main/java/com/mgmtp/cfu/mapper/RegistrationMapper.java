package com.mgmtp.cfu.mapper;

import com.mgmtp.cfu.DTO.RegistrationDTO;
import com.mgmtp.cfu.entity.Registration;
public class RegistrationMapper {
    public static RegistrationDTO toDto(Registration registration) {
        return RegistrationDTO.builder()
                .id(registration.getId())
                .score(registration.getScore())
                .registerDate(registration.getRegisterDate())
                .duration(registration.getDuration())
                .endDate(registration.getEndDate())
                .startDate(registration.getStartDate())
                .status(registration.getStatus())
                .build();
    }
}
