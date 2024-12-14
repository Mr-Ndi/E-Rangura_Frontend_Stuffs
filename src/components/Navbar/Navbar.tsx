import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

interface NavbarProps {
    setSearchQuery: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSearchQuery }) => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="E-Rangura Logo" className='nav-bar-logo' />
                </Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/available">Available</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/upload">Upload</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search products..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="icons">
                <Link to="/">
                    <span className="wishlist-icon">❤️</span>
                </Link>
                <Link to="/cart">
                    <span className="cart-icon">🛒 (0)</span>
                </Link>
                <Link to="/login">
                    <span className="user-icon">👤</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
