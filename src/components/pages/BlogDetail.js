import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function BlogDetail() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/blogposts/${id}/`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    return (
        <div >
            {post ? (
                <div style={{marginTop:''}}>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <Link to="/blog">Back to Blog List</Link>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default BlogDetail;
