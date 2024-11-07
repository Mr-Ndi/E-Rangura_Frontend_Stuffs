// src/components/Navbar/Navbar.tsx
import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="logo">E-Rangura</div>
            <ul className="nav-links">
                <li>Home</li>
                <li>Shop</li>
                <li>About Us</li>
                <li>Contact</li>
            </ul>
            <div className="search-bar">
                <input type="text" placeholder="Search products..." />
            </div>
            <div className="icons">
                <span className="wishlist-icon">❤️</span>
                <span className="cart-icon">🛒 (0)</span>
                <span className="user-icon">👤</span>
            </div>
        </nav>
    );
};

export default Navbar;
