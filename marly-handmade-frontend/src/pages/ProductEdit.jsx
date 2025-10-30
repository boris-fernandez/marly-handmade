import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

export function useAuth() {
  return useContext(AuthContext);
}

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    details: "",
    care: "",
    shippingInfo: "",
  });

  const API_URL = "http://localhost:8080/producto";

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`${API_URL}?id=${id}`);
        if (!res.ok) throw new Error("Error al obtener producto");
        const data = await res.json();

        setFormData({
          name: data.nombre || "",
          description: data.descripcion || "",
          price: data.precio || "",
          stock: data.stock || "",
          category: data.categoria || "",
          details: data.details || "",
          care: data.care || "",
          shippingInfo: data.shipping_info || "",
        });
      } catch (err) {
        console.error("❌ Error al obtener producto:", err);
      }
    };

    fetchProducto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stored = localStorage.getItem("token");
    const parsed = stored ? JSON.parse(stored) : null;
    const tokenValue = parsed?.token || parsed;

    const payload = {
      nombre: formData.name,
      descripcion: formData.description,
      precio: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      categoria: formData.category,
      details: formData.details,
      care: formData.care,
      shipping_info: formData.shippingInfo,
    };

    try {
      const response = await fetch(`http://localhost:8080/producto/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenValue}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(await response.text());
        throw new Error("Error al actualizar el producto");
      }

      console.log("✅ Producto actualizado con éxito");
      navigate("/admin/inventory");
    } catch (err) {
      console.error("❌ Error al actualizar el producto:", err);
    }
  };

  return (
    <main className="w-full px-10 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Editar Producto
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Categoría</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Detalles</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Cuidado</label>
            <textarea
              name="care"
              value={formData.care}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">
              Información de envío
            </label>
            <textarea
              name="shippingInfo"
              value={formData.shippingInfo}
              onChange={handleChange}
              rows="2"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="col-span-2 text-right mt-4">
            <button
              type="submit"
              className="bg-[#997C71] hover:bg-[#85695F] text-[#F5E3C3] font-semibold py-3 px-6 rounded-lg shadow-sm transition-all"
            >
              Actualizar producto
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProductEdit;
