import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="logo"><img src={logo} alt="E-Rangura Logo" className='nav-bar-logo' /></div>
            <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
                <li><Link to="/available">Available</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
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
