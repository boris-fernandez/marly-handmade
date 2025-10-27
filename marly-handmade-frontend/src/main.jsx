import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import { AuthProviderWrapper } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { ReclamacionesProvider } from "./contexts/ReclamacionesContext";
import { ProductoProvider } from "./contexts/ProductoContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviderWrapper>
      <ProductoProvider>
        <ReclamacionesProvider>
          <CartProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CartProvider>
        </ReclamacionesProvider>
      </ProductoProvider>
    </AuthProviderWrapper>
  </StrictMode>
);
