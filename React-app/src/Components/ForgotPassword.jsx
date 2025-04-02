// ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Components/ForgotPassword.css"; // Optional: add your CSS

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/forgotpassword/reset", {
        email,
        newPassword,
      });
      setMessage(response.data);
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleReset}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Remembered your password? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
