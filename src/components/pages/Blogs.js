import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../images/heroimg.jpg';

const PostComponent = () => {
  const [posts, setPosts] = useState([]); // Use an array to store multiple posts

  useEffect(() => {
    let mounted = true;

    // Axios request
    axios.get('http://127.0.0.1:8000/api/blogposts/') // Replace with your API endpoint
      .then(response => {
        if (mounted) {
          setPosts(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });

    return () => (mounted = false);
  }, []);

  return (
    <>
      <div className='container-fluid' style={{ position: 'relative', backgroundColor: 'rgb(18, 187, 18)' }}>
        <div className='row'>
          <h3 className="text-left mt-3 text-center mb-4" style={{ color: '#ddd2d2' }}>What our visitors say</h3>
          <div className="col-md-3 col-lg-12 col-sm-12 d-flex">
            {posts.map((post) => (
              <div key={post.blog_id} className="" style={{ width: '100%', marginLeft: '', color: '#d9d9d9' }}>
                <div className="row no-gutters" style={{ backgroundColor: '#d9d9g8' }}>
                  <div className="col-md-12">
                    <div
                      src={img}
                      className="card-img"
                      alt="..."
                      style={{ width: '100px', height: '10  0px', margin: 'auto', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="table">
                    <div className='thead card p-1' style={{ width: '', backgroundColor: '', border: 'none' }}>
                      <div className='tbody'>
                        <div className='tr'>
                          <span style={{ textAlign: 'right', fontSize: '10px' }}>
                            {post.date_posted} | Post by
                          </span>
                        </div>
                        <div className='tr'>
                          {post.body} <FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostComponent;
