import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './PostingSection.css';
import ProgressBar from '../ProgressBar/ProgressBar';
import api from '../AuthContext/api';

const PostingSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      description: '',
      price: '',
      stock_quantity: '',
      product: '',
      unit: 'kg',
      minimum_for_deliver: 1
  });

  const [progress, setProgress] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string>('');

  const productOptions = [
      { label: 'Maize Flour', value: 'kuwunga' },
      { label: 'Oil', value: 'oil' },
      { label: 'Soap', value: 'soap' },
      { label: 'Rice', value: 'rice' }
  ];

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token is found
      }
  }, [navigate]);

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

      // Retrieve the access token and decode it to get the user ID
      const token = localStorage.getItem('token');
      
      if (!token) {
          alert('Authentication token is required');
          return; // Exit if no token is found
      }

      let ownerId;
      
      try {
          // Decode the token to extract user information
          const decodedToken: any = jwtDecode(token); // Decode the token
          ownerId = decodedToken.user_id; // Adjust this based on your token structure

          // Prepare the payload for uploading the product
          const payload = {
              name: formData.product,
              description: formData.description,
              price: parseFloat(formData.price),
              stock_quantity: parseInt(formData.stock_quantity, 10),
              unit: formData.unit,
              minimum_for_deliver: formData.minimum_for_deliver,
              owner_id: ownerId // Set owner_id from decoded token
          };

          setIsSubmitting(true);
          setUploadMessage('Uploading your product...');
          setProgress(0);

          // Simulate progress bar for UX
          const intervalId = setInterval(() => {
              setProgress((oldProgress) => {
                  if (oldProgress >= 100) {
                      clearInterval(intervalId);
                      return oldProgress;
                  }
                  return Math.min(oldProgress + Math.random() * 20, 100);
              });
          }, 500);

          // Call the upload function from your API context
          await api.upload(payload); // Ensure this handles authorization internally

          setSubmissionSuccess(true);
          setUploadMessage('Product uploaded successfully!');

          // Reset form data after successful submission
          setFormData({
              description: '',
              price: '',
              stock_quantity: '',
              product: '',
              unit: 'kg',
              minimum_for_deliver: 1
          });

      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while submitting the form');
      } finally {
          setIsComplete(true);
          setIsSubmitting(false);
          setProgress(100); // Finalize progress bar
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
            {submissionSuccess && (
                <div className="success-message">{uploadMessage}</div>)}
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
                          <label htmlFor="unit">Unit</label>
                          <input type="text" id="unit" placeholder="e.g., kg" value={formData.unit} onChange={handleInputChange} required />
                      </div>
                      <div className="input">
                          <label htmlFor="minimum_for_deliver">Minimum for Delivery</label>
                          <input type="number" id="minimum_for_deliver" placeholder="Minimum quantity for delivery" value={formData.minimum_for_deliver} onChange={(e) => handleInputChange(e)} required />
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
