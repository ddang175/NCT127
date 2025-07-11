import React, { useEffect, useState } from "react";
import mercury from "../assets/planets/mercury.png";
import venus from "../assets/planets/venus.png";
import earth from "../assets/planets/earth.png";
import mars from "../assets/planets/mars.png";
import jupiter from "../assets/planets/jupiter.png";
import saturn from "../assets/planets/saturn.png";
import uranus from "../assets/planets/uranus.png";
import neptune from "../assets/planets/neptune.png";
const Planets = () => {
  //List of planets and thier characteristics
  const planets = [
    {
      radius: window.innerWidth * -0.02,
      speed: 0.0055,
      image: mercury,
      size: 4.5,
      transform: -1,
    },
    {
      radius: window.innerWidth * -0.025,
      speed: 0.004,
      image: venus,
      size: 6.5,
      transform: -1,
    },
    {
      radius: window.innerWidth * -0.035,
      speed: 0.002,
      image: earth,
      size: 9,
      transform: 1,
    },
    {
      radius: window.innerWidth * -0.04,
      speed: 0.001,
      image: mars,
      size: 6.5,
      transform: -1,
    },
    {
      radius: window.innerWidth * -0.05,
      speed: 0.0009,
      image: jupiter,
      size: 15,
      transform: -1,
    },
    {
      radius: window.innerWidth * -0.057,
      speed: 0.0006,
      image: saturn,
      size: 11,
      transform: 1,
    },
    {
      radius: window.innerWidth * -0.062,
      speed: 0.0002,
      image: uranus,
      size: 9,
      transform: 1,
    },
    {
      radius: window.innerWidth * -0.067,
      speed: 0.0001,
      image: neptune,
      size: 9,
      transform: 1,
    },
  ];

  //calculate the next angle
  const [angles, setAngles] = useState(
    Array.from(
      { length: planets.length },
      () => (Math.random() * Math.PI) / 2 + Math.PI * 2 * 0.35
    )
  );

  //calculate the circle center
  const circleCenter = [-160, window.innerHeight / 2];

  //move the planet
  useEffect(() => {
    let animateFrame;

    const animate = () => {
      setAngles((prevAngles) =>
        prevAngles.map((angle, idex) => angle + planets[idex].speed)
      );
      animateFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animateFrame);
  }, []);

  return (
    <div>
      {planets.map((planet, idex) => {
        const x = circleCenter[0] / 16 + planet.radius * Math.cos(angles[idex]);
        const y = circleCenter[1] / 16 + planet.radius * Math.sin(angles[idex]);

        return (
          <img
            key={idex}
            src={planet.image}
            alt={`planet-${idex}`}
            style={{
              zIndex: "0",
              pointerEvents: "none",
              position: "absolute",
              left: `${x}rem`,
              top: `${y}rem`,
              width: `${planet.size}rem`,
              height: `${planet.size}rem`,
              transform: `translate(-50%, -50%) scaleX(${planet.transform})`,
            }}
          />
        );
      })}
    </div>
  );
};
export default Planets;
