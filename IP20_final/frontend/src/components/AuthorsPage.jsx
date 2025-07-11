import React, { useState, useEffect } from 'react';
import './AuthorsPage.css';
import Navbar from './NavBar';
const AuthorsPage = () => {
  const [descriptionsVisible, setDescriptionsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDescriptionsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const authors = [
    {
      name: "Danton Dang",
      email: "ddang175@iastate.edu",
      image: "./src/assets/danton.png"
    },
    {
      name: "Hung Doan",
      email: "hd1738@iastate.edu",
      image: "./src/assets/bincut.png"
    }
  ];

  return (
    <div className="authorsPage">
       <nav>
        <Navbar />
      </nav>
      <main>
        <h2 className="required">Construction of User Interfaces, Spring 2025</h2>
        <h1 className="title">Authors</h1>
        <div className="authorContainer">
          {authors.map((author, index) => (
            <div className="author" key={index}>
              <img src="./src/assets/diamondTOPcropped.png" alt="top" className="top" />
              <img src="./src/assets/diamondBOTTOMcropped.png" alt="bottom" className="bottom" />
              <div className="box"></div>
              <img src={author.image} alt={`author-${index+1}`} className="authorImages" />
              <div 
                className="description" 
                style={{ display: descriptionsVisible ? 'block' : 'none' }}
              >
                <div className="name">{author.name}</div>
                <div className="email">{author.email}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AuthorsPage;