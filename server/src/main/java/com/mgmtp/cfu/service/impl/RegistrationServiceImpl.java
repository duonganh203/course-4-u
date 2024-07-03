package com.mgmtp.cfu.service.impl;


import com.mgmtp.cfu.dto.RegistrationDto;
import com.mgmtp.cfu.entity.Registration;
import com.mgmtp.cfu.exception.RegistrationNotFoundException;
import com.mgmtp.cfu.mapper.RegistrationMapper;
import com.mgmtp.cfu.repository.RegistrationRepository;
import com.mgmtp.cfu.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RegistrationServiceImpl implements RegistrationService {
    @Autowired
    private final RegistrationRepository registrationRepository;
    @Autowired
    private final RegistrationMapper registrationMapper;

    public RegistrationServiceImpl(RegistrationRepository registrationRepository, RegistrationMapper registrationMapper) {
        this.registrationRepository = registrationRepository;
        this.registrationMapper = registrationMapper;
    }

    @Override
    public RegistrationDto getDetailRegistration(Long id) {
        Registration registration = registrationRepository.findById(id).orElseThrow(() -> new RegistrationNotFoundException("Registration not found"));
        return registrationMapper.toDto(registration);
    }
}
