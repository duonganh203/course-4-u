package com.mgmtp.cfu.service.impl;

import com.mgmtp.cfu.DTO.RegistrationDTO;
import com.mgmtp.cfu.entity.Registration;
import com.mgmtp.cfu.mapper.RegistrationMapper;
import com.mgmtp.cfu.repository.RegistrationRepository;
import com.mgmtp.cfu.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class RegistrationServiceImpl implements RegistrationService {
    private final RegistrationRepository registrationRepository;

    @Override
    public RegistrationDTO getDetailRegistration(Long id) {
        Registration registration = registrationRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Registration not found"));
        return RegistrationMapper.toDto(registration);
    }
}
