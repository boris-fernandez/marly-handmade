import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItems from "../components/CartItems.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { PedidoContext } from "../contexts/PedidoContext";
import "../styles/Buy.css";
import yape from "../assets/yape.jfif";
import plin from "../assets/plin.jfif";
import CheckoutComponent from "../components/Pago/CheckoutComponent.jsx";

const Buy = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, token } = useContext(AuthContext);
  
  const [paymentMethod, setPaymentMethod] = useState("mercadopago");
  const [buttonState, setButtonState] = useState("idle");
  const [errors, setErrors] = useState({});
  
  const checkoutRef = React.useRef(null);

  // Lógica original para crear pedidos (asumido para Yape/Plin/Transferencia)
  const createMultiplePedidos = async () => {
    if (cartItems.length === 0) return;

    const pedidos = cartItems.map((item) => ({
      detallePedido: [
        {
          cantidad: item.quantity,
          idProducto: item.id,
        },
      ],
    }));

    for (let pedidoBody of pedidos) {
      try {
        const res = await fetch("http://localhost:8080/pedido", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
          body: JSON.stringify(pedidoBody),
        });

        if (!res.ok)
          throw new Error(
            "Error al crear pedido para producto " +
              pedidoBody.detallePedido[0].idProducto
          );

        const data = await res.json();
        console.log("Pedido creado:", data);
      } catch (err) {
        console.error(err);
      }
    }

    clearCart();
  };*/

  const handleMercadoPagoClick = () => {
    if (checkoutRef.current) {
        checkoutRef.current.procesarPago();
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    
    setButtonState("loading");

    if (paymentMethod === "mercadopago") {
        handleMercadoPagoClick();
        setButtonState("idle");
        return;
    } 
    
    if (paymentMethod === "yape" || paymentMethod === "plin") {
        setTimeout(async () => {
            await createMultiplePedidos(); 
            setButtonState("success");
            setTimeout(() => setButtonState("idle"), 2000);
        }, 1000);
    }
  };
  
  const datosParaMP = {
    clienteId: user?.id || null, 
    emailCliente: user?.email || '',
    datosComprador: {
        nombre: user?.firstName || 'Invitado', 
        apellido: user?.lastName || 'Cliente', 
        email: user?.email || 'invitado@temp.com',
        telefono: '999999999', 
        identificacion: '00000000',
        tipoIdentificacion: 'DNI'
    }
  };

  return (
    <>
      <Header />
      <div className="buy-container">
        <div className="main-container">
          <h1 className="page-title">¿Listo para finalizar tu compra?</h1>
          <p className="page-subtitle">
            Revisa tus productos antes de finalizar la compra
          </p>

          <div className="cart-container">
            <div className="cart-items-section">
              <h2 className="section-title">
                <i className="fas fa-shopping-bag"></i> Productos en tu carrito
              </h2>
              <CartItems />
            </div>

            <div className="cart-summary">
              <h2 className="section-title">
                <i className="fas fa-receipt"></i> Resumen del pedido
              </h2>

              <div className="summary-row">
                <span>Subtotal:</span>
                <span>$ {getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Envío:</span>
                <span>$ 10.00</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>$ {(getCartTotal() + 10).toFixed(2)}</span>
              </div>

              <div className="payment-methods">
                <h3 className="payment-title">Métodos de Pago</h3>

                {["mercadopago", "yape", "plin"].map((method) => (
                  <div
                    key={method}
                    className={`payment-method ${
                      paymentMethod === method ? "selected" : ""
                    }`}
                    onClick={() => {
                      setPaymentMethod(method);
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    <div className="payment-info">
                      <div className="payment-brand">
                        {method === "mercadopago"
                          ? "Mercado Pago (Tarjeta, Pago Efectivo, etc.)"
                          : method === "yape"
                          ? "Yape"
                          : "Plin"}
                      </div>
                      <div className="payment-desc">
                        {method === "mercadopago"
                          ? "Recomendado. Pago seguro y automático."
                          : "Billetera Digital"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {paymentMethod === "mercadopago" && (
                <div className="mercadopago-section">
                    <h4 className="form-title"><i className="fas fa-hand-holding-usd"></i> Pago Automático</h4>
                    
                    <CheckoutComponent
                        ref={checkoutRef}
                        carrito={cartItems}
                        totalCompra={getCartTotal() + 10}
                        datosCliente={datosParaMP.datosComprador}
                    />
                    
                    <p style={{marginTop: '10px', fontSize: '0.9em', color: '#666'}}>
                        Serás redirigido a la plataforma de Mercado Pago para completar el pago.
                    </p>
                </div>
              )}

              {(paymentMethod === "yape" || paymentMethod === "plin") && (
                <div className="qr-section">
                  <h4 className="form-title">
                    <i className="fas fa-qrcode"></i> Escanea el código QR
                  </h4>
                  <div className="qr-container">
                    {paymentMethod === "yape" ? (
                      <div className="qr-code">
                        <img src={yape} alt="Código QR Yape" />
                        <p>Escanea con tu app Yape</p>
                      </div>
                    ) : (
                      <div className="qr-code">
                        <img src={plin} alt="Código QR Plin" />
                        <p>Escanea con tu app Plin</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                className={`checkout-btn ${buttonState}`}
                onClick={handleCheckout}
                disabled={buttonState === "loading" || cartItems.length === 0}
              >
                {cartItems.length === 0 ? (
                  <>Carrito vacío</>
                ) : buttonState === "idle" ? (
                  <>
                    <i className="fas fa-lock"></i> Proceder al Pago
                  </>
                ) : buttonState === "loading" ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Procesando...
                  </>
                ) : buttonState === "success" ? (
                  <>
                    <i className="fas fa-check-circle"></i> Pago Exitoso
                  </>
                ) : (
                  <>
                    <i className="fas fa-exclamation-circle"></i> Corrige los
                    errores
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Buy;