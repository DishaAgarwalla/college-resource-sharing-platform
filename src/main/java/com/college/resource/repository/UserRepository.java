package com.college.resource.repository;

import com.college.resource.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository
        extends JpaRepository<User, Long> {

    User findByEmail(String email);
}