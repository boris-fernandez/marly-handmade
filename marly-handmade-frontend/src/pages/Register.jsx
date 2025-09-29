import React from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  };

  return (
    <>
      <Header />
      <div className='register-container'>
        <div className='register-box'>
          <h2 className='register-title'>Register</h2>

          <form className='register-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                id='username'
                type='text'
                placeholder='Username'
                required
              />
            </div>

            <div className='form-group'>
              <input id='correo' type='email' placeholder='Email' required />
            </div>

            <div className='form-group'>
              <input
                id='password'
                type='password'
                placeholder='Password'
                required
              />
            </div>

            <div className='form-group'>
              <input
                id='confirmPassword'
                type='password'
                placeholder='Confirm Password'
                required
              />
            </div>

            <div className='form-group'>
              <input
                id='nombres'
                type='text'
                placeholder='First Name(s)'
                required
              />
            </div>

            <div className='form-group'>
              <input
                id='apellidos'
                type='text'
                placeholder='Last Name(s)'
                required
              />
            </div>

            <div className='form-group'>
              <input
                id='direccion'
                type='text'
                placeholder='Address'
                required
              />
            </div>

            <div className='form-group'>
              <input id='fechaNacimiento' type='date' required />
            </div>

            <div className='form-group'>
              <input
                id='identificacion'
                type='text'
                placeholder='ID Number'
                required
              />
            </div>

            <div className='form-group'>
              <input
                id='telefono'
                type='tel'
                placeholder='Phone Number'
                required
              />
            </div>

            <div className='form-links'>
              <Link to='/login'>Already have an account? Sign In</Link>
            </div>

            <button type='submit' className='register-btn'>
              Create Account
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
