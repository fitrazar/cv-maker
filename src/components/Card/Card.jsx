import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router";

const Card = ({ image, title, description, link }) => {
  const cardRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      setSize({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });
    }
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left - size.width / 2,
      y: e.clientY - rect.top - size.height / 2,
    });
  };

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
    startLoveRain();
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
    stopLoveRain();
  };

  const startLoveRain = () => {
    intervalRef.current = setInterval(() => {
      const love = document.createElement("div");
      love.className = "love";
      love.innerText = "💖";
      love.style.left = Math.random() * 100 + "%";
      love.style.animationDuration = 2 + Math.random() * 2 + "s";
      cardRef?.current?.appendChild(love);

      setTimeout(() => {
        love.remove();
      }, 4000);
    }, 200);
  };

  const stopLoveRain = () => {
    clearInterval(intervalRef.current);
  };

  const mousePX = mouse.x / size.width;
  const mousePY = mouse.y / size.height;
  const rotateY = mousePX * 30;
  const rotateX = mousePY * -30;
  const translateX = mousePX * -40;
  const translateY = mousePY * -40;

  return (
    <div
      className="card-wrap"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      <Link
        to={link}
        className="card shadow-lg"
        style={{
          transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
        }}
      >
        <div
          className="card-bg"
          style={{
            backgroundImage: `url(${image})`,
            transform: `translateX(${translateX}px) translateY(${translateY}px)`,
          }}
        ></div>
        <div className="card-info">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
