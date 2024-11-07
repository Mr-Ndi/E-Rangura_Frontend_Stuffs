// FeaturedProducts.tsx
import React from 'react';
import './FeaturedProducts.css';

const FeaturedProducts: React.FC = () => {
    const products = [
        { id: 1, name: "Product 1", price: "$29.99", imageUrl: "path/to/image1.jpg" },
        { id: 2, name: "Product 2", price: "$39.99", imageUrl: "path/to/image2.jpg" },
        // Add more products as needed
    ];

    return (
        <div className="featured-products">
            <h2>Featured Products</h2>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.imageUrl} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;
