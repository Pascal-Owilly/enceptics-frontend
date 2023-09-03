import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function BlogForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            // Fetch existing post data for editing
            axios.get(`/http://127.0.0.1:8000/api/blogposts/${id}/`)
                .then(response => {
                    setTitle(response.data.title);
                    setContent(response.data.content);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = { title, content };

        if (id) {
            // Update an existing post
            axios.put(`http://127.0.0.1:8000/api/blogposts/${id}/`, postData)
                .then(() => {
                    navigate('/blog'); // Use navigate to navigate after updating
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            // Create a new post
            axios.post('http://127.0.0.1:8000/api/blogposts/', postData)
                .then(() => {
                    navigate('/blog'); // Use navigate to navigate after creating
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <h2 style={{marginTop:''}}>{id ? 'Edit Post' : 'Create Post'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    required
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default BlogForm;
