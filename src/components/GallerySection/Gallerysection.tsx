import React from 'react';
import './Gallerysection.css'

const GallerySection: React.FC = () => {
  return (
    <div className="gallery-section">
      <h1>Our <span>Gallery</span></h1>
      <div className="gallery">
        <div className="img">
          <a href="/project/1.jfif">
            <img src="1.jfif" alt="Product 1" />
          </a>
        </div>
        <div className="img">
          <a href="/project/2.jpg">
            <img src="2.jpg" alt="Product 2" />
          </a>
        </div>
        <div className="img">
          <a href="/project/3.jpg">
            <img src="3.jpg" alt="Product 3" />
          </a>
        </div>
        <div className="img">
          <a href="/project/4.jpg">
            <img src="4.jpg" alt="Product 4" />
          </a>
        </div>
        <div className="img">
          <a href="/project/5.jpg">
            <img src="5.jpg" alt="Product 5" />
          </a>
        </div>
        <div className="img">
          <a href="/project/6.jpg">
            <img src="6.jpg" alt="Product 6" />
          </a>
        </div>
        <div className="img">
          <a href="/project/7.jfif">
            <img src="7.jfif" alt="Product 7" />
          </a>
        </div>
        <div className="img">
          <a href="/project/8.jpg">
            <img src="8.jpg" alt="Product 8" />
          </a>
        </div>
        <div className="img">
          <a href="/project/9.jpg">
            <img src="9.jpg" alt="Product 9" />
          </a>
        </div>
        <div className="img">
          <a href="/project/10.jfif">
            <img src="10.jfif" alt="Product 10" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
