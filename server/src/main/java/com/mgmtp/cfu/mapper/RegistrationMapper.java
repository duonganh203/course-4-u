package com.mgmtp.cfu.mapper;

import com.mgmtp.cfu.dto.RegistrationDto;
import com.mgmtp.cfu.entity.Registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RegistrationMapper {

    private final CourseMapper courseMapper;

    @Autowired
    public RegistrationMapper(CourseMapper courseMapper) {
        this.courseMapper = courseMapper;
    }

    public RegistrationDto toDto(Registration registration) {
        return RegistrationDto.builder()
                .id(registration.getId())
                .score(registration.getScore())
                .registerDate(registration.getRegisterDate())
                .duration(registration.getDuration())
                .endDate(registration.getEndDate())
                .startDate(registration.getStartDate())
                .status(registration.getStatus())
                .course(courseMapper.toDto(registration.getCourse()))
                .build();
    }
}
