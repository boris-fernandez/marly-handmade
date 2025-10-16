import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";

const getInventoryData = async () => {
  return [
    {
      id: 1,
      name: "Golden Sun Necklace",
      price: 850.0,
      warehouse: "Central Depot",
      stock: 25,
    },
    {
      id: 2,
      name: "Silver Moon Ring",
      price: 320.0,
      warehouse: "East Hub",
      stock: 40,
    },
    {
      id: 3,
      name: "Emerald Drop Earrings",
      price: 1200.0,
      warehouse: "North Warehouse",
      stock: 15,
    },
    {
      id: 4,
      name: "Ruby Crown Bracelet",
      price: 950.0,
      warehouse: "South Store",
      stock: 18,
    },
    {
      id: 5,
      name: "Sapphire Ocean Pendant",
      price: 1350.0,
      warehouse: "West Facility",
      stock: 20,
    },
    {
      id: 6,
      name: "Pearl Blossom Necklace",
      price: 780.0,
      warehouse: "Central Depot",
      stock: 22,
    },
    {
      id: 7,
      name: "Amethyst Harmony Ring",
      price: 540.0,
      warehouse: "East Hub",
      stock: 35,
    },
    {
      id: 8,
      name: "Diamond Star Earrings",
      price: 2500.0,
      warehouse: "North Warehouse",
      stock: 10,
    },
    {
      id: 9,
      name: "Topaz Glow Bracelet",
      price: 620.0,
      warehouse: "South Store",
      stock: 28,
    },
    {
      id: 10,
      name: "Onyx Shadow Pendant",
      price: 480.0,
      warehouse: "West Facility",
      stock: 30,
    },
    {
      id: 11,
      name: "Rose Quartz Ring",
      price: 410.0,
      warehouse: "Central Depot",
      stock: 26,
    },
    {
      id: 12,
      name: "Turquoise Sky Earrings",
      price: 530.0,
      warehouse: "East Hub",
      stock: 24,
    },
    {
      id: 13,
      name: "Obsidian Charm Bracelet",
      price: 460.0,
      warehouse: "North Warehouse",
      stock: 33,
    },
    {
      id: 14,
      name: "Jade Serenity Pendant",
      price: 700.0,
      warehouse: "South Store",
      stock: 16,
    },
    {
      id: 15,
      name: "Citrine Flame Ring",
      price: 560.0,
      warehouse: "West Facility",
      stock: 21,
    },
    {
      id: 16,
      name: "Aquamarine Breeze Necklace",
      price: 1100.0,
      warehouse: "Central Depot",
      stock: 12,
    },
    {
      id: 17,
      name: "Garnet Passion Earrings",
      price: 640.0,
      warehouse: "East Hub",
      stock: 19,
    },
  ];
};

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInventoryData();
      setInventory(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(inventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = inventory.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

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
            Inventory
          </h1>
          <Link to="/admin/product-gallery">
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
              Product Gallery
            </button>
          </Link>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  backgroundColor: "#f8f8f8",
                  borderBottom: "2px solid #e0e0e0",
                }}
              >
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#666",
                  }}
                >
                  No
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#666",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#666",
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#666",
                  }}
                >
                  Warehouse
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#666",
                  }}
                >
                  Stock
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#666",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, i) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    backgroundColor: i % 2 === 0 ? "white" : "#fafafa",
                  }}
                >
                  <td
                    style={{
                      padding: "15px 12px",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    {item.id}
                  </td>
                  <td
                    style={{
                      padding: "15px 12px",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    {item.name}
                  </td>
                  <td
                    style={{
                      padding: "15px 12px",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    S/ {item.price.toFixed(2)}
                  </td>
                  <td
                    style={{
                      padding: "15px 12px",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    {item.warehouse}
                  </td>
                  <td
                    style={{
                      padding: "15px 12px",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    {item.stock}
                  </td>
                  <td style={{ padding: "15px 12px" }}>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#666"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              background: "white",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              borderRadius: "4px",
            }}
          >
            «
          </button>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              background: "white",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              borderRadius: "4px",
            }}
          >
            ‹
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                background: currentPage === page ? "#0066cc" : "white",
                color: currentPage === page ? "white" : "#333",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              background: "white",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              borderRadius: "4px",
            }}
          >
            ›
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              background: "white",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              borderRadius: "4px",
            }}
          >
            »
          </button>
        </div>
      </main>
    </div>
  );
}

export default Inventory;
