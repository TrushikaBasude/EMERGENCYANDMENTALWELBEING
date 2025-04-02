package com.example.emergency.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.emergency.model.ForgotPassword;

@Repository
public interface ForgotPasswordRepository extends MongoRepository<ForgotPassword, String> {
    // No extra methods needed right now
}
