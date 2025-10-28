import Header from "../components/Header";
import Footer from "../components/Footer";
import MostLoved from "../components/MostLoved";
import ProductSelection from "../assets/image42.png";
import SelectAmount from "../components/Amount";
import "../components/Product.css";
import "../components/ProductSelect.css";

import { useState } from "react";

//con este funcion ayuda aabrir y cerra la description
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
                    <p className="Sub-Name-Product">Home / SEA BREEZES</p>
                    <br/>
                    <h2 className="Name-Producto">SEA BREEZES</h2>

                    <p className="product-price">$21</p> 
                    <h2 className="product-variant-name">Invisible Thread</h2> 
                    
                    <div className="amaunt-select">
                        <SelectAmount />
                    </div>

                    <div className="content">
                        <button className="button-add-to-cart">ADD TO CART</button> 
                        <button className="button-buy-now">BUY NOW</button> 
                        <DescriptionItem title="Description">
                        <p id="description"></p>
                        </DescriptionItem>
                        
                        <DescriptionItem title="Product Details">
                        <p id="productDetails"></p>
                        </DescriptionItem>

                        <DescriptionItem title="Jewelry Care">
                        <p></p>
                        </DescriptionItem>

                        <DescriptionItem title="Shipping Info">
                        <p></p>
                        </DescriptionItem>
                    </div>
                </div>
            </section>
      
            <MostLoved />

            <Footer />
        </>
    );
}
