import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
<<<<<<< Updated upstream
import { AuthProviderWrapper } from "./contexts/Auth.context.jsx";
=======
import { AuthProviderWrapper } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx"; 
>>>>>>> Stashed changes

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviderWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProviderWrapper>
  </StrictMode>
);
