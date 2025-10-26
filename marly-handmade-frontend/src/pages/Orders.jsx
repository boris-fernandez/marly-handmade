import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar.jsx";

import { Link } from "react-router-dom";

const getOrdersData = async () => {
  return [
    {
      date: "2024-06-01",
      orderId: "SO1001",
      customer: "Acme Corporation",
      status: "Shipped",
      amount: 2500.0,
    },
    {
      date: "2024-06-02",
      orderId: "SO1002",
      customer: "Brave Solutions",
      status: "Pending",
      amount: 1200.0,
    },
    {
      date: "2024-06-02",
      orderId: "SO1003",
      customer: "Charlie's Workshop",
      status: "Cancelled",
      amount: 500.0,
    },
    {
      date: "2024-06-03",
      orderId: "SO1004",
      customer: "Delta Retail",
      status: "Processing",
      amount: 750.0,
    },
    {
      date: "2024-06-04",
      orderId: "SO1005",
      customer: "Echo Enterprises",
      status: "Shipped",
      amount: 3000.0,
    },
    {
      date: "2024-06-05",
      orderId: "SO1006",
      customer: "Foxtrot Media",
      status: "Pending",
      amount: 1150.0,
    },
    {
      date: "2024-06-06",
      orderId: "SO1007",
      customer: "Golf and Sons",
      status: "Shipped",
      amount: 2300.0,
    },
    {
      date: "2024-06-07",
      orderId: "SO1008",
      customer: "Hotel Harmony",
      status: "Processing",
      amount: 900.0,
    },
    {
      date: "2024-06-08",
      orderId: "SO1009",
      customer: "India IT Solutions",
      status: "Cancelled",
      amount: 600.0,
    },
    {
      date: "2024-06-09",
      orderId: "SO1010",
      customer: "Juliett Services",
      status: "Shipped",
      amount: 1850.0,
    },
    {
      date: "2024-06-10",
      orderId: "SO1011",
      customer: "Kilo Retail Group",
      status: "Pending",
      amount: 2750.0,
    },
    {
      date: "2024-06-11",
      orderId: "SO1012",
      customer: "Lima Landscaping",
      status: "Shipped",
      amount: 980.0,
    },
    {
      date: "2024-06-12",
      orderId: "SO1013",
      customer: "Mike's Mechanics",
      status: "Processing",
      amount: 450.0,
    },
    {
      date: "2024-06-13",
      orderId: "SO1014",
      customer: "November Nightlife",
      status: "Shipped",
      amount: 3250.0,
    },
    {
      date: "2024-06-14",
      orderId: "SO1015",
      customer: "Oscar Outdoors",
      status: "Cancelled",
      amount: 1300.0,
    },
    {
      date: "2024-06-15",
      orderId: "SO1016",
      customer: "Papa Pharmaceuticals",
      status: "Pending",
      amount: 4800.0,
    },
    {
      date: "2024-06-16",
      orderId: "SO1017",
      customer: "Quebec Quilts",
      status: "Processing",
      amount: 1200.0,
    },
  ];
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All Sales Orders");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const ordersData = await getOrdersData();
      setOrders(ordersData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Shipped":
        return "#28a745";
      case "Pending":
        return "#ffc107";
      case "Processing":
        return "#17a2b8";
      case "Cancelled":
        return "#dc3545";
      default:
        return "#666";
    }
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + itemsPerPage);

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
            Orders
          </h1>
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
            + New
          </button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <option>All Sales Orders</option>
            <option>Shipped</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Cancelled</option>
          </select>
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
                  Date
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
                  Order #
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
                  Customer
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
                  Status
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
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, i) => (
                <tr
                  key={i}
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
                    ${order.amount.toFixed(2)}
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
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                background: currentPage === i + 1 ? "#333" : "white",
                color: currentPage === i + 1 ? "white" : "#333",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              {i + 1}
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

export default Orders;
