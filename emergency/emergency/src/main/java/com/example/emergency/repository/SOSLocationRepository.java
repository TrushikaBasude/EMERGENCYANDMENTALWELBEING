package com.example.emergency.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.emergency.model.SOSLocation;

public interface SOSLocationRepository extends MongoRepository<SOSLocation, String> {
    Optional<SOSLocation> findByPhoneNumber(String phoneNumber);
}
