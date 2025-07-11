import React, { useEffect } from "react";
import "./SatelliteImage.css";
import satellite from "../assets/satellite.png";

const SatelliteImage = () => {
  useEffect(() => { //random movement for satellite
    const randomTranslateX1 = Math.random() * 20 - 10;
    const randomTranslateY1 = Math.random() * 10 - 5;
    const randomRotate1 = Math.random() * 90 - 30;
    const randomScale1 = 1 + Math.random() * 0.1;

    const randomTranslateX2 = Math.random() * 20 - 10;
    const randomTranslateY2 = Math.random() * 10 - 5;
    const randomRotate2 = Math.random() * 90 - 30;
    const randomScale2 = 1 + Math.random() * 0.1;

    const randomTranslateX3 = Math.random() * 20 - 10;
    const randomTranslateY3 = Math.random() * 10 - 5;
    const randomRotate3 = Math.random() * 90 - 30;
    const randomScale3 = 1 + Math.random() * 0.1;

    const keyframes = `
      @keyframes float {
        0% { transform: translate(${randomTranslateX1}%, ${randomTranslateY1}%) rotate(${randomRotate1}deg) scale(${randomScale1}); }
        50% { transform: translate(${randomTranslateX2}%, ${randomTranslateY2}%) rotate(${randomRotate2}deg) scale(${randomScale2}); }
        100% { transform: translate(${randomTranslateX3}%, ${randomTranslateY3}%) rotate(${randomRotate3}deg) scale(${randomScale3}); }
      }
    `;

    const styleTag = document.createElement("style");
    styleTag.innerHTML = keyframes;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return <img src={satellite} alt="Satellite" className="satelliteImage" />;
};

export default SatelliteImage;
