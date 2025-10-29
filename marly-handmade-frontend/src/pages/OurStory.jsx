import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConditionsComponet from "../components/ConditionsComponet";

function OurStory() {
  let sections = [
    [
      "MARLY handmade was founded in 2020 with a passion for unique, high-quality jewelry.",
      "Our mission is to bring artisanal craftsmanship and creativity to every piece, from delicate pearls to elegant pendants.",
      "Each piece is carefully designed to tell a story and connect with our customers."
    ],
    [
      "We work closely with skilled artisans to ensure that every item reflects our commitment to quality and beauty.",
      "Materials are carefully selected, combining classic elegance with modern design trends."
    ],
    [
      "Over the years, MARLY has grown into a brand known for attention to detail and personalized customer experience.",
      "We believe jewelry should not only adorn but also inspire, celebrating life's special moments."
    ],
    [
      "Sustainability and ethical practices are core to our process, from sourcing materials to packaging.",
      "We aim to reduce waste and ensure that our products are made responsibly."
    ]
  ];

  return (
    <>
      <Header />
      <h2 className="text-2xl xs:text-3xl font-bold mb-8 whitespace-nowrap text-center mt-15">
        OUR STORY
      </h2>
      <div className="my-20 mx-auto w-[60%] font-serif">
        <p className="mb-8">
          At MARLY handmade, every piece of jewelry has a story. From humble beginnings to a recognized artisanal brand, our journey is inspired by passion, creativity, and dedication to craftsmanship.
        </p>
        <ConditionsComponet titulo="The Beginning" subtitulos={sections[0]} />
        <ConditionsComponet titulo="Craftsmanship and Materials" subtitulos={sections[1]} />
        <ConditionsComponet titulo="Growth and Vision" subtitulos={sections[2]} />
        <ConditionsComponet titulo="Sustainability and Ethics" subtitulos={sections[3]} />
      </div>
      <Footer />
    </>
  );
}

export default OurStory;
