package com.mgmtp.cfu.controller

import com.mgmtp.cfu.DTO.RegistrationDTO
import com.mgmtp.cfu.service.RegistrationService
import org.springframework.http.ResponseEntity
import spock.lang.Specification
import spock.lang.Subject

class RegistrationControllerSpec extends Specification {
    def registrationService = Mock(RegistrationService)
    @Subject
    RegistrationController registrationController = new RegistrationController(registrationService)
    def "test getDetailRegistration"() {
        given:
            def registrationId = 1
            RegistrationDTO registrationDTO = RegistrationDTO.builder().build()
            registrationService.getDetailRegistration(registrationId) >> registrationDTO
        when:
            ResponseEntity<RegistrationDTO> response = registrationController.getDetailRegistration(registrationId)
        then:
            response.statusCode.value() == 200
            response.body == registrationDTO
    }

    def "test getDetailRegistration failed"() {
        given:
            Long id = 999L
        when:
            registrationService.getDetailRegistration(id) >> { throw new NoSuchElementException("Registration not found") }
        and:
            registrationController.getDetailRegistration(id)
        then:
            def ex = thrown(NoSuchElementException)
            ex.message == "Registration not found"
    }
}
