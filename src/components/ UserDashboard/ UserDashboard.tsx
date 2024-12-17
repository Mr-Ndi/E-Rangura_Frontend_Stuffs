import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import Modal from 'react-modal';
import EditProduct from './EditProduct';

interface Post {
    id: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
}

const UserDashboard: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/my-products/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/products/delete/${postId}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error(error);
            setError('Failed to delete product.');
        }
    };

   
    const openEditModal = (post: Post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

   
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="user-dashboard">
            <h2>Your Products</h2>
            {posts.length === 0 ? (
                <p>No products available.</p>
            ) : (
                posts.map(post => (
                    <Post key={post.id} post={post} onDelete={handleDelete} onEdit={openEditModal} />
                ))
            )}

            {/* Modal for Editing Product */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                <h2>Edit Product</h2>
                {selectedPost && (
                    <EditProduct 
                        post={selectedPost} 
                        onClose={closeModal} 
                        onUpdate={(updatedProduct) => {
                           
                            setPosts(posts.map(p => p.id === updatedProduct.id ? updatedProduct : p));
                            closeModal();
                        }} 
                    />
                )}
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};

export default UserDashboard;
