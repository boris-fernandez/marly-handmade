import React from 'react';
// 🚨 1. Importar el componente de pago que creaste
import CheckoutComponent from '../components/Pago/CheckoutComponent'; 
// Importa cualquier hook o contexto que necesites
// import { useCarrito } from '../contexts/CarritoContext'; 

const CheckoutPage = () => {
  // Simulación de datos que el CheckoutComponent necesita
  // Estos datos deberían venir de tu estado global o contexto (useCarrito, etc.)
  const datosSimulados = {
    carrito: [
      { id: 1, nombre: 'Collar de plata', precio: 150.00, cantidad: 2, imagen: '...' },
      { id: 2, nombre: 'Anillo de cuarzo', precio: 80.50, cantidad: 1, imagen: '...' },
    ],
    totalCompra: 380.50, // (150*2) + (80.50*1)
    datosCliente: {
      id: 123,
      nombre: 'Marly',
      apellido: 'Hechoamano',
      email: 'marly@ejemplo.com',
      dni: '12345678',
    }
  };

  return (
    <div className="checkout-page">
      <h2>Pagar y Confirmar Pedido</h2>
      
      {/* 🚨 2. Llamar y pasar los datos necesarios al componente 🚨 */}
      <CheckoutComponent
        carrito={datosSimulados.carrito}
        totalCompra={datosSimulados.totalCompra}
        datosCliente={datosSimulados.datosCliente}
      />
      
      {/* Estilos adicionales si es necesario */}
    </div>
  );
};

export default CheckoutPage;