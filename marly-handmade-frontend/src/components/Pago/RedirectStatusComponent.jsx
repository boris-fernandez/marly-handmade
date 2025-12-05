import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.jsx'; 

const RedirectStatusComponent = () => {
  const [status, setStatus] = useState('Verificando estado...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { clearCart } = useCart(); 
  
  // URL del endpoint (backend) para consultar el estado del pago
  const API_URL_ESTADO = 'https://marlybackend.azurewebsites.net/api/pagos/estado';

  useEffect(() => {
    const preferenceId = localStorage.getItem('preferenceId');

    if (!preferenceId) {
      setError('Error: No se encontró la referencia de pago (preferenceId) en el almacenamiento local.');
      setStatus('Error de referencia.');
      setLoading(false);
      return;
    }

    const verificarEstado = async () => {
      try {
        setLoading(true);
        
        const response = await axios.get(`${API_URL_ESTADO}/${preferenceId}`);
        const pago = response.data;
        
        console.log('Estado final del pago:', pago);

        if (pago && pago.estado === 'approved') {
          setStatus('¡Pago Aprobado! Gracias por tu compra.');
          clearCart(); 
        } else if (pago && pago.estado === 'pending') {
          setStatus('Pago Pendiente. Recibirás una notificación por correo electrónico pronto.');
        } else {
          setStatus(`Pago Rechazado. Estado: ${pago?.estado || 'fallido'}.`);
        }
        
      } catch (err) {
        console.error('Error al consultar estado:', err);
        setStatus('No se pudo conectar con el servidor para verificar el estado.');
        setError(true);
      } finally {
        localStorage.removeItem('preferenceId'); 
        setLoading(false);
      }
    };

    verificarEstado();
  }, [navigate, clearCart]); 

  const getStatusColor = () => {
    if (status.includes('Aprobado')) return '#28a745'; 
    if (status.includes('Pendiente')) return '#ffc107'; 
    if (status.includes('Rechazado') || error) return '#dc3545'; 
    return '#009ee3'; 
  };

  return (
    <div className="status-page-container">
      <div className="status-card">
        <h1>{loading ? 'Procesando tu compra...' : 'Resultado del Pago'}</h1>
        
        {loading && (
          <div className="loading-state">
            <p className="status-message loading-text" style={{ color: getStatusColor() }}>
                {status}
            </p>
            <div className="spinner"></div>
          </div>
        )}

        {!loading && (
          <div className="result-state">
            <p className="status-message" style={{ color: getStatusColor() }}>{status}</p>
            {!error && (
                <p className="detail-message">
                    Revisa tu correo para ver los detalles de la orden y el comprobante.
                </p>
            )}
            
            <button 
              onClick={() => navigate('/')} 
              className="back-to-store-btn"
            >
              Volver a la Tienda
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .status-page-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f4f7f9;
        }

        .status-card {
          max-width: 500px;
          width: 90%;
          padding: 40px;
          text-align: center;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transform: translateY(-20px);
        }

        .status-card h1 {
          font-size: 1.8em;
          margin-bottom: 30px;
          color: #333;
        }

        .loading-state {
            margin-top: 20px;
        }

        .status-message {
          font-size: 1.6em;
          font-weight: 700;
          margin-bottom: 10px;
        }
        
        .loading-text {
            animation: pulse 1.5s infinite;
        }

        .detail-message {
            color: #666;
            margin-top: 10px;
            font-size: 1em;
        }

        .spinner {
          margin: 25px auto;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #009ee3;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }

        .back-to-store-btn {
          padding: 12px 25px;
          margin-top: 30px;
          background: #d4af37;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1em;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s, transform 0.1s;
        }

        .back-to-store-btn:hover {
          background: #c09f30;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};

export default RedirectStatusComponent;