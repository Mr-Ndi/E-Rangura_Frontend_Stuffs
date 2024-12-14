import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AvailableSection.css';
import Minimex from '../../assets/Minimex.jpg';
import Rice from '../../assets/rice.jpg';
import ProgressBar from '../ProgressBar/ProgressBar';
import Sunflower from '../../assets/Sunflower.jpg';
import Barsoap from '../../assets/Barsoap.jpg';

const imageMapping: { [key: string]: string } = {
  'Maize-flow': Minimex,
  'Rice': Rice,
  'oil': Sunflower,
  'soap': Barsoap,
};

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
}

const AvailableSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('Fetching products...');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingMessage('Fetching products...');
        const response = await axios.get('http://127.0.0.1:8000/api/store/products/');
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return oldProgress; 
        }
        return Math.min(oldProgress + Math.random() * 20, 100); 
      });
    }, 500); 

    fetchProducts();

    return () => clearInterval(interval); 
  }, []);

  if (loading || !isComplete) {
    return (
      <div>
        <ProgressBar progress={progress} message={loadingMessage} />
        {isComplete && <div>Data fetching complete!</div>}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Error: {error}
      </div>
    );
  }

  return (
    <div className="available">
      <h2>Available Products</h2>
      <div className="av-box">
        {products.map((product) => (
          <div key={product.id} className="av-card">
            <div className="av_image">
              <img src={imageMapping[product.name] || 'default-image.jpg'} alt={product.name} />
            </div>
            <div className="av_info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock Quantity: {product.stock_quantity}</p>
              <a href="#" className="av-btn">Add to Cart</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableSection;
