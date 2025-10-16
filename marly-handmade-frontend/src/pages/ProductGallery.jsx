import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { Link } from "react-router-dom";

const getProductsData = () => {
  return [
    {
      id: 1,
      name: "Street Pulse H",
      type: "Hoola",
      vendor: "StreetFlex",
      unitCost: 140,
      stock: 150,
    },
    {
      id: 2,
      name: "Urban Shadow J",
      type: "Hoola",
      vendor: "CityMixes",
      unitCost: 120,
      stock: 180,
    },
    {
      id: 3,
      name: "Neon Splash",
      type: "Hoola",
      vendor: "UrbanTech",
      unitCost: 160,
      stock: 125,
    },
    {
      id: 4,
      name: "Night Walker J",
      type: "Hoola",
      vendor: "DenimWork",
      unitCost: 150,
      stock: 95,
    },
    {
      id: 5,
      name: "Retro High Sne",
      type: "Sneakers",
      vendor: "StreetFlex",
      unitCost: 130,
      stock: 5,
    },
    {
      id: 6,
      name: "Cityscape",
      type: "Cap",
      vendor: "HeadTop",
      unitCost: 45,
      stock: 200,
    },
    {
      id: 7,
      name: "Skyline So",
      type: "Socks",
      vendor: "FootWool",
      unitCost: 18,
      stock: 350,
    },
    {
      id: 8,
      name: "Moonlight S",
      type: "Scarf",
      vendor: "WrapUp",
      unitCost: 130,
      stock: 75,
    },
  ];
};

function ProductGallery() {
  const [products] = useState(getProductsData());

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
      {/* Sidebar */}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              margin: 0,
              color: "#333",
              fontWeight: "400",
            }}
          >
            Product Gallery
          </h1>
          <Link to="/admin/inventory">
            <button
              style={{
                backgroundColor: "#333",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Inventory
            </button>
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                background: "white",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  background: "#f5f5f5",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "15px",
                  fontSize: "60px",
                  color: "#ddd",
                }}
              >
                ✕
              </div>

              <h3
                style={{
                  fontSize: "16px",
                  margin: "0 0 10px 0",
                  color: "#333",
                  fontWeight: "500",
                }}
              >
                {product.name}
              </h3>

              <div
                style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}
              >
                <strong>Type:</strong>
                <br />
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    background: "#f0f0f0",
                    borderRadius: "3px",
                    marginTop: "3px",
                  }}
                >
                  {product.type}
                </span>
              </div>

              <div
                style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}
              >
                <strong>Vendor:</strong>
                <br />
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    background: "#f0f0f0",
                    borderRadius: "3px",
                    marginTop: "3px",
                  }}
                >
                  {product.vendor}
                </span>
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#666",
                  marginBottom: "15px",
                }}
              >
                <strong>Unit Cost:</strong>
                <br />
                <span
                  style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}
                >
                  ${product.unitCost}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  background: product.stock <= 10 ? "#fff3cd" : "#d4edda",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                <span>
                  {product.stock <= 10
                    ? "⚠ Low stock"
                    : `✓ ${product.stock} in stock`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductGallery;
