// Post.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface PostProps {
    post: {
        id: number;
        title: string;
        content: string;
    };
    onDelete: (id: number) => void;
}

const Post: React.FC<PostProps> = ({ post, onDelete }) => {
    return (
        <div className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <Link to={`/edit-post/${post.id}`} className="edit-button">Edit</Link>
            <button onClick={() => onDelete(post.id)} className="delete-button">Delete</button>
        </div>
    );
};

export default Post;
