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
  const [selectedImage, setSelectedImage] = useState(null); // State variable for the selected image
  const [imagePreview, setImagePreview] = useState(null); // State variable for image preview

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const createNewPost = () => {
    const formData = new FormData();
    formData.append('content', newPostContent);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    axios.post('http://127.0.0.1:8000/api/blogposts/', formData)
      .then(response => {
        setPosts([response.data, ...posts]);
        setNewPostContent('');
        setSelectedImage(null);
        setImagePreview(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const formatTimeDifference = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div style={{backgroundColor:'rgb(18, 187, 18)'}}>
    <div className="container" style={{ minHeight: '100vh' }}>
      <h1 className=""> <br /><br /> Travellers Blog</h1>
      <div className="row mt-5">
      {/* <div className="col-md-1"></div> */}
        <div className="col-md-7">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control m-1"
              placeholder="Enter your new post content"
              value={newPostContent}
              onChange={handleNewPostContentChange}
            />

            <input
              type="file"
              accept="image/*"
              className="p-1 m-1"
              onChange={handleImageChange}
            />

            <div className="input-group-append">
              <button className="btn btn-outline-secondary m-1" type="button" onClick={createNewPost}>Post</button>
            </div>
          </div>
          {imagePreview && (
            <div className="mb-3">
              <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%' }} />
            </div>
          )}
          <div className="row">
            {posts.map(post => (
              <div className="col-md-12 mb-3" key={post.id}>
                <div className="card what-card text-white" style={{ backgroundColor: '#121661'}}>
                  <div className="card-header">
                    <img src={natpark} alt="Profile Image" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                    <span>John Doe</span>
                    <p style={{fontSize:'12px', color:'rgb(87, 187, 87)'}} className="mb-0 ms-5">{formatTimeDifference(post.created_at)}</p>
                  </div>
                  <div className="card-body">
                    <p className="card-text ">{post.content}</p>
                  </div>
                  {post.image && (
                    <img src={post.image} alt="vera" className="card-img-top" style={{ width: '100%', objectFit: 'cover' }} />
                  )}

                  <div className="card-footer text-muted">
                    <div className="d-flex justify-content-between">
                      
                      <button onClick={() => deletePost(post.id)} className="btn btn-outline-danger btn-sm"><i className="fa fa-trash"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='col-md-3 text-right'>
          <h3 className='text-center mt-4'>Most talked about destinations</h3>
        </div>
      </div>
    </div>
    </div>
  );
}

export default BlogList;