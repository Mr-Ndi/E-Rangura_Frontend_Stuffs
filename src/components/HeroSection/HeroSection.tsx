import React from 'react';
import './HeroSection.css';

const HeroSection: React.FC = () => {
    return (
        <div className="hero">
            <h1>Welcome to E_Rangura</h1>
            <p>Your one-stop shop for all your needs.</p>
            <button className="hero-button">Shop Now</button>
        </div>
    );
};

export default HeroSection;
