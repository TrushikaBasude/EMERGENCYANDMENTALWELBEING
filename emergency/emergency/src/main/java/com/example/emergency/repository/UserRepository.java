package com.example.emergency.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.emergency.model.User;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
