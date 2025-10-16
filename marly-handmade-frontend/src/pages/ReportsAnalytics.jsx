import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const getReportsData = async () => {
  return {
    leadsChart: [
      { date: '1 Oct', leads: 45 },
      { date: '8 Oct', leads: 52 },
      { date: '15 Oct', leads: 78 },
      { date: '22 Oct', leads: 95 }
    ],
    funnelStats: [
      { stage: 'Leads', count: 7325, percentage: 100 },
      { stage: 'MQLs', count: 1521, percentage: 21 },
      { stage: 'SQLs', count: 81, percentage: 1 },
      { stage: 'New Custom', count: 14, percentage: 0.2 }
    ],
    metrics: {
      totalLeads: 12042,
      mqls: 320,
      sqls: 28,
      newCustomers: 49,
      conversionRate: 2.59,
      revenue: 13400000
    },
    recentLeads: [
      { date: '2024-06-01', name: 'Alison Scott', title: 'Senior Acct. Mgr', company: 'Acme Corporation' },
      { date: '2024-06-02', name: 'Joseph Thompson', title: 'Founder', company: 'Brave Solutions' },
      { date: '2024-06-02', name: 'Peter Walton', title: 'Chairman', company: "Charlie's Workshop" },
      { date: '2024-06-03', name: 'Thomas Pierce', title: 'Manager', company: 'Delta Retail' },
      { date: '2024-06-04', name: 'Jennifer Valentine', title: 'Director Bus. Ops', company: 'Echo Enterprises' },
      { date: '2024-06-05', name: 'Mel Belkin', title: 'Manager Sol', company: 'Foxtrot Media' }
    ]
  };
};

function ReportsAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const reportsData = await getReportsData();
      setData(reportsData);
      setLoading(false);
    };
    fetchData();
  }, []);

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
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
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
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
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
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/>
            </svg>
            <span>Content Management</span>
          </Link>
          <Link to="/admin/reports" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px',
            color: 'white', textDecoration: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.25)', borderLeft: '4px solid white'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
            </svg>
            <span>Reports / Analytics</span>
          </Link>
        </nav>

        <Link to="/admin/profile" style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '20px',
          color: 'white', textDecoration: 'none', borderTop: '1px solid rgba(255,255,255,0.2)'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Profile</span>
        </Link>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Leads Chart */}
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '25px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>Leads</h3>
              <span style={{ fontSize: '14px', color: '#666' }}>1483</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data.leadsChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="leads" stroke="#333" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Funnel Pipeline */}
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '25px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '500' }}>Lead Generation Pipeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.funnelStats.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: `${item.percentage}%`,
                    minWidth: '60px',
                    height: '35px',
                    backgroundColor: ['#666', '#777', '#888', '#999'][i],
                    borderRadius: '4px'
                  }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
                    <span style={{ fontSize: '13px', color: '#333' }}>{item.stage}</span>
                    <span style={{ fontSize: '13px', color: '#666' }}>{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '15px',
          marginBottom: '20px'
        }}>
          {[
            { label: 'Leads', value: data.metrics.totalLeads },
            { label: 'MQLs', value: data.metrics.mqls },
            { label: 'SQLs', value: data.metrics.sqls },
            { label: 'New Custom', value: data.metrics.newCustomers },
            { label: 'Conversi', value: `${data.metrics.conversionRate}%` },
            { label: 'Converted', value: `$${(data.metrics.revenue / 1000000).toFixed(1)} M` }
          ].map((metric, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{metric.label}</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Recent Leads Table */}
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '25px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Title</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '500', color: '#666' }}>Company</th>
              </tr>
            </thead>
            <tbody>
              {data.recentLeads.map((lead, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '15px 12px', fontSize: '14px', color: '#333' }}>{lead.date}</td>
                  <td style={{ padding: '15px 12px', fontSize: '14px', color: '#333' }}>{lead.name}</td>
                  <td style={{ padding: '15px 12px', fontSize: '14px', color: '#333' }}>{lead.title}</td>
                  <td style={{ padding: '15px 12px', fontSize: '14px', color: '#333' }}>{lead.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ReportsAnalytics;