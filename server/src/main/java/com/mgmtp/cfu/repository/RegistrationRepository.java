package com.mgmtp.cfu.repository;

import com.mgmtp.cfu.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<Registration,Long> {
}
