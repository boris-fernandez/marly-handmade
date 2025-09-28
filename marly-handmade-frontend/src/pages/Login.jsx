import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div className='login-container'>
        <div className='login-box'>
          <h2 className='login-title'>Login</h2>

          <form className='login-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <input id='email' type='email' placeholder='Email' required />
            </div>

            <div className='form-group'>
              <input
                id='password'
                type='password'
                placeholder='Password'
                required
              />
            </div>

            <div className='form-links'>
              <Link to='/forgot-password'>Forgot your password?</Link>
            </div>

            <button type='submit' className='login-btn'>
              SIGN IN
            </button>
          </form>

          <div className='login-links'>
            <Link to='/register'>Create account</Link>
            <Link to='/'>Return to Store</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
