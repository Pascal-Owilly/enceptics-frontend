import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../images/heroimg.jpg';
import { getPost } from './BlogService';

const PostComponent = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    let mounted = true
    getPost()
    .then(data => {
      if (mounted){
        setPost(data)
      }
    })
    return () => mounted = false;
  }, []);

  
  return(
<>
    <div className='container-fluid' style={{position: 'relative', backgroundColor:'rgb(18, 187, 18)'}}>
      <div className='row'>
      <h3 className="text-left mt-3 text-center mb-4" style={{color:'#ddd2d2'}}>What our visitors say</h3>
           <div className="col-md-3 col-lg-12 col-sm-12 d-flex" >
                <div className="m-2" style={{ width: '100%', marginLeft: '', color:'#d9d9d9' }}>
                  <div className="row no-gutters" style={{ backgroundColor: '#d9d9g8' }}>
                    <div className="col-md-12">
                      <div
                        src={img}
                        className="card-img"
                        alt="..."
                        style={{ width: '100px', height: '10  0px', margin: 'auto', borderRadius: '10px' }}
                      />
                    </div>
                    <div className="table" >
                      <div className='thead card p-1'  style={{ width: '', backgroundColor: '', border:'none' }}>
                          {post.map((p) => 
                            <div key={p.blog_id} className='tbody' >

                            <div className='tr'>
                              <span style={{ textAlign: 'right', fontSize: '10px' }}>
                                {p.date_posted} | Post by 
                              </span>
                            </div>
                              <div className='tr'>
                              {p.body} <faTrashAlt />
                              </div>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
{/* 
              <div className="col-md-2 " style={{marginLeft:'4rem'}}>
              <h4 style={{color:'#ddd2d2'}}>Top chats</h4> <hr />
              <p>More cool places</p>
              <p>I love Kenya</p>
              <p>The cool waters of Lake Victoria</p>
              <p>I love it all</p>
            </div> */}
            </div>

        </div>
        </div>     
        </div> 
    </>
  )};

export default PostComponent;
