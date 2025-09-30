import React, { useState } from "react";
import videoThumbnail from "../assets/MeetMarly.png";

export default function MeetTheMaker() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "LEeoLGUXQ8Y";

  console.log("Thumbnail:", videoThumbnail); 

  return (
    <section className="px-6 py-16 bg-gray-50 my-20">
      <h2 className="text-3xl font-bold text-center mb-10">Meet the Maker</h2>

      <div className="flex justify-center">
        <div className="w-full max-w-3xl h-[400px] rounded-xl overflow-hidden shadow-lg relative">
          {isPlaying ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Meet the Maker"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={() => setIsPlaying(true)}
              role="button"
              aria-label="Play Meet the Maker video"
            >
              <img
                src={videoThumbnail}
                alt="Meet the Maker thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-10 transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-20 h-20 drop-shadow-lg"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
