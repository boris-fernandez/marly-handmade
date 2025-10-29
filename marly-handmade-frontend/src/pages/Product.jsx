import { useParams } from "react-router-dom";
import { useProductos } from "../contexts/ProductoContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MostLoved from "../components/MostLoved";
import SelectAmount from "../components/Amount";
import { useEffect, useState } from "react";
import "../components/Product.css";
import "../components/ProductSelect.css";

import { useState } from "react";

//con este funcion ayuda aabrir y cerra la description osea del + y menos
function DescriptionItem({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion-item">
      <p
        className="product-detail-accordion"
        onClick={() => setOpen(!open)}
      >
        {title}
        <span><strong>{open ? "-" : "+"}</strong></span>
      </p>
      {open && <div className="accordion-content">{children}</div>}
    </div>
  );
}

export default function Product() {
  const { slug } = useParams();
  const { productos, listarProductos } = useProductos();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      // buscar por slug
      const found = productos.find((p) => p.slug === slug);
      if (found) {
        setProducto(found);
        return;
      }

      // fallback si entra directo
      try {
        const res = await fetch("http://localhost:8080/producto/all");
        const data = await res.json();
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.nombre,
          price: item.precio,
          img: item.fotoPrincipal,
          stock: item.stock,
          category: item.categoria,
          slug: item.nombre
        .replace(/\s+/g, " ")
        .trim()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .split(" ")
        .map(
            (word) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(""),
        }));

        const match = formatted.find((p) => p.slug === slug);
        setProducto(match || null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducto();
  }, [slug, productos]);

  if (!producto)
    return <p className="text-center mt-10">Cargando producto...</p>;

    return (
    <>
      <Header />

      <section className="productSection">
        <div className="Img-Product">
          <img src={producto.img} alt={producto.name} />
        </div>

        <div className="Content product-details-content">
          <p className="Sub-Name-Product">
            Home / <span>{producto.category}</span>
          </p>

          <h2 className="Name-Producto">{producto.name}</h2>
          <p className="product-price">${producto.price}</p>
          <h2 className="product-variant-name">Stock: {producto.stock}</h2>

          <div className="amaunt-select">
            <SelectAmount />
          </div>

          <div className="content">
            <button className="button-add-to-cart">ADD TO CART</button>
            <button className="button-buy-now">BUY NOW</button>

            {/* Aquí usamos los nuevos componentes de developer */}
            <DescriptionItem title="Description">
              <p>{producto.description || "No hay descripción disponible."}</p>
            </DescriptionItem>

            <DescriptionItem title="Product Details">
              <p>Detalles técnicos del producto.</p>
            </DescriptionItem>

            <DescriptionItem title="Jewelry Care">
              <p>Recomendaciones para el cuidado del producto.</p>
            </DescriptionItem>

            <DescriptionItem title="Shipping Info">
              <p>Información de envío y tiempos de entrega.</p>
            </DescriptionItem>
          </div>
        </div>
      </section>

      <MostLoved />
      <Footer />
    </>
  );
}

