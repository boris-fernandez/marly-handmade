import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderCard from "../components/Orders";
import img24 from "/src/assets/image24.png";

export default function Cart() {
  return (
    <>
      <Header />

      <main style={{ backgroundColor: "#EBEBEB", minHeight: "100vh", padding: "2rem" }}>
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
      </main>

      <Footer />
    </>
  );
}
