package com.mgmtp.cfu.mapper;

import com.mgmtp.cfu.dto.CourseRegistrationDto;
import com.mgmtp.cfu.entity.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {
    public CourseRegistrationDto toDto(Course course) {
        return CourseRegistrationDto.builder()
                .id(course.getId())
                .name(course.getName())
                .link(course.getLink())
                .platform(course.getPlatform())
                .thumbnailUrl(course.getThumbnailUrl())
                .teacherName(course.getTeacherName())
                .createdDate(course.getCreatedDate())
                .status(course.getStatus())
                .build();}
}
