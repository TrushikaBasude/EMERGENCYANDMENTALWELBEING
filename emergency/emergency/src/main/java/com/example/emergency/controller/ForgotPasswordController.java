package com.example.emergency.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.emergency.model.ForgotPassword;
import com.example.emergency.model.User;
import com.example.emergency.repository.ForgotPasswordRepository;
import com.example.emergency.repository.UserRepository;

@RestController
@RequestMapping("/api/forgotpassword")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
public class ForgotPasswordController {

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/reset")
    public String resetPassword(@RequestBody ForgotPassword forgotPassword) {
        // 1) Save the forgot-password request (optional, but shows the "3-file" pattern)
        forgotPasswordRepository.save(forgotPassword);

        // 2) Look up the user in the user collection
        Optional<User> userOptional = userRepository.findByEmail(forgotPassword.getEmail());
        if (!userOptional.isPresent()) {
            return "User not found";
        }

        // 3) Update the user’s password
        User user = userOptional.get();
        user.setPassword(forgotPassword.getNewPassword());
        userRepository.save(user);

        return "Password updated successfully!";
    }
}
