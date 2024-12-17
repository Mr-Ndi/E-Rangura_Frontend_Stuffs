import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


interface Post {
    id: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
}


interface EditProductProps {
    post?: Post; 
    onClose: () => void; 
    onUpdate: (updatedProduct: Post) => void; 
}

const EditProduct: React.FC<EditProductProps> = ({ onClose, onUpdate }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [stockQuantity, setStockQuantity] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setName(response.data.name);
                setDescription(response.data.description);
                setPrice(response.data.price);
                setStockQuantity(response.data.stock_quantity);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch product.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const updatedProduct = { 
                id: Number(id),
                name,
                description,
                price,
                stock_quantity: stockQuantity
            };

            await axios.put(`http://127.0.0.1:8000/api/products/update/${id}/`, updatedProduct, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            onUpdate(updatedProduct);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setError('Failed to update product.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Product</h2>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Product Name" 
                required 
            />
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Description" 
                required 
            />
            <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(Number(e.target.value))} 
                placeholder="Price" 
                required 
            />
            <input 
                type="number" 
                value={stockQuantity} 
                onChange={(e) => setStockQuantity(Number(e.target.value))} 
                placeholder="Stock Quantity" 
                required 
            />
            <button type="submit">Update Product</button>
        </form>
    );
};

export default EditProduct;
