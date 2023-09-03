import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import natpark from '../../images/natpark.jpg';
import placeholderImage1 from '../../images/house1.jpg';
import placeholderImage2 from '../../images/house2.jpg';
import placeholderImage3 from '../../images/house3.jpg';
// import Slider from 'react-slick'; 
import { Carousel } from 'react-bootstrap';



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
      <h1 className="" style={{fontFamily:'cursive'}}> <br /><br /> Travellers Blog</h1>
      <div className="row mt-5">
      {/* <div className="col-md-1"></div> */}
        <div className="col-md-7">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control m-1"
              placeholder="Share your experience ..."
              value={newPostContent}
              onChange={handleNewPostContentChange}
              style =  {{backgroundColor:'#d9d9d9', border:'none', borderRadius:'10px 0 10px 0'}}
            />

            <input
              type="file"
              accept="image/*"
              className="p-1 m-1"
              onChange={handleImageChange}
              style =  {{ borderRadius:'10px 0 10px 0'}}
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
                <div className="card what-card text-white" style={{ backgroundColor: '#121661', borderRadius:'10px 0 10px 0'}}>
                  <div className="card-header">
                    <img src={natpark} alt="Profile Image" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                    <span className='text-success' style={{fontWeight:'bolder'}}>John Doe</span>  &nbsp;                  
                      <button className="btn btn-outline-success btn-sm ms-2"><i className="fa fa-user-plus"></i> Follow</button>
                    <p style={{fontSize:'12px', color:'rgb(87,187, 87)', fontWeight:'bold'}} className="mb-0 ms-5">{formatTimeDifference(post.created_at)}</p>
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
                      <div>
                        <button className="btn btn-outline-primary btn-sm me-2"><i className="fa fa-thumbs-up"></i> Like</button>
                        <button className="btn btn-outline-secondary btn-sm"><i className="fa fa-comment"></i> Comment</button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='col-md-4 text-right'>
  <h4 className='text-center mt-5' style={{fontFamily:'cursive', fontWeight:'bold'}}>Top chats</h4>
 
          <Carousel className="fixed-carousel mt-3 ms-4"

          style={{
            height:'150px',
            outline:'1px solid #198754',
            padding:'1.2rem',
            borderRadius:'0 20px 0 0',
            
          }}
          
          >
            <Carousel.Item>
            <img src={natpark} alt="Profile Image" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
            <span className='text-success' style={{fontWeight:'bolder'}}>Veronica Ouma</span>
            <p className='ms-5'>I once tried biolminiscence it's amazing</p>
            </Carousel.Item>
            <Carousel.Item>
              <div className="mb-3">
              <img src={natpark} alt="Profile Image" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
            <span className='text-success' style={{fontWeight:'bolder'}}>Pascal Owilly</span>
            <p className='ms-5'>I have walked around the world but I have never seen a plce like Salar de Uyuni</p>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="mb-3">
              <img src={natpark} alt="Profile Image" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
            <span className='text-success' style={{fontWeight:'bolder'}}>Leon Okoo</span>
            <p className='ms-5'>Enceptics is amazing from start to finish</p>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
    </div>

  );
}

export default BlogList;
