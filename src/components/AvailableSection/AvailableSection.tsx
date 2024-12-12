import React, { useEffect, useState } from 'react';

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


const fetchProducts = async () => {
  try {
    const response = await fetch('https://sokoni-6ocg.onrender.com/api/store/products/');
    
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    
    if (data.message && data.status === '0') {
      setError(data.message); 
      setProducts([]); 
      return; 
    }

    
    setProducts(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message); 
    } else {
      setError('An unknown error occurred'); 
    }
  } finally {
    setLoading(false);
  }
};


  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Available Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock Quantity: {product.stock_quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableSection;
