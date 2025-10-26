import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/SidebarProducts";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";
import SeaCollection from "/src/assets/SeaCollectionHover.png";

function SeaCollectionDetail() {
  return (
    <>
      <Header />

      <section className="relative w-full h-[90vh]">
        <img
          src={SeaCollection}
          alt="Sea Collection Banner"
          className="w-full h-full object-cover"
        />
      </section>

      <div className="flex min-h-screen">
        <Sidebar />
        <ProductGrid products={products} />
      </div>

      <Footer />
    </>
  );
}

export default SeaCollectionDetail;
