import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./VerticalCarousel.css";

//this component used in patentView
const VerticalCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false); //used to see if the component is hovereds so it knows when to scroll
  const scrollTimeoutRef = useRef(null);

  const handleScroll = (event) => {
    if (!isHovering) return;

    event.preventDefault();
    if (scrollTimeoutRef.current) return;
    if (event.deltaY > 0 && activeIndex < items.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (event.deltaY < 0 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
    }, 250);
  };
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("wheel", handleScroll);
      }
    };
  }, [activeIndex, isHovering]);

  return (
    <div
      className="vertical-carousel-container"
      ref={carouselRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="carousel-items">
        {items.map((item, index) => {
          const distance = index - activeIndex;
          if (distance > 4 || distance < -2) return null;

  //using framer motion for the scrolling animation
  return (
    <motion.div
      key={index}
      className="carousel-item"
      initial={false}
      animate={{
        y: `${distance * 20}%`,
        scale: 1 - Math.min(Math.abs(distance) * 0.15, 0.6),
        opacity: 1 - Math.min(Math.abs(distance) * 0.5, 0.94),
        zIndex: items.length - Math.abs(distance),
        cursor: distance !== 0 ? 'pointer' : 'default'
      }}
      transition={{
        duration: .3,
        ease: "easeInOut"
      }}
      onClick={() => {
        if (distance !== 0) {
          setActiveIndex(index);
        }
      }}
    >
      {item}
      
    </motion.div>
  );
})}

      </div>

      {/* <div className="carousel-indicators">
        {items.map((_, index) => (
          <div 
            key={index}
            className={`indicator ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default VerticalCarousel;
