import React, { useState } from 'react';
import api from "../../api/axiosConfig";
import { useNavigate } from 'react-router-dom';

const CheckoutComponent = React.forwardRef(({ carrito, totalCompra, datosCliente }, ref) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const API_URL = 'http://localhost:8080/api/pagos/crear-preferencia';
    const SUCCESS_URL = 'http://localhost:5173/compra-exitosa';

    const procesarPago = async () => {
        try {
            setLoading(true);
            setError(null);

            // Obtener token JWT
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Debes iniciar sesión para procesar tu compra.');
                setTimeout(() => navigate('/login'), 1500);
                return;
            }

            // Headers
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            // Items del carrito
            const items = carrito.map(item => ({
                titulo: item.nombre,
                descripcion: item.descripcion || `${item.nombre} - Joyería artesanal`,
                cantidad: item.quantity,
                precioUnitario: parseFloat(item.price),
                imagenUrl: item.image,
                productoId: item.id
            }));

            // Comprador
            const comprador = {
                nombre: datosCliente.nombre,
                apellido: datosCliente.apellido,
                email: datosCliente.email,
                telefono: datosCliente.telefono || '999999999',
                identificacion: datosCliente.identificacion || '00000000',
                tipoIdentificacion: 'DNI'
            };

            const requestData = {
                items,
                comprador,
                clienteId: datosCliente.id || null,
                emailCliente: datosCliente.email
            };

            console.log("📤 Enviando request a backend:", requestData);

            const response = await api.post('/api/pagos/crear-preferencia', requestData);


            console.log("📥 Respuesta de backend:", response.data);

            if (response.data.sandboxInitPoint) {
                localStorage.setItem('preferenceId', response.data.preferenceId);
                window.location.href = response.data.sandboxInitPoint;
            } else {
                setError("No se pudo generar el link de pago");
            }

        } catch (err) {
            console.error("❌ Error al procesar pago:", err);

            if (err.response?.status === 403) {
                setError("Sesión expirada o no autorizada. Vuelve a iniciar sesión.");
                setTimeout(() => navigate('/login'), 1500);
                return;
            }

            setError(
                err.response?.data?.mensaje ||
                err.response?.data?.error ||
                "Error inesperado al procesar el pago."
            );

        } finally {
            setLoading(false);
        }
    };

    React.useImperativeHandle(ref, () => ({
        procesarPago
    }));

    return (
        <div className="checkout-container">
            <div className="resumen-compra">
                <h3>Resumen de tu compra</h3>

                {carrito.map((item, index) => (
                    <div key={index} className="item-resumen">
                        <img src={item.image} alt={item.nombre} />
                        <div>
                            <p className="nombre-producto">{item.nombre}</p>
                            <p className="cantidad">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="precio">S/ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}

                <div className="total-section">
                    <h4>Total a pagar:</h4>
                    <h3>S/ {totalCompra.toFixed(2)}</h3>
                </div>
            </div>

            {error && (
                <div className="alert-error">
                    <span>⚠️</span>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
});

export default CheckoutComponent;
