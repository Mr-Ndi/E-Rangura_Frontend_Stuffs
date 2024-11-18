import React from 'react';
import './Footer.css'; // Ensure this is linked correctly

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer_main">
                <div className="footer_tag">
                    <h2>Location</h2>
                    <p>Kigali</p>
                    {/* <p>Rubavu</p>
                    <p>Musanze</p>
                    <p>Huye</p>
                    <p>Karongi</p> */}
                </div>
                <div className="footer_tag">
                    <h2>Quick Links</h2>
                    <p>Home</p>
                    <p>About</p>
                    {/* <p>Available</p>
                    <p>Order</p>
                    <p>Contact</p> */}
                </div>
                <div className="footer_tag">
                    <h2>Contact</h2>
                    <p>0781789311</p>
                    <p>0734328414</p>
                    <p>sokoni@gmail.com</p>
                </div>
                <div className="footer_tag">
                    <h2>Our Services</h2>
                    <p>Fast Delivery</p>
                    <p>Easy Payments</p>
                    <p>24-Hour Service</p>
                </div>
                <div className="footer_tag">
                    <h2>Follow Us</h2>
                    <div className="social-icons">
                        <i className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-linkedin"></i>
                    </div>
                </div>
            </div>
            {/* <div className="footer_bottom">
                <p className="end">
                    Designed by <span><i className="fa-solid fa-face-grin"></i> SOKONI Designer</span>
                </p>
            </div> */}
        </footer>
    );
};

export default Footer;
