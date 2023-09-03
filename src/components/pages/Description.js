import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import './Places.css';
import axios from "axios";
import 'semantic-ui-css/semantic.min.css';
import {Dimmer, Loader} from 'semantic-ui-react';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../images/heroimg.jpg';

import kasuku from '../../videos/kasuku.mp4';
import w_img from '../../images/house2.jpg';
import house3 from '../../images/house3.jpg';
import house4 from '../../images/house4.jpg';
import house5 from '../../images/house5.jpg';

const MySection = () => {

  // const PostComponent = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [likes, setLikes] = useState({});
    const [commentFormOpen, setCommentFormOpen] = useState({});
    const [editMode, setEditMode] = useState({});
    const [editedPosts, setEditedPosts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Weather refresh button
      const refresh = () => {
        window.location.reload();
      }
    // End refresh
  
    useEffect(() => {
      fetchPosts();
      fetchComments();
      fetchLikes();
    }, [currentPage]);
  
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/blog-posts/', {
          params: {
            _page: currentPage,
            _limit: itemsPerPage,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/comments');
        const commentsData = {};
  
        response.data.forEach((comment) => {
          if (!commentsData[comment.post]) {
            commentsData[comment.post] = [];
          }
          commentsData[comment.post].push(comment);
        });
  
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    const fetchLikes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/likes');
        const likesData = {};
  
        response.data.forEach((like) => {
          likesData[like.post] = like.count;
        });
  
        setLikes(likesData);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    }; 
  
    const handleCommentChange = (postId) => {
      setCommentFormOpen((prevOpen) => ({
        ...prevOpen,
        [postId]: !prevOpen[postId],
      }));
    };
  
    const handleCommentSubmit = async (postId) => {
      const comment = comments[postId];
  
      try {
        await axios.post(`http://127.0.0.1:8000/api/v1/comments/${postId}`, {
          body: comment,
        });
        // Refresh comments after successful submission
        fetchComments();
      } catch (error) {
        console.error(`Error submitting comment for post ${postId}:`, error);
      }
    };
  
    const handleLikeClick = async (postId) => {
      try {
        await axios.post(`http://127.0.0.1:8000/api/v1/likes/${postId}`);
        setLikes((prevLikes) => ({
          ...prevLikes,
          [postId]: (prevLikes[postId] || 0) + 1,
        }));
      } catch (error) {
        console.error(`Error liking post ${postId}:`, error);
      }
    };
  
    const handleDeletePost = async (postId) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/v1/posts/${postId}`);
        // Refresh posts after successful deletion
        fetchPosts();
      } catch (error) {
        console.error(`Error deleting post ${postId}:`, error);
      }
    };
  
    const handleEditPost = (postId) => {
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [postId]: true,
      }));
    };
  
    const handleSaveEdit = async (postId) => {
      const editedPost = editedPosts[postId];
  
      try {
        await axios.put(`http://127.0.0.1:8000/api/v1/posts/${postId}`, editedPost);
        setEditMode((prevEditMode) => ({
          ...prevEditMode,
          [postId]: false,
        }));
        // Refresh posts after successful update
        fetchPosts();
      } catch (error) {
        console.error(`Error updating post ${postId}:`, error);
      }
    };
  
    const handleCancelEdit = (postId) => {
      setEditedPosts((prevEditedPosts) => ({
        ...prevEditedPosts,
        [postId]: null,
      }));
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [postId]: false,
      }));
    };
  
    const handlePostChange = (postId, event) => {
      const { name, value } = event.target;
      setEditedPosts((prevEditedPosts) => ({
        ...prevEditedPosts,
        [postId]: {
          ...prevEditedPosts[postId],
          [name]: value,
        },
      }));
    };
  
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    // Calculate the index range of posts to be displayed on the current page
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
    // Handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };


       // WEATHER APP

    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [ data, setData ] = useState([]);

    // create useEffect to load and reload the function

    useEffect(() => {
      const fetchData = async () => {
        navigator.geolocation.getCurrentPosition(function(position){
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
        console.log('Latitude is:', lat)
        console.log('Longitude is:', long)
        // creating a function that will get weather from API
  
      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
      };
      fetchData();

      }, [lat, long])
    
    // END WEATHER

  return (
    <>
    <div className='p-3 container-fluid' style={{height:'100vh', backgroundColor:'#121661'}}>
      <div className="places row">    
      <h1 className="text-left mt-5" style={{color:'#d9d9d9'}}>Explore </h1>   
      <hr style={{padding:'', color:'#121661'}} /> 
      <div className='col-md-3 col-lg-3' style={{marginTop:'0'}}>
           <Card className="places-cards" style={{backgroundColor:'#d9d9d9'}}>  
           <video className="" src={kasuku} controls={true}  style={{ width: '100%' }}>
              Your browser does not support the video tag.
            </video>
            <Card.Footer>
            <a href="/booking"> 
            <button className="btn"
            style={{backgroundColor:'#121433', color:'white', padding:'0.4rem', borderRadius:'30px 0 30px 30px', border:'none', width:'100%', fontSize:'16px'}}
            >Book </button>
            </a>
            </Card.Footer>
            </Card>
        </div>  
        <div className='col-md-6 col-lg-6' style={{marginTop:'0'}}>

        </div>  


          <div className='col-md-3 col-lg-3 w-main' style={{marginTop:'0'}}>
            {/* {(typeof data.main != 'undefined') ? ( */}

           
          {data.map((data) => (
               <Card className="places-cards w-card"
               
               style={{
                backgroundImage: `linear-gradient(rgba(18, 22, 97, 0.8), rgba(18, 22, 97, 0.8)), url(${w_img})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'noRepeat',
               }}

               >  
               <p>hgyugi</p>
               <Card.Header>
               <div className="w-top">
                 <h3 className="w-header">{data.name} </h3>
                 <Button className="w-button" inverted color='blue' circular icon='refresh' onClick={refresh} />
                </div>
               </Card.Header>
               <Card.Body>

               <div className="w-flex">
                    <p className='w-day'> moment().format('dddd')</p>
                    <p className='w-day'> moment().format('LL')</p>
                </div>

               <div className="w-flex">
                  <p className="w-temp">Temperature: {data.main.temp} &deg;C</p>
                  <p className="w-temp">Humidity: {data.main.humidiyt} % </p>
                </div>

                <div className="w-flex">
                    <p className="sunrise-sunset">Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                    <p className="sunrise-sunset">Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                </div>
              
                <p>Description: {data.weather[0].description} </p>
                
               </Card.Body>
               <Card.Footer>

               </Card.Footer>
               </Card>
                ))}
                 {/* ) : (
                <div>
                  <Dimmer active>
                    <Loader>Loading...</Loader>
                  </Dimmer>
                </div>
                )} */}

        </div> 




      </div>
    </div>  
    </>
  );
};

export default MySection;