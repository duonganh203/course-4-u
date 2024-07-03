package com.mgmtp.cfu.service.impl

import com.mgmtp.cfu.dto.RegistrationDto
import com.mgmtp.cfu.entity.Course
import com.mgmtp.cfu.entity.Registration
import com.mgmtp.cfu.exception.RegistrationNotFoundException
import com.mgmtp.cfu.mapper.RegistrationMapper
import spock.lang.Specification
import com.mgmtp.cfu.repository.RegistrationRepository


class RegistrationServiceImplSpec extends Specification {

    def registrationRepository = Mock(RegistrationRepository) {
        findById(1) >> Optional.of(Registration.builder()
                .id(1)
                .course(Course.builder().id(1).build())
                .build())
    }
    def registrationMapper = Mock(RegistrationMapper) {
        toDto(_) >> RegistrationDto.builder().id(1).build()
    }
    RegistrationServiceImpl registrationService = new RegistrationServiceImpl(registrationRepository, registrationMapper)

    def "return registration details successfully"() {
        given:
            Long id = 1L
            Registration registration = Registration.builder().id(id).build()
            RegistrationDto registrationDto = RegistrationDto.builder().id(id).build()

            registrationRepository.findById(id) >> Optional.of(registration)
            registrationMapper.toDto(registration) >> registrationDto
        when:
            RegistrationDto result = registrationService.getDetailRegistration(id)
        then:
            result.id == registrationDto.id
    }

    def "return registration details failed"() {
        given:
            Long id = 999L

            registrationRepository.findById(id) >> Optional.empty()
        when:
            registrationService.getDetailRegistration(id)
        then:
            def ex = thrown(RegistrationNotFoundException)
            ex.message == "Registration not found"
    }
}
