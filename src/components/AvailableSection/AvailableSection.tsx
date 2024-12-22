import React, { useEffect, useState } from 'react';
import './AvailableSection.css';
import Minimex from '../../assets/Minimex.jpg';
import Rice from '../../assets/rice.jpg';
import ProgressBar from '../ProgressBar/ProgressBar';
import Sunflower from '../../assets/Sunflower.jpg';
import Barsoap from '../../assets/Barsoap.jpg';
import api from '../AuthContext/api';

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

interface AvailableSectionProps {
    searchQuery: string;
}

const AvailableSection: React.FC<AvailableSectionProps> = ({ searchQuery }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('Fetching products...');

    useEffect(() => {
        const fetchProducts = async () => {
            let intervalId: ReturnType<typeof setInterval> | undefined;

            try {
                setLoadingMessage('Fetching products...');
                // Using the singleProduct function from the API but without parameters
                // to get all products
                const response = await api.singleProduct({ name: '' });
                // Since singleProduct returns ProductDetails, we need to ensure it matches
                // the Product interface or transform the data
                const transformedProducts: Product[] = Array.isArray(response) ? 
                    response.map(item => ({
                        id: item.owner_id, // Using owner_id as id since it's available
                        name: item.name,
                        description: item.description,
                        price: item.price.toString(),
                        stock_quantity: item.stock_quantity
                    })) : [];
                setProducts(transformedProducts);
                console.log(transformedProducts);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
                if (intervalId) clearInterval(intervalId);
            }
        };

        const intervalId = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(intervalId);
                    setIsComplete(true);
                    return oldProgress;
                }
                return Math.min(oldProgress + Math.random() * 20, 100);
            });
        }, 500);

        fetchProducts();

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
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