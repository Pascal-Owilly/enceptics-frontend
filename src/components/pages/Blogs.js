import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../images/heroimg.jpg';

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [commentFormOpen, setCommentFormOpen] = useState({});
  const [editMode, setEditMode] = useState({});
  const [editedPosts, setEditedPosts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
        [postId]: true,
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

  // const totalPages = Math.ceil(posts.length / itemsPerPage);
  // Calculate the index range of posts to be displayed on the current page
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <div className='container-fluid' style={{position: 'relative', backgroundColor:'rgb(18, 187, 18)'}}>
      <div className='row'>
      <h3 className="text-left mt-3 text-center mb-4" style={{color:'#ddd2d2'}}>What our visitors say</h3>
           <div className="col-md-3 col-lg-12 col-sm-12 d-flex" >
              {currentPosts.map((post) => (
                <Card className="m-2" key={post.id} style={{ width: '100%', marginLeft: '',backgroundColor:'#121661', color:'#d9d9d9' }}>
                  <div className="row no-gutters" style={{ backgroundColor: '#d9d9g8' }}>
                    <div className="col-md-12">
                      <Card.Img
                        src={img}
                        className="card-img"
                        alt="..."
                        style={{ width: '100px', height: '10  0px', margin: 'auto', borderRadius: '10px' }}
                      />
                    </div>
                    <div className="">
                      <Card.Body style={{ width: '', backgroundColor: 'transparent' }}>
                        {!editMode[post.id] ? (
                          <>
                            <Card.Title>{post.title}</Card.Title>
                            {post.body}
                            <div>
                              <FontAwesomeIcon
                                icon={faHeart}
                                className="heart-icon"
                                onClick={() => handleLikeClick(post.id)}
                              />
                              {likes[post.id] || 0}
                            </div>
                              Posted by: User {post.author}
                            
                            <div>
                              <span style={{ textAlign: 'right', fontSize: '10px' }}>
                                {post.created_at}
                              </span>
                              <p onClick={() => handleCommentChange(post.id)}>Add Comment</p>

                              {commentFormOpen[post.id] && (
                                <div>
                                  <input
                                    type="text"
                                    value={comments[post.id] || ''}
                                    onChange={(event) => {
                                      const { value } = event.target;
                                      setComments((prevComments) => ({
                                        ...prevComments,
                                        [post.id]: value,
                                      }));
                                    }}
                                  />
                                  <button onClick={() => handleCommentSubmit(post.id)}>Submit</button>
                                </div>
                              )}

                              {Array.isArray(comments[post.id]) &&
                                comments[post.id].map((comment) => (
                                  <p key={comment.id}>{comment.body}</p>
                                ))}
                            </div>
                            {post.owner === 'current_user' && (
                              <>
                                <button onClick={() => handleDeletePost(post.id)}>
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                                <button onClick={() => handleEditPost(post.id)}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              name="title"
                              value={editedPosts[post.id]?.title || post.title}
                              onChange={(event) => handlePostChange(post.id, event)}
                            />
                            <textarea
                              name="body"
                              value={editedPosts[post.id]?.body || post.body}
                              onChange={(event) => handlePostChange(post.id, event)}
                            ></textarea>
                            <button onClick={() => handleSaveEdit(post.id)}>
                              <FontAwesomeIcon icon={faSave} />
                            </button>
                            <button onClick={() => handleCancelEdit(post.id)}>
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </>
                        )}
                      </Card.Body>
                    </div>
                  </div>
                </Card>
              ))}
                          <div className="col-md-2 " style={{marginLeft:'4rem'}}>
              <h4 style={{color:'#ddd2d2'}}>Top chats</h4> <hr />
              <p>More cool places</p>
              <p>I love Kenya</p>
              <p>The cool waters of Lake Victoria</p>
              <p>I love it all</p>
            </div>
            </div>

        </div>
        </div>      
    </>
  );
};

export default PostComponent;
