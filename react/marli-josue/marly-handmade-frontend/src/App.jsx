import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OrderCard from "./components/Orders";
import Hero from "./components/Hero";
import img24 from "/src/assets/image24.png";

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Ruta Home */}
        <Route path="/" element={
          <Hero />
        } />

        {/* Ruta Cart */}
        <Route
          path="/cart"
          element={
            <OrderCard
              status="Shipped"
              image={img24}
              title="SAHARA TREASURE"
              subtitle="Necklace"
              price={64}
              quantity={2}
              onAdd={() => console.log("Añadido al carrito")}
              onDelete={() => console.log("Eliminado")}
            />
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
