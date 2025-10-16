import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";

const getUsersData = () => {
  return [
    {
      id: 1,
      username: "jdoe2024",
      name: "John Doe",
      email: "john.doe@email.com",
      registered: "01/15/2024",
    },
    {
      id: 2,
      username: "msmith89",
      name: "Mary Smith",
      email: "mary.smith@email.com",
      registered: "02/20/2024",
    },
    {
      id: 3,
      username: "rjohnson",
      name: "Robert Johnson",
      email: "r.johnson@email.com",
      registered: "03/10/2024",
    },
    {
      id: 4,
      username: "lwilliams",
      name: "Linda Williams",
      email: "linda.w@email.com",
      registered: "04/05/2024",
    },
  ];
};

function UserManagement() {
  const [users] = useState(getUsersData());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const getPurchaseHistory = () => {
    return [
      {
        code: "PUR001",
        date: "2024-05-15",
        product: "Golden Sun Necklace",
        category: "Jewelry",
        price: 850.0,
        method: "Credit Card",
        status: "Completed",
      },
      {
        code: "PUR002",
        date: "2024-04-22",
        product: "Silver Moon Ring",
        category: "Jewelry",
        price: 320.0,
        method: "PayPal",
        status: "Completed",
      },
      {
        code: "PUR003",
        date: "2024-03-18",
        product: "Emerald Earrings",
        category: "Jewelry",
        price: 1200.0,
        method: "Debit Card",
        status: "Completed",
      },
    ];
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
            marginBottom: "20px",
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
            User Management
          </h1>
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "8px 15px",
                border: "1px solid #ddd",
                borderRadius: "20px",
                fontSize: "14px",
                width: "200px",
              }}
            />
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <p
          style={{
            fontSize: "13px",
            color: "#666",
            marginBottom: "30px",
            lineHeight: "1.6",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Manage your
          users and view their purchase history.
        </p>

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
                    padding: "15px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#666",
                  }}
                >
                  Username
                </th>
                <th
                  style={{
                    padding: "15px",
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
                    padding: "15px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#666",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "15px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#666",
                  }}
                >
                  Registered
                </th>
                <th
                  style={{
                    padding: "15px",
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#666",
                  }}
                >
                  Purchase history
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr
                  key={user.id}
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    backgroundColor: i % 2 === 0 ? "white" : "#fafafa",
                  }}
                >
                  <td style={{ padding: "20px 15px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "50%",
                          background: "#ddd",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#666"
                          strokeWidth="2"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <span style={{ fontSize: "14px", color: "#333" }}>
                        {user.username}
                      </span>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "20px 15px",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    {user.name}
                  </td>
                  <td
                    style={{
                      padding: "20px 15px",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    {user.email}
                  </td>
                  <td
                    style={{
                      padding: "20px 15px",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    {user.registered}
                  </td>
                  <td style={{ padding: "20px 15px", textAlign: "center" }}>
                    <button
                      onClick={() => setSelectedUser(user)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "5px",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#666"
                        strokeWidth="2"
                      >
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Purchase History Modal */}
        {selectedUser && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "8px",
                padding: "30px",
                maxWidth: "900px",
                width: "90%",
                maxHeight: "80vh",
                overflow: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h2 style={{ fontSize: "24px", margin: 0, color: "#333" }}>
                  Customer Purchase History
                </h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "24px",
                    color: "#666",
                  }}
                >
                  ×
                </button>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e0e0e0" }}>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      Code
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      Product
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      Category
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      Price
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      Payment Method
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getPurchaseHistory().map((purchase, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td
                        style={{
                          padding: "12px 10px",
                          fontSize: "13px",
                          color: "#333",
                        }}
                      >
                        {purchase.code}
                      </td>
                      <td
                        style={{
                          padding: "12px 10px",
                          fontSize: "13px",
                          color: "#333",
                        }}
                      >
                        {purchase.date}
                      </td>
                      <td
                        style={{
                          padding: "12px 10px",
                          fontSize: "13px",
                          color: "#333",
                        }}
                      >
                        {purchase.product}
                      </td>
                      <td
                        style={{
                          padding: "12px 10px",
                          fontSize: "13px",
                          color: "#333",
                        }}
                      >
                        {purchase.category}
                      </td>
                      <td
                        style={{
                          padding: "12px 10px",
                          fontSize: "13px",
                          color: "#333",
                        }}
                      >
                        ${purchase.price.toFixed(2)}
                      </td>
                      <td
                        style={{
                          padding: "12px 10px",
                          fontSize: "13px",
                          color: "#333",
                        }}
                      >
                        {purchase.method}
                      </td>
                      <td style={{ padding: "12px 10px" }}>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            background: "#d4edda",
                            color: "#155724",
                          }}
                        >
                          {purchase.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default UserManagement;
