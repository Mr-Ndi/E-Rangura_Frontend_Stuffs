import React from 'react';
import './BookingSection.css';

const Booking = () => {
  const productOptions = [
    { label: 'Maize-Frour', value: 'kuwunga' },
    { label: 'Oil', value: 'oil' },
    { label: 'Soap', value: 'soap' },
    { label: 'Rice', value: 'rice' }
  ];

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    number: '',
    quantity: '',
    product: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <>

      <div className="order" id="Order">
        <h1>
          Order <span>Now</span>
        </h1>
        <div className="order_main">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="input">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="input">
          <label htmlFor="product">Your Order</label>
            <select id="product" value={formData.product} onChange={handleChange} required>
              <option value="">Select a Product</option>
                {productOptions.map((product) => (
                  <option key={product.value} value={product.value}>
                {product.label}
              </option>
              ))}
            </select>
      </div>
            <div className="input">
              <label htmlFor="number">How much</label>
              <input type="tel" id="number" placeholder="Your Number" value={formData.number} onChange={handleChange} required />
            </div>
            <div className="input">
              <label htmlFor="quantity">How Much</label>
              <input type="number" id="quantity" placeholder="How many Orders" value={formData.quantity} onChange={handleChange} required />
            </div>
            
            <div className="input">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" placeholder="Your Address" value={formData.address} onChange={handleChange} required />
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