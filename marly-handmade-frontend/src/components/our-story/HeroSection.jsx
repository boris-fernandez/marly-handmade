import React from "react";

export default function HeroSection({ workshopImg }) {
  return (
    <section className="hero-section">
      <div className="hero-image-container" style={{ position: "relative" }}>
        <img
          src={workshopImg}
          alt="Marly's Workshop"
          className="hero-image"
        />
<a
  href="https://www.youtube.com/watch?v=LEeoLGUXQ8Y"
  target="_blank"
  rel="noopener noreferrer"
  className="meet-marly-btn"
>
  ▶ MEET MARLY
</a>

      </div>
    </section>
  );
}
