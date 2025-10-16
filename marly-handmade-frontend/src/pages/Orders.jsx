import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

const getOrdersData = async () => {
  return [
    { date: '2024-06-01', orderId: 'SO1001', customer: 'Acme Corporation', status: 'Shipped', amount: 2500.00 },
    { date: '2024-06-02', orderId: 'SO1002', customer: 'Brave Solutions', status: 'Pending', amount: 1200.00 },
    { date: '2024-06-02', orderId: 'SO1003', customer: "Charlie's Workshop", status: 'Cancelled', amount: 500.00 },
    { date: '2024-06-03', orderId: 'SO1004', customer: 'Delta Retail', status: 'Processing', amount: 750.00 },
    { date: '2024-06-04', orderId: 'SO1005', customer: 'Echo Enterprises', status: 'Shipped', amount: 3000.00 },
    { date: '2024-06-05', orderId: 'SO1006', customer: 'Foxtrot Media', status: 'Pending', amount: 1150.00 },
    { date: '2024-06-06', orderId: 'SO1007', customer: 'Golf and Sons', status: 'Shipped', amount: 2300.00 },
    { date: '2024-06-07', orderId: 'SO1008', customer: 'Hotel Harmony', status: 'Processing', amount: 900.00 },
    { date: '2024-06-08', orderId: 'SO1009', customer: 'India IT Solutions', status: 'Cancelled', amount: 600.00 },
    { date: '2024-06-09', orderId: 'SO1010', customer: 'Juliett Services', status: 'Shipped', amount: 1850.00 },
    { date: '2024-06-10', orderId: 'SO1011', customer: 'Kilo Retail Group', status: 'Pending', amount: 2750.00 },
    { date: '2024-06-11', orderId: 'SO1012', customer: 'Lima Landscaping', status: 'Shipped', amount: 980.00 },
    { date: '2024-06-12', orderId: 'SO1013', customer: "Mike's Mechanics", status: 'Processing', amount: 450.00 },
    { date: '2024-06-13', orderId: 'SO1014', customer: 'November Nightlife', status: 'Shipped', amount: 3250.00 },
    { date: '2024-06-14', orderId: 'SO1015', customer: 'Oscar Outdoors', status: 'Cancelled', amount: 1300.00 },
    { date: '2024-06-15', orderId: 'SO1016', customer: 'Papa Pharmaceuticals', status: 'Pending', amount: 4800.00 },
    { date: '2024-06-16', orderId: 'SO1017', customer: 'Quebec Quilts', status: 'Processing', amount: 1200.00 }
  ];
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All Sales Orders');
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
      case 'Shipped': return '#28a745';
      case 'Pending': return '#ffc107';
      case 'Processing': return '#17a2b8';
      case 'Cancelled': return '#dc3545';
      default: return '#666';
    }
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Sidebar */}
      <aside style={{
        width: '230px',
        backgroundColor: '#a8a8a8',
        color: 'white',
        padding: '0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '30px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" style={{ width: '20px', height: '20px' }} />
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>MARLY</h2>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '20px 0' }}>
          <Link to="/admin/dashboard" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/products" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            </svg>
            <span>Products Register</span>
          </Link>
          <Link to="/admin/users" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            </svg>
            <span>Users</span>
          </Link>
          <Link to="/admin/inventory" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8"/>
            </svg>
            <span>Inventory</span>
          </Link>
          <Link to="/admin/orders" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.25)', borderLeft: '4px solid white'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10"/>
            </svg>
            <span>Orders</span>
          </Link>
          <Link to="/admin/content" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="12" x2="21" y2="12"/>
            </svg>
            <span>Content Management</span>
          </Link>
          <Link to="/admin/reports" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
            </svg>
            <span>Reports / Analytics</span>
          </Link>
        </nav>

        <Link to="/admin/profile" style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '20px',
          color: 'white', textDecoration: 'none', borderTop: '1px solid rgba(255,255,255,0.2)'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          </svg>
          <span>Profile</span>
        </Link>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '36px', margin: 0, color: '#333', fontWeight: '400' }}>Orders</h1>
          <button style={{
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>+ New</button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            <option>All Sales Orders</option>
            <option>Shipped</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f8f8', borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Order #</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Customer</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, i) => (
                <tr key={i} style={{ 
                  borderBottom: '1px solid #f0f0f0',
                  backgroundColor: i % 2 === 0 ? 'white' : '#fafafa'
                }}>
                  <td style={{ padding: '15px 12px', fontSize: '14px', color: '#333' }}>
                    ${order.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginTop: '20px'
        }}>
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              background: 'white',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              borderRadius: '4px'
            }}
          >
            «
          </button>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              background: 'white',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              borderRadius: '4px'
            }}
          >
            ‹
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                background: currentPage === i + 1 ? '#333' : 'white',
                color: currentPage === i + 1 ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              background: 'white',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              borderRadius: '4px'
            }}
          >
            ›
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              background: 'white',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              borderRadius: '4px'
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