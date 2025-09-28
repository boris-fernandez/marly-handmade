import React from "react";
import styles from "./Hero.module.css";
import heroImg from "../assets/hero.png"; // cambia por tu imagen

const Hero: React.FC = () => {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${heroImg})` }}>
      <div className={styles.overlay}>
        <h1>NEW COLLECTION</h1>
        <p>Jewelry with a sea soul. Art you carry with you</p>
        <button>Buy now</button>
      </div>
    </section>
  );
};

export default Hero;
