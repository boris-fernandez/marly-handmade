import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const getProductsData = () => {
  return [
    { id: 1, name: 'Street Pulse H', type: 'Hoola', vendor: 'StreetFlex', unitCost: 140, stock: 150 },
    { id: 2, name: 'Urban Shadow J', type: 'Hoola', vendor: 'CityMixes', unitCost: 120, stock: 180 },
    { id: 3, name: 'Neon Splash', type: 'Hoola', vendor: 'UrbanTech', unitCost: 160, stock: 125 },
    { id: 4, name: 'Night Walker J', type: 'Hoola', vendor: 'DenimWork', unitCost: 150, stock: 95 },
    { id: 5, name: 'Retro High Sne', type: 'Sneakers', vendor: 'StreetFlex', unitCost: 130, stock: 5 },
    { id: 6, name: 'Cityscape', type: 'Cap', vendor: 'HeadTop', unitCost: 45, stock: 200 },
    { id: 7, name: 'Skyline So', type: 'Socks', vendor: 'FootWool', unitCost: 18, stock: 350 },
    { id: 8, name: 'Moonlight S', type: 'Scarf', vendor: 'WrapUp', unitCost: 130, stock: 75 }
  ];
};

function ProductGallery() {
  const [products] = useState(getProductsData());

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
      <main style={{ flex: 1, padding: '40px', backgroundColor: '#f0f0f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '36px', margin: 0, color: '#333', fontWeight: '400' }}>Product Gallery</h1>
          <Link to="/admin/inventory">
            <button style={{
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>Inventory</button>
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }}>
          {products.map((product) => (
            <div key={product.id} style={{
              background: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '100%',
                aspectRatio: '1',
                background: '#f5f5f5',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
                fontSize: '60px',
                color: '#ddd'
              }}>✕</div>
              
              <h3 style={{ fontSize: '16px', margin: '0 0 10px 0', color: '#333', fontWeight: '500' }}>
                {product.name}
              </h3>
              
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                <strong>Type:</strong><br />
                <span style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  background: '#f0f0f0',
                  borderRadius: '3px',
                  marginTop: '3px'
                }}>{product.type}</span>
              </div>
              
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                <strong>Vendor:</strong><br />
                <span style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  background: '#f0f0f0',
                  borderRadius: '3px',
                  marginTop: '3px'
                }}>{product.vendor}</span>
              </div>
              
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
                <strong>Unit Cost:</strong><br />
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>${product.unitCost}</span>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                background: product.stock <= 10 ? '#fff3cd' : '#d4edda',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                <span>{product.stock <= 10 ? '⚠ Low stock' : `✓ ${product.stock} in stock`}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductGallery;