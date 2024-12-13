import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AvailableSection.css';

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="available">
      <h2>Available Products</h2>
      <div className="av-box">
        {products.map((product) => (
          <div key={product.id} className="av-card">
            <div className="av_image">
              <img src={`product.name.jpg`} alt={product.name} />
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
