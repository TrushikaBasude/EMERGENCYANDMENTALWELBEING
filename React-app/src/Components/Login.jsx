import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api";
import "../Components/Login.css"; // Import CSS

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      setMessage(response);
    } catch (error) {
      console.error("Login error:", error);
      setMessage(
        error.response?.data || "An error occurred during login. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Login</h1>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="auth-button" type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        <div className="auth-links">
          <p><Link to="/forgot-password">Forgot Password?</Link></p>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};
