import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import CartPage from "./pages/cart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
