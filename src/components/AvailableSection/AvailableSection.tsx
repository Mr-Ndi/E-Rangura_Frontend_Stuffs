import React from 'react';
import './AvailableSection.css'

const ProductCard: React.FC<{
  image: string;
  alt: string;
  title: string;
  description: string;
  price: string;
}> = ({ image, alt, title, description, price }) => {
  return (
    <div className="av-card">
      <div className="av_image">
        <img src={image} alt={alt} />
      </div>
      <div className="av_info">
        <h2>{title}</h2>
        <p>{description}</p>
        <h3>{price}</h3>
        <div className="av_icon">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star-half-stroke"></i>
        </div>
        <a href="#" className="av-btn">Add to cart</a>
      </div>
    </div>
  );
};

const AvailableProducts: React.FC = () => {
  return (
    <section className="available" id="Available">
      <h1>Today's <span>Available</span></h1>
      <div className="av-box">
        {/* List of product cards */}
        <ProductCard 
          image="suga.jpg" 
          alt="Sugar" 
          title="Sugar" 
          description="Pure, refined for sweetening and baking."
          price="$2.00" 
        />
        <ProductCard 
          image="tomato  paste.jpg" 
          alt="Tomato Paste" 
          title="Tomato Paste" 
          description="Rich, adds depth to dishes."
          price="$2.00" 
        />
        <ProductCard 
          image="rice.jpg" 
          alt="Rice" 
          title="Rice" 
          description="High-quality, versatile rice."
          price="$27.00" 
        />
        <ProductCard 
          image="salt.jpg" 
          alt="Salt" 
          title="Salt" 
          description="Fine-grain for flavor enhancement"
          price="$2.00" 
        />
        <ProductCard 
          image="oil.jpg" 
          alt="Oil" 
          title="Oil" 
          description="Pure, healthy cooking oil"
          price="$17.00" 
        />
        <ProductCard 
          image="soap.jpg" 
          alt="Soap" 
          title="Soap" 
          description="Quality, everyday freshness."
          price="$5.00" 
        />
        <ProductCard 
          image="ph.jpg" 
          alt="Clean Ripple" 
          title="Clean Ripple" 
          description="Gentle, effective skin care soap."
          price="$10.00" 
        />
        <ProductCard 
          image="kawunga2.jpg" 
          alt="Maize Flour" 
          title="Maize Flour" 
          description="Fresh, hearty meals"
          price="$37.00" 
        />
      </div>
    </section>
  );
};

export default AvailableProducts;
