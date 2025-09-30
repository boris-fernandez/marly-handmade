import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/Auth.context";

export default function Login() {
  const { login, token } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <>
      <Header />
      <div className='login-container'>
        <div className='login-box'>
          <h2 className='login-title'>Login</h2>

          <form className='login-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                id='email'
                type='text'
                placeholder='Email'
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className='form-group'>
              <input
                id='password'
                type='password'
                placeholder='Password'
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className='form-links'>
              <Link to='/recover-password'>Forgot your password?</Link>
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
