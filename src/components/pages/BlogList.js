import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import natpark from '../../images/natpark.jpg';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/blogposts/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const deletePost = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/blogposts/${id}/`)
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleNewPostContentChange = (event) => {
    setNewPostContent(event.target.value);
  };

  const createNewPost = () => {
    axios.post('http://127.0.0.1:8000/api/blogposts/', {
      content: newPostContent,
    })
      .then(response => {
        setPosts([response.data, ...posts]);
        setNewPostContent('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const formatTimeDifference = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div className="container" style={{ minHeight: '100vh' }}>
      <h1 className=""> <br/><br /> Travellers Blog</h1>
      <div className="row mt-5">
        <div className="col-md-7">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your new post content"
              value={newPostContent}
              onChange={handleNewPostContentChange}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={createNewPost}>Create</button>
            </div>
          </div>
          <div className="row">
            {posts.map(post => (
              <div className="col-md-12 mb-3" key={post.id}>
                <div className="card">
                  {post.image && ( // Conditionally render the image field if the post has an image
                    <img src={post.image} alt="vera" className="card-img-top" style={{ width: '100%', objectFit: 'cover' }} />
                  )}
                  <div className="card-body">
                    <p className="card-text">{post.content}</p>
                  </div>
                  <div className="card-footer text-muted">
                    <div className="d-flex justify-content-between">
                      <p className="mb-0">{formatTimeDifference(post.created_at)}</p>
                      <button onClick={() => deletePost(post.id)} className="btn btn-outline-danger btn-sm"><i className="fa fa-trash"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='col-md-5'>
          <h3 className='text-center mt-4'>Most talked about destinations</h3>
        </div>
      </div>
    </div>
  );
}

export default BlogList;
