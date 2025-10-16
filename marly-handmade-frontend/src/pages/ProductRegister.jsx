import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductRegister() {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    material: '',
    stock: '',
    price: '',
    mainImage: null,
    additionalImages: []
  });

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (type === 'main') {
      setFormData({ ...formData, mainImage: file });
    } else {
      setFormData({ 
        ...formData, 
        additionalImages: [...formData.additionalImages, file]
      });
    }
  };

  const handleSubmit = () => {
    console.log('Product data:', formData);
    alert('Product registered successfully!');
  };

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
            color: 'white', textDecoration: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.25)', borderLeft: '4px solid white'
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
            color: 'white', textDecoration: 'none'
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
        <h1 style={{ fontSize: '36px', marginBottom: '40px', color: '#333', fontWeight: '400' }}>
          Product Register
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '40px', maxWidth: '1200px' }}>
          {/* Left Side - Image Uploads */}
          <div>
            {/* Main Image Upload */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                width: '100%',
                aspectRatio: '1',
                border: '2px dashed #ddd',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: '#fafafa',
                transition: 'all 0.3s'
              }}>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'main')}
                  style={{ display: 'none' }} 
                />
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: '500', color: '#333' }}>
                  UPLOAD
                </div>
              </label>
            </div>

            {/* Additional Images */}
            <div style={{ display: 'flex', gap: '15px' }}>
              {[1, 2, 3].map((num) => (
                <label key={num} style={{
                  flex: 1,
                  aspectRatio: '1',
                  border: '2px dashed #ddd',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  background: '#fafafa',
                  transition: 'all 0.3s'
                }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'additional')}
                    style={{ display: 'none' }} 
                  />
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  <div style={{ marginTop: '10px', fontSize: '11px', fontWeight: '500', color: '#666' }}>
                    UPLOAD
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '13px', 
                fontWeight: '500', 
                color: '#666',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Product Name
              </label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '13px', 
                fontWeight: '500', 
                color: '#666',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '25px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '13px', 
                  fontWeight: '500', 
                  color: '#666',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Material
                </label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '13px', 
                  fontWeight: '500', 
                  color: '#666',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Stock
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '13px', 
                  fontWeight: '500', 
                  color: '#666',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Price
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              style={{
                background: '#333',
                color: 'white',
                border: 'none',
                padding: '12px 40px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginTop: '20px'
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