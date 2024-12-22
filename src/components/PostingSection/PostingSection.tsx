import React, { useState } from 'react';
import './PostingSection.css';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useAuth } from '../AuthContext/axiosInstance';

const PostingSection = () => {
  const { token } = useAuth();

  const productOptions = [
    { label: 'Maize Flour', value: 'kuwunga' },
    { label: 'Oil', value: 'oil' },
    { label: 'Soap', value: 'soap' },
    { label: 'Rice', value: 'rice' }
  ];

  const [formData, setFormData] = useState({
    description: '',
    price: '',
    stock_quantity: '',
    product: ''
  });

  const [progress, setProgress] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
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

    setIsSubmitting(true);
    setUploadMessage('Uploading your product...');
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return oldProgress;
        }
        return Math.min(oldProgress + Math.random() * 20, 100);
      });
    }, 500);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/store/upload/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmissionSuccess(true);
        setUploadMessage('Product uploaded successfully!');
        // Reset form data
        setFormData({
          description: '',
          price: '',
          stock_quantity: '',
          product: ''
        });
      } else {
        const errorResponse = await response.json();
        alert(`Error creating product: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form');
    } finally {
      clearInterval(interval);
      setIsComplete(true);
      setIsSubmitting(false);
      setProgress(100);
    }
  };

  return (
    <div className="posting-section" id="Order">
      <h1>
        Post <span>Now</span>
      </h1>

      {isSubmitting && (
        <div>
          <ProgressBar progress={progress} message={uploadMessage} />
          {!isComplete && <div>Submitting your product...</div>}
        </div>
      )}

      {!isSubmitting && (
        <div className="posting-main">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <label htmlFor="product">Product Name</label>
              <select id="product" value={formData.product} onChange={handleInputChange} required>
                <option value="">Select a Product from the following Category</option>
                {productOptions.map((product) => (
                  <option key={product.value} value={product.value}>
                    {product.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="input">
              <label htmlFor="price">Price per unit</label>
              <input type="number" id="price" placeholder="Rwf" value={formData.price} onChange={handleInputChange} required />
            </div>
            <div className="input">
              <label htmlFor="stock_quantity">What is Your Stock Quantity</label>
              <input type="number" id="stock_quantity" placeholder="Kgs" value={formData.stock_quantity} onChange={handleInputChange} required />
            </div>
            <div className="input">
              <label htmlFor="description">Description</label>
              <textarea id="description" placeholder="Product Description like its source, its brand etc." cols={67} rows={5} value={formData.description} onChange={handleTextareaChange} required />
            </div>
            <button type="submit" className="posting-btn">
              Create Product
            </button>
          </form>
        </div>
      )}      
    </div>
  );
};

export default PostingSection;
