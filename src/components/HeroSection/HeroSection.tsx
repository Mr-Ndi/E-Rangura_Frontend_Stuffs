import React from 'react';
import './HeroSection.css'

const HeroSection: React.FC = () => {
    return (
        <div className="hero-section">
            <div className="hero">
                <h1>Welcome to Sokoni</h1>
                <p>welcome to Sokoni, B2B model E-market, where we bring you a wide range of essential goods like rice, sugar, and cooking oils directly to your door. Whether you’re looking to stock up on pantry staples or explore new products, we are dedicated to making your shopping experience convenient, affordable, and enjoyable. Shop now to discover great quality products and unbeatable service.</p>
                <button className="hero-button">Shop Now</button>
            </div>

            <div>
            <img src="/flexin.jpg" alt="Highlight" />
            </div>
        </div>
    );
};

export default HeroSection;
