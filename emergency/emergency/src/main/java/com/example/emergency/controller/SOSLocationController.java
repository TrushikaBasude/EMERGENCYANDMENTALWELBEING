package com.example.emergency.controller;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.emergency.model.SOSLocation;
import com.example.emergency.repository.SOSLocationRepository;

@CrossOrigin(origins = "http://localhost:5173") // Allow requests from frontend
@RestController
@RequestMapping("/api/sos")
public class SOSLocationController {

    private final SOSLocationRepository sosLocationRepository;

    public SOSLocationController(SOSLocationRepository sosLocationRepository) {
        this.sosLocationRepository = sosLocationRepository;
    }

    // ✅ Get SOS Location by Phone Number
     @GetMapping("/get")
    public ResponseEntity<?> getLocation(@RequestParam String phoneNumber) {
        Optional<SOSLocation> location = sosLocationRepository.findByPhoneNumber(phoneNumber);
    
        if (location.isPresent()) {
            return ResponseEntity.ok(location.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("SOS Location not found for phone number: " + phoneNumber);
        }
    }
    
    // ✅ Save a New SOS Location Entry
    @PostMapping("/save")
    public ResponseEntity<String> saveLocation(@RequestBody SOSLocation location) {
        if (location.getPhoneNumber() == null || location.getAddress() == null ||
                location.getLatitude() == 0 || location.getLongitude() == 0) {
            return ResponseEntity.badRequest().body("Phone number, address, latitude, and longitude are required!");
        }

        sosLocationRepository.save(location);
        return ResponseEntity.ok("SOS Location saved successfully!");
    }

    // ✅ Delete SOS Location by Phone Number
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteLocation(@RequestParam String phoneNumber) {
        Optional<SOSLocation> location = sosLocationRepository.findByPhoneNumber(phoneNumber);

        if (location.isPresent()) {
            sosLocationRepository.delete(location.get());
            return ResponseEntity.ok("SOS Location deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("SOS Location not found for phone number: " + phoneNumber);
        }
    }
}
