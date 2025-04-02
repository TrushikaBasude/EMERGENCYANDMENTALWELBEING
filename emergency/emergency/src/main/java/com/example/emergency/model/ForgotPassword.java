package com.example.emergency.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "forgot_password")
public class ForgotPassword {

    @Id
    private String id;            // MongoDB document ID
    private String email;
    private String newPassword;

    public ForgotPassword() {
    }

    public ForgotPassword(String email, String newPassword) {
        this.email = email;
        this.newPassword = newPassword;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
