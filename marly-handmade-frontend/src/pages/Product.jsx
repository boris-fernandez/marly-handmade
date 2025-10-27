import Header from "../components/Header";
import Footer from "../components/Footer";
import MostLoved from "../components/MostLoved";
import ProductSelection from "../assets/image42.png";
import SelectAmount from "../components/Amount";
import "../components/Product.css";

export default function Product() {
    return (
        <>
            <Header />

            <section>
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

                        <p className="product-detail-accordion">Description</p> 
                        <p className="product-detail-accordion">Product Details</p> 
                        <p className="product-detail-accordion">Jewelry Care</p> 
                        <p className="product-detail-accordion">Shipping Info</p>
                    </div>
                </div>
            </section>

            <MostLoved />

            <Footer />
        </>
    );
}
