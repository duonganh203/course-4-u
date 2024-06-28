package com.mgmtp.cfu.controller

import com.mgmtp.cfu.DTO.RegistrationDTO
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
            RegistrationDTO registrationDTO = new RegistrationDTO()
            registrationService.getDetailRegistration(registrationId) >> registrationDTO;
        when:
            ResponseEntity<RegistrationDTO> response = registrationController.getDetailRegistration(id)
        then:
            response.statusCode == 200
            response.body == registrationDTO
    }
}
