package com.mgmtp.cfu.service.impl

import com.mgmtp.cfu.DTO.RegistrationDTO
import com.mgmtp.cfu.entity.Registration
import com.mgmtp.cfu.mapper.RegistrationMapper
import spock.lang.Specification
import com.mgmtp.cfu.repository.RegistrationRepository


class RegistrationServiceImplSpec extends Specification {

    def registrationRepository = Mock(RegistrationRepository) {
        findById(1) >> Optional.of(Registration.builder()
                .id(1)
                .build())
    }
    def registrationMapper = Mock(RegistrationMapper)
    RegistrationServiceImpl registrationService = new RegistrationServiceImpl(registrationRepository)

    def "return registration details successfully"() {
        given:
            Long id = 4L
            Registration registration = Registration.builder().id(id).build()
            RegistrationDTO registrationDTO = RegistrationDTO.builder().id(id).build()

            registrationRepository.findById(id) >> Optional.of(registration)
            registrationMapper.toDto(registration) >> registrationDTO
        when:
            RegistrationDTO result = registrationService.getDetailRegistration(id)
        then:
            result.id == registrationDTO.id
    }

    def "return registration details failed"() {
        given:
            Long id = 999L

            registrationRepository.findById(id) >> Optional.empty()
        when:
            registrationService.getDetailRegistration(id)
        then:
            def ex = thrown(NoSuchElementException)
            ex.message == "Registration not found"
    }
}
