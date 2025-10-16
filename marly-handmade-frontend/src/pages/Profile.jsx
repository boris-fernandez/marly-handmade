import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [profileData, setProfileData] = useState({
    fullName: 'Tom Cook',
    email: 'tom.cook@example.com',
    title: 'Product Manager',
    language: 'English',
    dateFormat: 'DD-MM-YYYY',
    autoTimezone: true
  });

  const [isEditing, setIsEditing] = useState({
    fullName: false,
    email: false,
    title: false,
    language: false,
    dateFormat: false
  });

  const handleUpdate = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
    // Aquí irá la llamada al API para actualizar
    console.log(`Updating ${field}:`, profileData[field]);
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
            <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, letterSpacing: '2px' }}>MARLY</h2>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '20px 0' }}>
          <Link to="/admin/dashboard" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none', transition: 'all 0.3s'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span style={{ fontSize: '15px' }}>Dashboard</span>
          </Link>

          <Link to="/admin/products" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none', transition: 'all 0.3s'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span style={{ fontSize: '15px' }}>Products Register</span>
          </Link>

          <Link to="/admin/users" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none', transition: 'all 0.3s'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span style={{ fontSize: '15px' }}>Users</span>
          </Link>

          <Link to="/admin/inventory" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none', transition: 'all 0.3s'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            <span style={{ fontSize: '15px' }}>Inventory</span>
          </Link>

          <Link to="/admin/orders" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none', transition: 'all 0.3s'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            <span style={{ fontSize: '15px' }}>Orders</span>
          </Link>

          <Link to="/admin/content" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none', transition: 'all 0.3s'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            <span style={{ fontSize: '15px' }}>Content Management</span>
          </Link>

          <Link to="/admin/reports" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none', transition: 'all 0.3s'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
            </svg>
            <span style={{ fontSize: '15px' }}>Reports / Analytics</span>
          </Link>
        </nav>

        <Link to="/admin/profile" style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '20px',
          color: 'white', textDecoration: 'none', borderTop: '1px solid rgba(255,255,255,0.2)',
          backgroundColor: 'rgba(255, 255, 255, 0.25)', borderLeft: '4px solid white'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          <span style={{ fontSize: '15px' }}>Profile</span>
        </Link>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', backgroundColor: 'white' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px', color: '#333', fontWeight: '400' }}>
          Profile
        </h1>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '40px' }}>
          This information will be displayed publicly so be careful what you share.
        </p>

        {/* Profile Section */}
        <div style={{ maxWidth: '800px' }}>
          {/* Full Name */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <span style={{ color: '#666', fontSize: '14px', width: '150px' }}>Full name</span>
            <span style={{ flex: 1, color: '#333', fontSize: '14px' }}>{profileData.fullName}</span>
            <button onClick={() => handleUpdate('fullName')} style={{
              background: 'none',
              border: 'none',
              color: '#0066cc',
              cursor: 'pointer',
              fontSize: '14px'
            }}>Update</button>
          </div>

          {/* Email */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <span style={{ color: '#666', fontSize: '14px', width: '150px' }}>Email address</span>
            <span style={{ flex: 1, color: '#333', fontSize: '14px' }}>{profileData.email}</span>
            <button onClick={() => handleUpdate('email')} style={{
              background: 'none',
              border: 'none',
              color: '#0066cc',
              cursor: 'pointer',
              fontSize: '14px'
            }}>Update</button>
          </div>

          {/* Title */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <span style={{ color: '#666', fontSize: '14px', width: '150px' }}>Title</span>
            <span style={{ flex: 1, color: '#333', fontSize: '14px' }}>{profileData.title}</span>
            <button onClick={() => handleUpdate('title')} style={{
              background: 'none',
              border: 'none',
              color: '#0066cc',
              cursor: 'pointer',
              fontSize: '14px'
            }}>Update</button>
          </div>

          {/* Languages and Dates Section */}
          <h2 style={{ fontSize: '24px', marginTop: '50px', marginBottom: '10px', color: '#333', fontWeight: '400' }}>
            Languages and dates
          </h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>
            Choose what language and date format to use throughout your account.
          </p>

          {/* Language */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <span style={{ color: '#666', fontSize: '14px', width: '150px' }}>Language</span>
            <span style={{ flex: 1, color: '#333', fontSize: '14px' }}>{profileData.language}</span>
            <button onClick={() => handleUpdate('language')} style={{
              background: 'none',
              border: 'none',
              color: '#0066cc',
              cursor: 'pointer',
              fontSize: '14px'
            }}>Update</button>
          </div>

          {/* Date Format */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <span style={{ color: '#666', fontSize: '14px', width: '150px' }}>Date format</span>
            <span style={{ flex: 1, color: '#333', fontSize: '14px' }}>{profileData.dateFormat}</span>
            <button onClick={() => handleUpdate('dateFormat')} style={{
              background: 'none',
              border: 'none',
              color: '#0066cc',
              cursor: 'pointer',
              fontSize: '14px'
            }}>Update</button>
          </div>

          {/* Automatic Timezone */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0'
          }}>
            <span style={{ color: '#666', fontSize: '14px', width: '150px' }}>Automatic timezone</span>
            <div style={{ flex: 1 }}></div>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '50px',
              height: '24px'
            }}>
              <input
                type="checkbox"
                checked={profileData.autoTimezone}
                onChange={(e) => setProfileData({ ...profileData, autoTimezone: e.target.checked })}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: profileData.autoTimezone ? '#0066cc' : '#ccc',
                transition: '0.4s',
                borderRadius: '24px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '18px',
                  width: '18px',
                  left: profileData.autoTimezone ? '28px' : '3px',
                  bottom: '3px',
                  backgroundColor: 'white',
                  transition: '0.4s',
                  borderRadius: '50%'
                }}></span>
              </span>
            </label>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;