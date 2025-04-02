import React, { useState } from "react";
import { signupUser } from "../api";
import "../Components/Signup.css"; // Import CSS

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signupUser({ name, email, password });
      setMessage(response);
    } catch (error) {
      console.error("Signup error:", error);
      setMessage(
        error.response?.data || "An error occurred during signup. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Sign Up</h1>
        <form className="auth-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button className="auth-button" type="submit">Sign Up</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};
