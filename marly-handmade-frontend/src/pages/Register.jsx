import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/Auth.context";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      username,
      password,
      cliente: {
        nombres,
        apellidos,
        direccion,
        fechaNacimiento,
        identificacion,
        correo,
        telefono,
      },
    });
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
                id='name'
                type='text'
                placeholder='Name'
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                required
              />
            </div>
            <div className='form-group'>
              <input
                id='email'
                type='email'
                placeholder='Email'
                onChange={(e) => {
                  setCorreo(e.target.value);
                }}
                required
              />
            </div>
            <div className='form-group'>
              <input
                id='password'
                type='password'
                placeholder='Password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
                onChange={(e) => {
                  setNombres(e.target.value);
                }}
                required
              />
            </div>
            <div className='form-group'>
              <input
                id='apellidos'
                type='text'
                placeholder='Last Name(s)'
                onChange={(e) => {
                  setApellidos(e.target.value);
                }}
                required
              />
            </div>
            <div className='form-group'>
              <input
                id='direccion'
                type='text'
                placeholder='Address'
                onChange={(e) => {
                  setDireccion(e.target.value);
                }}
                required
              />
            </div>
            <div className='form-group'>
              <input
                id='fechaNacimiento'
                type='date'
                onChange={(e) => {
                  setFechaNacimiento(e.target.value);
                }}
                required
              />
            </div>
            <div className='form-group'>
              <input
                id='identificacion'
                type='text'
                placeholder='ID Number'
                onChange={(e) => {
                  setIdentificacion(e.target.value);
                }}
                required
              />
            </div>
            <div className='form-group'>
              <input
                id='telefono'
                type='tel'
                placeholder='Phone Number'
                onChange={(e) => {
                  setTelefono(e.target.value);
                }}
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
