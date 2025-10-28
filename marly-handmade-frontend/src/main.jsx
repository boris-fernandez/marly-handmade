import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import { AuthProviderWrapper } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { ReclamacionesProvider } from "./contexts/ReclamacionesContext";
import { ProductoProvider } from "./contexts/ProductoContext";
import { AdminProvider } from "./contexts/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviderWrapper>
      <ProductoProvider>
        <AdminProvider>
          <ReclamacionesProvider>
            <CartProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CartProvider>
          </ReclamacionesProvider>
        </AdminProvider>
      </ProductoProvider>
    </AuthProviderWrapper>
  </StrictMode>
);
