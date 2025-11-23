import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const ProductoContext = createContext();

export const useProductos = () => useContext(ProductoContext);

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8080/producto";

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    material: "",
    stock: "",
    price: "",
    mainImage: null,
    additionalImages: [],
    details: "",
    care: "",
    shippingInfo: "",
  });


  const listarProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/all`);
      if (!response.ok) throw new Error("Error al obtener productos");
      const data = await response.json();

      const formatted = data.map((item) => ({
        id: item.id,
        name: item.nombre,
        price: item.precio,
        img: item.fotoPrincipal,
        stock: item.stock,
        category: item.categoria,
        description: item.descripcion,
        details: item.details,
        care: item.care,
        shippingInfo: item.shippingInfo,
        slug: item.nombre
          .replace(/\s+/g, " ")
          .trim()
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(""),
      }));

      setProductos(formatted);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [previewUrl, setPreviewUrl] = useState(null);
  const { token } = useContext(AuthContext);

  const CLOUD_NAME = "cloudjosue";
  const UPLOAD_PRESET = "MarlyCloud";

  const handleImageUpload = async (e, type = "main") => {
    const file = e.target.files?.[0];
    console.log("🧠 Archivo recibido:", file);
    if (!(file instanceof File)) {
      console.error("❌ No es un archivo válido:", file);
      return;
    }

    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formDataCloud,
        }
      );

      const data = await res.json();
      console.log("📦 Respuesta Cloudinary:", data);

      if (!res.ok || data.error) {
        console.error("❌ Error al subir:", data.error?.message);
        return;
      }

      console.log("✅ Subida exitosa:", data.secure_url);

      setFormData((prev) => {
        if (type === "main") {
          return { ...prev, mainImage: data.secure_url };
        } else if (type === "additional-1") {
          const updated = [...prev.additionalImages];
          updated[0] = data.secure_url;
          return { ...prev, additionalImages: updated };
        } else if (type === "additional-2") {
          const updated = [...prev.additionalImages];
          updated[1] = data.secure_url;
          return { ...prev, additionalImages: updated };
        }
        return prev;
      });
    } catch (err) {
      console.error("🚨 Error de red:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!token) {
        alert("No hay token disponible. No se puede subir el producto.");
        setLoading(false);
        return;
      }

      const payload = {
        nombre: formData.productName,
        descripcion: formData.description,
        precio: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        fotoPrincipal: formData.mainImage || "",
        fotoSecundario: formData.additionalImages[0] || "",
        fotoTerciario: formData.additionalImages[1] || "",
        categoria: "artesania",
        details: formData.details,
        care: formData.care,
        shippingInfo: formData.shippingInfo,
      };

      console.log("📤 Payload a enviar:", payload);
      console.log("📦 Token a enviar:", token.token);

      const response = await fetch("http://localhost:8080/producto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error al registrar el producto");

      const data = await response.json();
      console.log("✅ Producto registrado:", data);
      alert("Producto registrado exitosamente");

      setFormData({
        productName: "",
        description: "",
        material: "",
        stock: "",
        price: "",
        mainImage: null,
        additionalImages: [],
        details: "",
        care: "",
        shippingInfo: "",
      });

      listarProductos();
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error al registrar el producto");
    } finally {
      setLoading(false);
    }
  };

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
