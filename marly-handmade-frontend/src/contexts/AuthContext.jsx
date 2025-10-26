// src/context/AuthContext.jsx
import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();
const API_URL = "http://localhost:8080/auth/";

export function AuthProviderWrapper({ children }) {
  const [token, setToken] = useState(() => {
    // Leer token guardado si ya había sesión
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
  });

  // Guardar token cada vez que cambie
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      console.log("Token actualizado en contexto:", token.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

const login = async (data) => {
  try {
    const response = await fetch(`${API_URL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error en el login:", response.status);
      return false;
    }

    const result = await response.json();

    // Guarda el token y retorna éxito
    setToken(result);
    localStorage.setItem("authToken", result.token);
    return true;
  } catch (e) {
    console.error("Error al iniciar sesión:", e);
    return false;
  }
};


  const logout = () => {
    setToken(null);
  };

  const register = async (data) => {
    try {
      const response = await fetch(`${API_URL}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error en el registro");
      console.log(await response.json());
    } catch (e) {
      console.error(e);
    }
  };

  const forgotPassword = async (data) => {
    try {
      const response = await fetch(`${API_URL}forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al recuperar contraseña");
      console.log(await response.json());
    } catch (e) {
      console.error(e);
    }
  };

  const updatePassword = async (data) => {
    try {
      const response = await fetch(`${API_URL}update-password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al actualizar contraseña");
      console.log(await response.json());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, register, forgotPassword, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}
