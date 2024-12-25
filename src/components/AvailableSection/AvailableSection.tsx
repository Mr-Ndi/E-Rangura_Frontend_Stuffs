import React, { useEffect, useState } from 'react';
import './AvailableSection.css';
import Minimex from '../../assets/Minimex.jpg';
import Rice from '../../assets/Rice.jpg';
import ProgressBar from '../ProgressBar/ProgressBar';
import Sunflower from '../../assets/Sunflower.jpg';
import Barsoap from '../../assets/Barsoap.jpg';
import api from '../AuthContext/api';

const imageMapping: { [key: string]: string } = {
    'Maize-flow': Minimex,
    'Rice': Rice,
    'rice': Rice,
    'oil': Sunflower,
    'Soap': Barsoap,
};

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock_quantity: number;
}

interface AvailableSectionProps {
    searchQuery: string;
}

interface ProductResponse {
    message: string;
    products: Array<{
        product_id: number;
        name: string;
        price: number;
        stock_quantity: number;
        unit: string;
        minimum_for_deliver: number;
        description: string;
        owner_id: number;
        created_at: string;
    }>;
}

const AvailableSection: React.FC<AvailableSectionProps> = ({ searchQuery }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [isComplete, setIsComplete] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Use ProductResponse to type the response
                const response: ProductResponse = await api.singleProduct({ message: '' });
                
                const transformedProducts: Product[] = response.products.map((item) => ({
                    id: item.product_id,
                    name: item.name,
                    description: item.description,
                    price: item.price.toString(),
                    stock_quantity: item.stock_quantity
                }));
                
                setProducts(transformedProducts);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
                setIsComplete(true); // Set isComplete to true when loading is finished
            }
        };

        const intervalId = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(intervalId);
                    return oldProgress;
                }
                return Math.min(oldProgress + Math.random() * 20, 100);
            });
        }, 500);

        fetchProducts();

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    if (loading) {
        return (
            <div>
                <ProgressBar progress={progress} message="Fetching products..." />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Use isComplete to show a message after loading is complete
    if (isComplete) {
        console.log("Products loaded successfully!"); // You can replace this with any UI feedback if needed
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="available">
            <h2>Available Products</h2>
            <div className="av-box">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="av-card">
                        <div className="av_image">
                            <img src={imageMapping[product.name] || 'default-image.jpg'} alt={product.name} />
                        </div>
                        <div className="av_info">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Price: {product.price} Rwf</p>
                            <p>Stock Quantity: {product.stock_quantity}</p>
                            <a href="#" className="av-btn">Add to Cart</a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Optional feedback for completion */}
            {isComplete && !loading && !error && (
                <div className="completion-message">All products have been loaded successfully!</div>
            )}
        </div>
    );
};

export default AvailableSection;
