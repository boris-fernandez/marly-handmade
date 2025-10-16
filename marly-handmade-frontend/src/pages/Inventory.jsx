import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const getInventoryData = async () => {
  return [
    { id: 1, name: 'Golden Sun Necklace', price: 850.00, warehouse: 'Central Depot', stock: 25 },
    { id: 2, name: 'Silver Moon Ring', price: 320.00, warehouse: 'East Hub', stock: 40 },
    { id: 3, name: 'Emerald Drop Earrings', price: 1200.00, warehouse: 'North Warehouse', stock: 15 },
    { id: 4, name: 'Ruby Crown Bracelet', price: 950.00, warehouse: 'South Store', stock: 18 },
    { id: 5, name: 'Sapphire Ocean Pendant', price: 1350.00, warehouse: 'West Facility', stock: 20 },
    { id: 6, name: 'Pearl Blossom Necklace', price: 780.00, warehouse: 'Central Depot', stock: 22 },
    { id: 7, name: 'Amethyst Harmony Ring', price: 540.00, warehouse: 'East Hub', stock: 35 },
    { id: 8, name: 'Diamond Star Earrings', price: 2500.00, warehouse: 'North Warehouse', stock: 10 },
    { id: 9, name: 'Topaz Glow Bracelet', price: 620.00, warehouse: 'South Store', stock: 28 },
    { id: 10, name: 'Onyx Shadow Pendant', price: 480.00, warehouse: 'West Facility', stock: 30 },
    { id: 11, name: 'Rose Quartz Ring', price: 410.00, warehouse: 'Central Depot', stock: 26 },
    { id: 12, name: 'Turquoise Sky Earrings', price: 530.00, warehouse: 'East Hub', stock: 24 },
    { id: 13, name: 'Obsidian Charm Bracelet', price: 460.00, warehouse: 'North Warehouse', stock: 33 },
    { id: 14, name: 'Jade Serenity Pendant', price: 700.00, warehouse: 'South Store', stock: 16 },
    { id: 15, name: 'Citrine Flame Ring', price: 560.00, warehouse: 'West Facility', stock: 21 },
    { id: 16, name: 'Aquamarine Breeze Necklace', price: 1100.00, warehouse: 'Central Depot', stock: 12 },
    { id: 17, name: 'Garnet Passion Earrings', price: 640.00, warehouse: 'East Hub', stock: 19 }
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Dashboard</span>
          </Link>

          <Link to="/admin/products" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span>Products Register</span>
          </Link>

          <Link to="/admin/users" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>Users</span>
          </Link>

          <Link to="/admin/inventory" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.25)', borderLeft: '4px solid white'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            <span>Inventory</span>
          </Link>

          <Link to="/admin/orders" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            <span>Orders</span>
          </Link>

          <Link to="/admin/content" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            <span>Content Management</span>
          </Link>

          <Link to="/admin/reports" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
              <path d="M22 12A10 10 0 0 0 12 2v10z"/>
            </svg>
            <span>Reports / Analytics</span>
          </Link>
        </nav>

        <Link to="/admin/profile" style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '20px',
          color: 'white', textDecoration: 'none', borderTop: '1px solid rgba(255,255,255,0.2)'
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Profile</span>
        </Link>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '36px', margin: 0, color: '#333', fontWeight: '400' }}>Inventory</h1>
          <Link to="/admin/product-gallery">
            <button style={{
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>Product Gallery</button>
          </Link>
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
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>No</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Price</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Warehouse</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Stock</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, i) => (
                <tr key={item.id} style={{ 
                  borderBottom: '1px solid #f0f0f0',
                  backgroundColor: i % 2 === 0 ? 'white' : '#fafafa'
                }}>
                  <td style={{ padding: '15px 12px', fontSize: '14px', color: '#333' }}>{item.id}</td>
                  <td style={{ padding: '15px 12px', fontSize: '14px', color: '#333' }}>{item.name}</td>
                  <td style={{ padding: '15px 12px', fontSize: '14px', color: '#333' }}>S/ {item.price.toFixed(2)}</td>
                  <td style={{ padding: '15px 12px', fontSize: '14px', color: '#333' }}>{item.warehouse}</td>
                  <td style={{ padding: '15px 12px', fontSize: '14px', color: '#333' }}>{item.stock}</td>
                  <td style={{ padding: '15px 12px' }}>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
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
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                background: currentPage === page ? '#0066cc' : 'white',
                color: currentPage === page ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              {page}
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

export default Inventory;