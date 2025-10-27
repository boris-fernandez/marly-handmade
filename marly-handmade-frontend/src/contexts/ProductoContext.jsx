import React, { createContext, useContext, useState, useEffect } from "react";
import sea1 from '../assets/sea1.png';
import sea2 from '../assets/sea2.png';
import sea3 from '../assets/sea3.png';
import sea4 from '../assets/sea4.png';
import sea5 from '../assets/sea5.png';

// Crear contexto
export const ProductoContext = createContext();

// Hook para usar el contexto más fácil
export const useProductos = () => useContext(ProductoContext);

// Proveedor del contexto
export const ProductoProvider = ({ children }) => {
  let [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const API_URL = "http://localhost:8080/producto/all"; // endpoint de listar productos
  // Función para traer los productos desde el backend
  const listarProductos = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener productos");
    const data = await response.json();

    // Transformar los datos al formato para el frontend
    const formatted = data.map((item) => ({
      id: item.id,
      name: item.nombre,          // convertir 'nombre' a 'name'
      price: item.precio,         // convertir 'precio' a 'price'
      img: item.fotoPrincipal,    // usar solo la imagen principal
      stock: item.stock,          // puedes conservar info adicional si te sirve
      category: item.categoria,   // opcional
    }));

    setProductos(formatted);
    console.log("Productos formateados:", formatted);

  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  // Cargar productos al montar
  useEffect(() => {
    listarProductos();
  }, []);

  return (
    <ProductoContext.Provider
      value={{ productos, loading, error, listarProductos }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
