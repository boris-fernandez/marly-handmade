import React from "react";
import "../../styles/MakerSection.css";
import makerImg from "../../assets/Me.png";

export default function MakerSection() {
    return ( 
        <section className="maker-section">
            <div className="maker-container">
                <div className="maker-image-wrapper">
                    <img
                        src={makerImg}
                        alt="Meet the Maker"
                        className="maker-image"
                    />
                </div>

                <div className="maker-content">
                    <h1 className="maker-title">Meet the Maker</h1>

                    <p className="maker-text">
                        Hi, I'm Maryen — the hands and heart behind Marly Handmade. Every
                        piece I create comes from a place of joy, patience, and passion.
                    </p>

                    <p className="maker-text">
                        I started Marly Handmade as a way to connect with others through
                        the art of making. It’s more than a brand — it’s a way of living
                        with meaning and beauty in the everyday.
                    </p>

                    <p className="maker-text">
                        When you support us, you’re not just buying something — you’re
                        joining a slower, more thoughtful way of life. And I'm very
                        grateful you're here.
                    </p>
                </div>
            </div>
        </section>
    );
}

