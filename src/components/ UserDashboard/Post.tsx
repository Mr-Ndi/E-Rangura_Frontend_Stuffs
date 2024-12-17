// Post.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface PostProps {
    post: {
        id: number;
        name: string;
        description: string;
        price: number;
        stock_quantity: number;
    };
    onDelete: (id: number) => void;
    onEdit: (post: any) => void; // Add onEdit prop
}

const Post: React.FC<PostProps> = ({ post, onDelete, onEdit }) => {
    return (
        <div className="post">
            <h3>{post.name}</h3>
            <p>{post.description}</p>
            <p>Price: ${post.price}</p>
            <p>Stock Quantity: {post.stock_quantity}</p>
            <button onClick={() => onEdit(post)}>Edit</button> {/* Call onEdit */}
            <button onClick={() => onDelete(post.id)} className="delete-button">Delete</button>
        </div>
    );
};

export default Post;
