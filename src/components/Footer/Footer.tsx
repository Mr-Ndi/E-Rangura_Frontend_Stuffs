import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="company-info">
                    <h3>E_Rangura</h3>
                    <p>Your one-stop shop for all your needs.</p>
                </div>
                <div className="quick-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>FAQs</li>
                    </ul>
                </div>
                <div className="newsletter">
                    <h4>Subscribe to our Newsletter</h4>
                    <input type="email" placeholder="Enter your email" />
                    <button>Subscribe</button>
                </div>
                <div className="social-media">
                    <h4>Follow Us</h4>
                    <span>Facebook</span>
                    <span>Twitter</span>
                    <span>Instagram</span>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
