import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

interface Post {
    id: number;
    title: string;
    content: string;
}

const UserDashboard: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user/posts/');
                setPosts(response.data);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch posts.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/user/posts/${postId}/`);
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error(error);
            setError('Failed to delete post.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="user-dashboard">
            <h2>Your Posts</h2>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map(post => (
                    <Post key={post.id} post={post} onDelete={handleDelete} />
                ))
            )}
        </div>
    );
};

export default UserDashboard;
