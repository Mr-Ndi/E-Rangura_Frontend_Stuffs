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
    name: string;
    description: string;
    price: string;
    stock_quantity: string;
    product: string;
  }>({
    name: '',
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

    const data = new FormData(); // Create a new FormData object to send the form data
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock_quantity', formData.stock_quantity);

    try {
      // Make the POST request to the backend
      const response = await fetch('http://127.0.0.1:8000/api/store/upload/', {
        method: 'POST',
        body: data,
      });

      // Handle the response from the backend
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
        Order <span>Now</span>
      </h1>
      <div className="posting-main">
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="name">Product Name</label>
            <input type="text" id="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input">
            <label htmlFor="description">Description</label>
            <textarea id="description" placeholder="Product Description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="input">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="input">
            <label htmlFor="stock_quantity">Stock Quantity</label>
            <input type="number" id="stock_quantity" placeholder="Stock Quantity" value={formData.stock_quantity} onChange={handleChange} required />
          </div>
          <div className="input">
            <label htmlFor="product">Product Category</label>
            <select id="product" value={formData.product} onChange={handleChange} required>
              <option value="">Select a Product Category</option>
              {productOptions.map((product) => (
                <option key={product.value} value={product.value}>
                  {product.label}
                </option>
              ))}
            </select>
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
