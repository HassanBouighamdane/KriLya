package com.example.usermanagementmicroservice.repository;

import com.example.usermanagementmicroservice.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    User findByEmail(String email);
}