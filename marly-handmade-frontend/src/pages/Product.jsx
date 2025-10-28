
import Header from "../components/Header";
import Footer from "../components/Footer";
import MostLoved from "../components/MostLoved";
import ProductSelection from "../assets/image42.png";
import SelectAmount from "../components/Amount";
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
    return (
        <>
            <Header />

            <section className="content-Product-Select">
                <div className="Img-Product">
                    <img src={ProductSelection} />
                </div>
                <div className="Content product-details-content"> 
                    <p className="Sub-Name-Product">Home / <p id="NameProduct"></p></p>
                    <br/>
                    <h2 className="Name-Producto" id="NameProduct"></h2>

                    <p className="product-price" id="price"></p> 
                    <h2 className="product-variant-name" id="Category"></h2> 
                    
                    <div className="amaunt-select">
                        <SelectAmount />
                    </div>

                    <div className="content">
                        <button className="button-add-to-cart">ADD TO CART</button> 
                        <button className="button-buy-now">BUY NOW</button> 
                        <DescriptionItem title="Description">
                        <p id="description">cualquier cosa</p>
                        </DescriptionItem>
                        
                        <DescriptionItem title="Product Details">
                        ponga cualquier cosa
                        </DescriptionItem>

                        <DescriptionItem title="Jewelry Care">
                        cualquier cosa lo pongo
                        </DescriptionItem>

                        <DescriptionItem title="Shipping Info">
                        ponga cualquier cosa
                        </DescriptionItem>
                    </div>
                </div>
            </section>
      
            <MostLoved />

            <Footer />
        </>
    );
}