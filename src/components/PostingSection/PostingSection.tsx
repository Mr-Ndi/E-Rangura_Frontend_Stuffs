import React from 'react';
import './PostingSection.css';

const PostingSection = () => {
  const productOptions = [
    { label: 'Maize Flour', value: 'kuwunga' },
    { label: 'Oil', value: 'oil' },
    { label: 'Soap', value: 'soap' },
    { label: 'Rice', value: 'rice' }
  ];

  // Define the initial state with explicit types
  const [formData, setFormData] = React.useState<{
    description: string;
    price: string;
    stock_quantity: string;
    product: string;
  }>({
    description: '',
    price: '',
    stock_quantity: '',
    product: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState, // Spread previous state to keep other fields intact
      [id]: value // Update only the changed field
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const payload = {
      name: formData.product,
      description: formData.description,
      price: formData.price,
      stock_quantity: formData.stock_quantity,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/store/upload/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell the server to expect JSON data
        },
        body: JSON.stringify(payload), // Send the data as a JSON string
      });
  
      const result = await response.json();
      console.log('Server Response:', result);
  
      if (response.ok) {
        alert('Product created successfully!');
      } else {
        alert('There was an error creating the product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form');
    }
  };  

  return (
    <div className="posting-section" id="Order">
      <h1>
        Post <span>Now</span>
      </h1>
      <div className="posting-main">
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="product">Product Name</label>
            <select id="product" value={formData.product} onChange={handleChange} required>
              <option value="">Select a Product from the following Category</option>
              {productOptions.map((product) => (
                <option key={product.value} value={product.value}>
                  {product.label}
                </option>
              ))}
            </select>
          </div>
          <div className="input">
            <label htmlFor="price">Price per unity</label>
            <input type="number" id="price" placeholder="Rwf" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="input">
            <label htmlFor="stock_quantity">What is Your Stock Quantity</label>
            <input type="number" id="stock_quantity" placeholder="Kgs" value={formData.stock_quantity} onChange={handleChange} required />
          </div>
          <div className="input">
            <label htmlFor="description">Description</label>
            <textarea id="description" placeholder="Product Description like its source, its brand etc." cols={67} rows={5} value={formData.description} onChange={handleChange} required />
          </div>
          <button type="submit" className="posting-btn">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostingSection;
