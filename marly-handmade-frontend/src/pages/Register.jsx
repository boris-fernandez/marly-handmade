import React from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input id="name" type="text" placeholder="Name" required />
          </div>

          <div className="form-group">
            <input id="email" type="email" placeholder="Email" required />
          </div>

          <div className="form-group">
            <input id="password" type="password" placeholder="Password" required />
          </div>

          <div className="form-links">
            <Link to="/login">Already have an account? Sign In</Link>
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
