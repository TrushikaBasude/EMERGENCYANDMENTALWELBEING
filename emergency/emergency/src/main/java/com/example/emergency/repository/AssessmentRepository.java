package com.example.emergency.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.emergency.model.Assessment;

@Repository
public interface AssessmentRepository extends MongoRepository<Assessment, String> {}
