import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext.jsx'; // Importar useCart

const CompraExitosa = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [estadoPago, setEstadoPago] = useState(null);
    const [loading, setLoading] = useState(true);
    const [finalStatus, setFinalStatus] = useState(null); // 'approved', 'pending', 'rejected', 'error_ref', 'error_server'
    const { clearCart } = useCart(); // Obtener la función para limpiar el carrito

    // URL del endpoint de tu backend para consultar el estado del pago
    const API_URL_ESTADO = 'http://localhost:8080/api/pagos/estado';

    useEffect(() => {
        verificarPago();
    }, []);

    const verificarPago = async () => {
        try {
            // Obtener parámetros de la URL
            const paymentId = searchParams.get('payment_id');
            const status = searchParams.get('status');
            const preferenceId = localStorage.getItem('preferenceId');

            console.log('Verificando pago:', { paymentId, status, preferenceId });

            if (preferenceId) {
                // Consultar estado del pago en el backend
                const response = await axios.get(
                    `${API_URL_ESTADO}/${preferenceId}`
                );

                const data = response.data;
                setEstadoPago(data);
                setFinalStatus(data.estado);
                
                // 🚨 Limpiar carrito si el pago fue aprobado
                if (data.estado === 'approved') {
                    clearCart(); // Usar la función del contexto para limpiar el carrito
                    localStorage.removeItem('preferenceId');
                } else if (data.estado !== 'pending') {
                    // Limpiar solo la referencia si el pago no está pendiente (está rechazado, etc.)
                    localStorage.removeItem('preferenceId');
                }

            } else {
                // Si no hay preferenceId, no se puede verificar
                setFinalStatus('error_ref');
            }

        } catch (error) {
            console.error('Error verificando pago:', error);
            setFinalStatus('error_server');
        } finally {
            setLoading(false);
        }
    };

    // --- Lógica de Contenido Dinámico ---
    const getStatusInfo = (status) => {
        switch (status) {
            case 'approved':
                return {
                    title: '¡Compra Exitosa! 🎉',
                    message: 'Tu pago ha sido procesado correctamente. Recibirás un email de confirmación en breve.',
                    color: '#4CAF50', // Verde
                    iconSvg: (
                        <svg width="80" height="80" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="38" fill="#4CAF50" />
                            <path d="M25 40 L35 50 L55 30" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
                        </svg>
                    )
                };
            case 'pending':
                return {
                    title: 'Pago Pendiente ⏳',
                    message: 'Tu pago está pendiente de aprobación. Recibirás una notificación por correo electrónico cuando se confirme.',
                    color: '#ff9800', // Naranja/Amarillo
                    iconSvg: (
                        <svg width="80" height="80" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="38" fill="#ff9800" />
                            <path d="M40 18 L40 45 M40 55 H40" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )
                };
            case 'rejected':
            case 'error_server':
            case 'error_ref':
            default:
                return {
                    title: 'Pago Fallido 🙁',
                    message: 'Hubo un problema con tu pago. Por favor, revisa tus datos o intenta con otro medio de pago. Si ya se te hizo un cargo, contáctanos.',
                    color: '#f44336', // Rojo
                    iconSvg: (
                        <svg width="80" height="80" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="38" fill="#f44336" />
                            <path d="M30 30 L50 50 M50 30 L30 50" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
                        </svg>
                    )
                };
        }
    };

    const info = getStatusInfo(finalStatus);

    if (loading) {
        return (
            <div className="container-confirmacion loading-background">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Verificando tu pago...</p>
                </div>
                <style jsx>{`
                    .loading-background {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    }
                    .loading-spinner {
                        text-align: center;
                        color: white;
                    }
                    .spinner {
                        border: 4px solid rgba(255,255,255,0.3);
                        border-top: 4px solid white;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="container-confirmacion" style={{ '--main-color': info.color }}>
            <div className="card-confirmacion">
                {/* Icono de estado dinámico */}
                <div className="icono-estado">
                    {info.iconSvg}
                </div>

                {/* Mensaje principal */}
                <h1 style={{ color: info.color }}>{info.title}</h1>
                <p className="mensaje-principal">{info.message}</p>

                {/* Detalles del pago (Solo si tenemos data y no es un error de referencia/servidor) */}
                {estadoPago && finalStatus !== 'error_ref' && finalStatus !== 'error_server' && (
                    <div className="detalles-pago">
                        <h3>Detalles de tu orden</h3>
                        
                        <div className="detalle-item">
                            <span className="label">ID de Transacción:</span>
                            <span className="value">{estadoPago.paymentId || 'N/A'}</span>
                        </div>

                        <div className="detalle-item">
                            <span className="label">Monto Total:</span>
                            <span className="value monto">S/ {estadoPago.monto?.toFixed(2) || '0.00'}</span>
                        </div>

                        <div className="detalle-item">
                            <span className="label">Estado:</span>
                            <span className="value estado-dinamico" style={{ color: info.color }}>
                                {finalStatus.charAt(0).toUpperCase() + finalStatus.slice(1)}
                                {finalStatus === 'approved' ? ' ✓' : ''}
                            </span>
                        </div>

                        <div className="detalle-item">
                            <span className="label">Método de Pago:</span>
                            <span className="value">{estadoPago.metodoPago?.toUpperCase() || 'N/A'}</span>
                        </div>

                        <div className="detalle-item">
                            <span className="label">Fecha:</span>
                            <span className="value">
                                {estadoPago.fechaCreacion ? new Date(estadoPago.fechaCreacion).toLocaleString('es-PE') : 'N/A'}
                            </span>
                        </div>
                    </div>
                )}
                
                {/* Mensaje de error / referencia */}
                {(finalStatus === 'error_ref' || finalStatus === 'error_server') && (
                    <div className="detalles-pago" style={{ backgroundColor: '#fff0f0', border: '1px solid #f44336' }}>
                        <p style={{ color: '#f44336', fontWeight: 'bold' }}>
                           {finalStatus === 'error_ref' 
                            ? 'No se pudo encontrar la referencia de pago. Es posible que el navegador haya perdido la información.'
                            : 'Error al conectar con el servidor para verificar el estado de la transacción.'}
                        </p>
                        <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
                            Si el cargo se realizó en tu método de pago, por favor contáctanos de inmediato.
                        </p>
                    </div>
                )}


                {/* Información adicional (Visible solo en éxito y pendiente) */}
                {(finalStatus === 'approved' || finalStatus === 'pending') && (
                    <div className="info-adicional">
                        <div className="info-box">
                            <span className="icono">📧</span>
                            <div>
                                <strong>Email de Confirmación</strong>
                                <p>Revisa tu bandeja de entrada</p>
                            </div>
                        </div>

                        <div className="info-box">
                            <span className="icono">📦</span>
                            <div>
                                <strong>Procesamiento</strong>
                                <p>Tu pedido será preparado pronto</p>
                            </div>
                        </div>

                        <div className="info-box">
                            <span className="icono">🚚</span>
                            <div>
                                <strong>Envío</strong>
                                <p>Te contactaremos con los detalles</p>
                            </div>
                        </div>
                    </div>
                )}


                {/* Botones de acción */}
                <div className="acciones">
                    <button 
                        onClick={() => navigate('/')} 
                        className="btn-primary"
                        style={{ backgroundColor: info.color }}
                    >
                        Volver al Inicio
                    </button>
                    
                    {/* El botón de mis pedidos solo aparece si no hubo un error grave */}
                    {finalStatus !== 'error_ref' && finalStatus !== 'error_server' && (
                        <button 
                            onClick={() => navigate('/mis-pedidos')} 
                            className="btn-secondary"
                            style={{ borderColor: info.color, color: info.color }}
                        >
                            Ver Mis Pedidos
                        </button>
                    )}
                </div>

                {/* Footer */}
                <div className="footer-mensaje">
                    <p>¿Tienes alguna pregunta?</p>
                    <a href="mailto:info@marlyhandmade.com" style={{ color: info.color }}>Contáctanos</a>
                </div>
            </div>

            <style jsx>{`
                .container-confirmacion {
                    min-height: 100vh;
                    /* Usamos la variable CSS --main-color para el gradiente de fondo */
                    background: linear-gradient(135deg, var(--main-color, #667eea) 0%, #764ba2 100%);
                    padding: 40px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .card-confirmacion {
                    background: white;
                    border-radius: 20px;
                    padding: 60px 40px;
                    max-width: 700px;
                    width: 100%;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    text-align: center;
                }

                .icono-estado {
                    margin-bottom: 30px;
                    animation: aparecer 0.5s ease-out;
                    border: 4px solid transparent;
                    border-radius: 50%;
                    display: inline-block;
                }

                @keyframes aparecer {
                    from {
                        transform: scale(0.5);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                h1 {
                    font-size: 36px;
                    color: #333;
                    margin-bottom: 16px;
                }

                .mensaje-principal {
                    font-size: 18px;
                    color: #666;
                    margin-bottom: 40px;
                    line-height: 1.6;
                }

                .detalles-pago {
                    background: #f8f9fa;
                    border-radius: 12px;
                    padding: 24px;
                    margin-bottom: 30px;
                    text-align: left;
                }

                .detalles-pago h3 {
                    margin-bottom: 20px;
                    color: #333;
                    text-align: center;
                }

                .detalle-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px solid #e0e0e0;
                }

                .detalle-item:last-child {
                    border-bottom: none;
                }

                .label {
                    font-weight: 500;
                    color: #666;
                }

                .value {
                    font-weight: 600;
                    color: #333;
                }

                .value.monto {
                    font-size: 20px;
                    font-weight: 700;
                }

                .info-adicional {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .info-box {
                    background: #f0f7ff;
                    border-radius: 12px;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    text-align: left;
                }

                .info-box .icono {
                    font-size: 32px;
                }

                .info-box strong {
                    display: block;
                    margin-bottom: 4px;
                    color: #333;
                }

                .info-box p {
                    font-size: 14px;
                    color: #666;
                    margin: 0;
                }

                .acciones {
                    display: flex;
                    gap: 16px;
                    margin-bottom: 30px;
                    flex-wrap: wrap;
                }

                .btn-primary, .btn-secondary {
                    flex: 1;
                    min-width: 200px;
                    padding: 16px 32px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    border: none;
                }

                .btn-primary {
                    color: white;
                    border: none;
                }

                .btn-primary:hover {
                    opacity: 0.9;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); 
                }

                .btn-secondary {
                    background: white;
                    border: 2px solid;
                }

                .btn-secondary:hover {
                    background: #f0f4ff;
                }

                .footer-mensaje {
                    padding-top: 30px;
                    border-top: 1px solid #e0e0e0;
                    color: #666;
                }

                .footer-mensaje p {
                    margin-bottom: 8px;
                }

                .footer-mensaje a {
                    text-decoration: none;
                    font-weight: 600;
                }

                .footer-mensaje a:hover {
                    text-decoration: underline;
                }

                @media (max-width: 768px) {
                    .card-confirmacion {
                        padding: 40px 20px;
                    }

                    h1 {
                        font-size: 28px;
                    }

                    .acciones {
                        flex-direction: column;
                    }

                    .btn-primary, .btn-secondary {
                        min-width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default CompraExitosa;
