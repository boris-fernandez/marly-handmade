import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/OurStory.css";
import AOS from "aos";
import "aos/dist/aos.css";

import AboutMarlysWorldSection from "../components/our-story/AboutMarlysWorldSection";
import HeroSection from "../components/our-story/HeroSection";
import MakerSection from "../components/our-story/MakerSection";
import ThankYouSection from "../components/our-story/ThankYouSection";
import MostLoved from "../components/MostLoved";

import workshopImg from "../assets/MeetMarly.png";

const OurStory = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en ms
      once: true, // Anima solo una vez
      easing: "ease-in-out", // Suavidad del movimiento
      offset: 100, // Distancia en px antes de que empiece la animación
    });
  }, []);

  return (
    <div className="ourstory">
      <Header />

        {/* Hero Section */}
        <HeroSection workshopImg={workshopImg} data-aos="fade-up" />

        {/* About Section */}
        <div data-aos="fade-up">
          <AboutMarlysWorldSection />
        </div>

        {/* Maker Section */}
        <div data-aos="fade-left">
          <MakerSection />
        </div>

        {/* Thank You Message */}
        <div data-aos="fade-right">
          <ThankYouSection />
        </div>

        {/* Favorites Section */}
        <div style={{ margin: '70px 0' }} data-aos="fade-up">
          <MostLoved />
        </div>
      
      <Footer />
    </div>
  );
};

export default OurStory;