package com.mgmtp.cfu.controller;

import com.mgmtp.cfu.dto.RegistrationDto;
import com.mgmtp.cfu.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/registrations")
public class RegistrationController {
    private final RegistrationService registrationService;

    @GetMapping("/{id}")
    public ResponseEntity<RegistrationDto> getDetailRegistration(@PathVariable Long id) {
        return ResponseEntity.ok(registrationService.getDetailRegistration(id));
    }
}
