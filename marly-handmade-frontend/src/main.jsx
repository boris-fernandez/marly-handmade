import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import { AuthProviderWrapper } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { ReclamacionesProvider } from "./contexts/ReclamacionesContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviderWrapper>
      <ReclamacionesProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </ReclamacionesProvider>
    </AuthProviderWrapper>
  </StrictMode>
);
