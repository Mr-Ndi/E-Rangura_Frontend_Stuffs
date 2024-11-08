import React from 'react';
import './PromoBanner.css';

const PromoBanner: React.FC = () => {
    return (
        <div className="promo-banner">
            <h2>Spring Sale! Up to 50% Off!</h2>
            <button className="promo-button">Shop Sale</button>
        </div>
    );
};

export default PromoBanner;
