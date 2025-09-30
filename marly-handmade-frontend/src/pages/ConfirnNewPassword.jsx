import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

export default function RecoverPassword() {
  const params = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div className='login-container'>
        <div className='login-box'>
          <h2 className='login-title'>New Password</h2>

          <form className='login-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                id='password'
                type='password'
                placeholder='New Password'
                required
              />
            </div>

            <div className='form-group'>
              <input
                id='password'
                type='password'
                placeholder='Confirm New Password'
                required
              />
            </div>

            <button type='submit' className='login-btn'>
              UPDATE
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