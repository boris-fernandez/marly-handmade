import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Buy.css";

const Buy = () => {
  useEffect(() => {
    // ✅ Cargar la lógica externa sólo después de montar el componente
    const script = document.createElement("script");
    script.src = "scripts/cartLogic.js"; // guarda tu código grande aquí
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Limpieza: eliminar script si el componente se desmonta
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="buy-container">
      <Header />

      <div className="main-container">
        <h1 className="page-title">Tu Carrito de Compras</h1>
        <p className="page-subtitle">Revisa tus productos antes de finalizar la compra</p>

        <div className="cart-container">
          <div className="cart-items-section">
            <h2 className="section-title">
              <i className="fas fa-shopping-bag"></i> Productos en tu carrito
            </h2>
            <div id="cart-items-container">
              <div className="empty-cart">
                <i className="fas fa-shopping-cart"></i>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega algunos productos increíbles para comenzar</p>
                <a href="../PRODUCTOS/productos.html" className="continue-shopping-btn">
                  Continuar Comprando
                </a>
              </div>
            </div>
          </div>

          <div className="cart-summary">
            <h2 className="section-title">
              <i className="fas fa-receipt"></i> Resumen del pedido
            </h2>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span id="subtotal">S/ 0.00</span>
            </div>
            <div className="summary-row">
              <span>Envío:</span>
              <span id="shipping">Gratis</span>
            </div>
            <div className="summary-row">
              <span>Total:</span>
              <span id="total">S/ 0.00</span>
            </div>

            <div className="payment-methods">
              <h3 style={{ color: "#040F2F", marginBottom: "20px", fontSize: "1.1rem", fontWeight: "600" }}>
                Métodos de Pago
              </h3>

              <div
                className="payment-method selected"
                onClick={(e) => window.selectPaymentMethod(e.currentTarget, "card")}
              >
                <input type="radio" name="payment" value="card" defaultChecked />
                <div className="payment-info">
                  <div className="payment-brand">Tarjeta de Crédito/Débito</div>
                  <div className="payment-desc">Visa, MasterCard, American Express</div>
                </div>
              </div>

              <div
                className="payment-method"
                onClick={(e) => window.selectPaymentMethod(e.currentTarget, "digital")}
              >
                <input type="radio" name="payment" value="yape" />
                <div className="payment-info">
                  <div className="payment-brand">Yape</div>
                  <div className="payment-desc">Billetera Digital</div>
                </div>
              </div>

              <div
                className="payment-method"
                onClick={(e) => window.selectPaymentMethod(e.currentTarget, "digital")}
              >
                <input type="radio" name="payment" value="plin" />
                <div className="payment-info">
                  <div className="payment-brand">Plin</div>
                  <div className="payment-desc">Billetera Digital</div>
                </div>
              </div>
            </div>

            <div id="card-form" className="card-form">
              <h4 className="form-title">
                <i className="fas fa-credit-card"></i> Información de la Tarjeta
              </h4>

              <div className="form-group">
                <label htmlFor="card-number">Número de Tarjeta</label>
                <input type="text" id="card-number" placeholder="1234 5678 9012 3456" maxLength="19" />
                <div className="card-icons">
                  <i className="fab fa-cc-visa"></i>
                  <i className="fab fa-cc-mastercard"></i>
                  <i className="fab fa-cc-amex"></i>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="card-expiry">Fecha de Vencimiento</label>
                  <input type="text" id="card-expiry" placeholder="MM/AA" maxLength="5" />
                </div>
                <div className="form-group">
                  <label htmlFor="card-cvv">CVV</label>
                  <input type="text" id="card-cvv" placeholder="123" maxLength="4" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="card-name">Nombre del Titular</label>
                <input
                  type="text"
                  id="card-name"
                  placeholder="Nombre como aparece en la tarjeta"
                  maxLength="50"
                />
              </div>
            </div>

            <div id="qr-section" className="qr-section hidden">
              <h4 className="form-title">
                <i className="fas fa-qrcode"></i> Escanea el código QR
              </h4>

              <div className="qr-container">
                <div id="yape-qr" className="qr-code hidden">
                  <img src="../PAGOS/QR/yape.jfif" alt="Código QR Yape" />
                  <p>Escanea con tu app Yape</p>
                </div>

                <div id="plin-qr" className="qr-code hidden">
                  <img src="../PAGOS/QR/plin.jfif" alt="Código QR Plin" />
                  <p>Escanea con tu app Plin</p>
                </div>
              </div>
            </div>

            <button
              className="checkout-btn"
              id="checkout-btn"
              onClick={() => window.processPayment()}
            >
              <i className="fas fa-lock"></i> Proceder al Pago
            </button>
          </div>
        </div>
      </div>

      <div id="toast" className="toast hidden">
        <span id="toast-message"></span>
      </div>

      <Footer />
    </div>
  );
};

export default Buy;
