import React from 'react';
import './BookingSection.css'

const Booking = () => {
  return (
    <>
      <div className="order" id="Order">
        <h1>
          Order <span>Now</span>
        </h1>
        <div className="order_main">
          <div className="order_image">
            <img src="../project/buyy.jpg" alt="Product Image" />
          </div>
          <form action="#">
            <div className="input">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your Name" required />
            </div>
            <div className="input">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your Email" required />
            </div>
            <div className="input">
              <label htmlFor="number">Number</label>
              <input type="tel" id="number" placeholder="Your Number" required />
            </div>
            <div className="input">
              <label htmlFor="quantity">How Much</label>
              <input type="number" id="quantity" placeholder="How many Orders" required />
            </div>
            <div className="input">
              <label htmlFor="product">Your Order</label>
              <input type="text" id="product" placeholder="Product Name" required />
            </div>
            <div className="input">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" placeholder="Your Address" required />
            </div>
            <button type="submit" className="order_btn">
              Order Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Booking;
