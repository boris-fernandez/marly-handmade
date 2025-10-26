import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";

function ProductRegister() {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    material: "",
    stock: "",
    price: "",
    mainImage: null,
    additionalImages: [],
  });

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (type === "main") {
      setFormData({ ...formData, mainImage: file });
    } else {
      setFormData({
        ...formData,
        additionalImages: [...formData.additionalImages, file],
      });
    }
  };

  const handleSubmit = () => {
    console.log("Product data:", formData);
    alert("Product registered successfully!");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <AdminSidebar />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "40px",
          backgroundColor: "#f5f5f5",
          marginLeft: "230px",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "40px",
            color: "#333",
            fontWeight: "400",
          }}
        >
          Product Register
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "400px 1fr",
            gap: "40px",
            maxWidth: "1200px",
          }}
        >
          {/* Left Side - Image Uploads */}
          <div>
            {/* Main Image Upload */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  border: "2px dashed #ddd",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  background: "#fafafa",
                  transition: "all 0.3s",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "main")}
                  style={{ display: "none" }}
                />
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#999"
                  strokeWidth="1.5"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <div
                  style={{
                    marginTop: "20px",
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  UPLOAD
                </div>
              </label>
            </div>

            {/* Additional Images */}
            <div style={{ display: "flex", gap: "15px" }}>
              {[1, 2, 3].map((num) => (
                <label
                  key={num}
                  style={{
                    flex: 1,
                    aspectRatio: "1",
                    border: "2px dashed #ddd",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    background: "#fafafa",
                    transition: "all 0.3s",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "additional")}
                    style={{ display: "none" }}
                  />
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#999"
                    strokeWidth="1.5"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "11px",
                      fontWeight: "500",
                      color: "#666",
                    }}
                  >
                    UPLOAD
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div>
            <div style={{ marginBottom: "25px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#666",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Product Name
              </label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#666",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="4"
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "15px",
                marginBottom: "25px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#666",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Material
                </label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) =>
                    setFormData({ ...formData, material: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#666",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Stock
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#666",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Price
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              style={{
                background: "#333",
                color: "white",
                border: "none",
                padding: "12px 40px",
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginTop: "20px",
              }}
            >
              UPLOAD
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductRegister;
