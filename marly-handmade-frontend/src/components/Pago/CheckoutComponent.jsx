import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initMercadoPago } from '@mercadopago/sdk-react';
import * as MP from '@mercadopago/sdk-react';


const CheckoutComponent = React.forwardRef(({ carrito, totalCompra, datosCliente }, ref) => {
    const [loading, setLoading] = useState(false);
    const [preferenceId, setPreferenceId] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const CardPaymentComp = MP.CardPayment || (MP.default && MP.default.CardPayment) || null;

    const PAYMENT_URL = 'https://marlybackend.azurewebsites.net/api/pagos/crear-preferencia';
    const SUCCESS_URL = 'https://marly.azurewebsites.net/compra-exitosa';

    useEffect(() => {
        // Initialize MercadoPago once. For testing use your TEST public key (starts with "TEST-")
        const publicKey = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY || 'APP_USR-27526960-6686-4e4e-8da0-05b3b3c66bd7';
        if (!publicKey) {
            console.warn('[Checkout] No MercadoPago public key found in VITE_MERCADO_PAGO_PUBLIC_KEY. The Brick may not render.');
        }
        initMercadoPago(publicKey);
    }, []);

    const procesarPago = async () => {
        try {
            setLoading(true);
            setError(null);

            // Obtener token JWT
            const token = localStorage.getItem('authToken');

            if (!token) {
                setError('Debes iniciar sesión para procesar tu compra.');
                setTimeout(() => navigate('/login'), 1500);
                return;
            }

            console.log("Token JWT obtenido:", token);

            // Headers
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            console.log('CARRITO:', carrito);

            // Items del carrito
            const items = carrito.map(item => ({
                titulo: item.name,
                cantidad: item.quantity,
                precioUnitario: parseFloat(item.price),
                // imagenUrl: item.image,
                productoId: item.id
            }));

            console.log("Items del carrito para el pago:", items);

            const requestData = {
                items,
                comprador: {
                    nombre: "Juan",
                    apellido: "Doe Pérez",
                    email: "juan.doe@example.com",
                    telefono: "0999999999",
                    identificacion: "1234567890",
                    tipoIdentificacion: "CEDULA"
                },
                emailCliente: datosCliente.email
            };

            console.log("📤 Enviando request a backend:", requestData);

            const response = await fetch(PAYMENT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });

            console.log('RESPONSE:', response);

            const mercadoPagoResponse = await response.json();

            console.log("📥 Respuesta de backend:", mercadoPagoResponse.sandboxInitPoint);

            if (mercadoPagoResponse.sandboxInitPoint) {
                localStorage.setItem('preferenceId', mercadoPagoResponse.preferenceId);
                window.location.href = mercadoPagoResponse.sandboxInitPoint;
                console.log('Redirigiendo a:', mercadoPagoResponse.sandboxInitPoint);
            } else {
                setError("No se pudo generar el link de pago");
            }

            const { preferenceId: prefId } = mercadoPagoResponse;

            setPreferenceId(prefId);
            console.log("✅ Preference ID recibido:", prefId);
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

            {preferenceId && CardPaymentComp ? (
                <CardPaymentComp
                    locale="es-PE"
                    initialization={{
                        // Use the real totalCompra so the Brick shows the correct amount
                        amount: Number(totalCompra) || 0,
                        // Some integrations may use preferenceId; include it if available
                        preferenceId: preferenceId
                    }}
                    onSubmit={(cardFormData) => {
                        console.log("enviado:", cardFormData);
                    }}
                />
            ) : preferenceId ? (
                <div className="alert-info">Componente de pago no disponible. Se abrirá el flujo de pago en el servidor.</div>
            ) : null}
        </div>
    );
});

export default CheckoutComponent;
