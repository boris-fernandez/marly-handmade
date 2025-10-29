import React, { createContext, useContext, useState, useEffect } from "react";

export const ProductoContext = createContext();

// Hook para usar el contexto
export const useProductos = () => useContext(ProductoContext);

export const ProductoProvider = ({ children }) => {
  // 🟢 Estados para listar productos
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🟣 Estados para el registro de productos
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    material: "",
    stock: "",
    price: "",
    mainImage: null,
    additionalImages: [],
  });

  const API_URL = "http://localhost:8080/producto";

  // 🟢 Función: Listar productos
  const listarProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/all`);
      if (!response.ok) throw new Error("Error al obtener productos");
      const data = await response.json();

      // Adaptar los datos al formato del frontend
      const formatted = data.map((item) => ({
        id: item.id,
        name: item.nombre,
        price: item.precio,
        img: item.fotoPrincipal,
        stock: item.stock,
        category: item.categoria,
      }));

      setProductos(formatted);
      console.log("Productos cargados:", formatted);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🟣 Función: Manejar carga de imágenes
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "main") {
      setFormData((prev) => ({ ...prev, mainImage: file }));
    } else {
      setFormData((prev) => ({
        ...prev,
        additionalImages: [...prev.additionalImages, file],
      }));
    }
  };

  // 🟣 Función: Registrar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      formDataToSend.append("nombre", formData.productName);
      formDataToSend.append("descripcion", formData.description);
      formDataToSend.append("material", formData.material);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("precio", formData.price);
      formDataToSend.append("categoria", "artesania");

      if (formData.mainImage)
        formDataToSend.append("fotoPrincipal", formData.mainImage);

      if (formData.additionalImages[0])
        formDataToSend.append("fotoSecundario", formData.additionalImages[0]);

      if (formData.additionalImages[1])
        formDataToSend.append("fotoTerciario", formData.additionalImages[1]);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Error al registrar el producto");

      const data = await response.json();
      console.log("✅ Producto registrado:", data);
      alert("Producto registrado exitosamente");

      // Reset del formulario
      setFormData({
        productName: "",
        description: "",
        material: "",
        stock: "",
        price: "",
        mainImage: null,
        additionalImages: [],
      });

      // Refrescar lista de productos
      listarProductos();
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error al registrar el producto");
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el contexto
  useEffect(() => {
    listarProductos();
  }, []);

  return (
    <ProductoContext.Provider
      value={{
        productos,
        loading,
        error,
        listarProductos,
        formData,
        setFormData,
        handleImageUpload,
        handleSubmit,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
