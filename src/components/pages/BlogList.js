import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import natpark from '../../images/natpark.jpg';
import placeholderImage1 from '../../images/house1.jpg';
import placeholderImage2 from '../../images/house2.jpg';
import placeholderImage3 from '../../images/house3.jpg';
import { Carousel } from 'react-bootstrap';
import Cookies from 'js-cookie';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [profilePics, setProfilePics] = useState({});
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const authToken = Cookies.get('authToken');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showComments, setShowComments] = useState({});
  const [commentText, setCommentText] = useState('');
  const [likes, setLikes] = useState({});

  useEffect(() => {
    if (authToken) {
      // Fetch user data
      axios
        .get(`http://127.0.0.1:8000/api/auth/user/`, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);

          // Fetch user's profile including profile pic
          axios
            .get(`http://127.0.0.1:8000/api/profile/`, {
              headers: {
                Authorization: `Token ${authToken}`,
              },
            })
            .then((response) => {
              const userProfile = response.data;
              setProfile(userProfile);
              setProfilePicUrl(userProfile.profile_pic);
            })
            .catch((error) => {
              console.error('Error fetching user profile:', error);
            });

          // Fetch blog posts and comments
          axios
            .get('http://127.0.0.1:8000/api/blogposts/', {
              headers: {
                Authorization: `Token ${authToken}`,
              },
            })
            .then((response) => {
              const postsData = response.data;
              const sortedPostsData = postsData.sort((a, b) => b.likes - a.likes);

              // Initialize the 'likes' state based on fetched posts
              const initialLikes = {};
              const initialShowComments = {};

              postsData.forEach((post) => {
                initialLikes[post.id] = post.likes;
                initialShowComments[post.id] = false;
              });

              setLikes(initialLikes);
              setShowComments(initialShowComments);

              // Update the state with fetched posts
              setPosts(postsData);
              setSortedPosts(sortedPostsData);

              // Fetch comments and profile pictures for each post
            const fetchPostsData = postsData.map((post) => {
              const fetchProfilePic = axios.get(
                `http://127.0.0.1:8000/api/profile/${post.author}/`,
                {
                  headers: {
                    Authorization: `Token ${authToken}`,
                  },
                }
              );

              // Combine both promises to fetch comments and profile picture
              return Promise.all([fetchProfilePic]).then(
                ([profilePicResponse]) => {
                  const postWithProfilePic = {
                    ...post,
                    profilePic: profilePicResponse.data.profile_pic,
                  };

                  return postWithProfilePic;
                }
              );
            });

            // Use Promise.all to fetch profile pics and posts data
            Promise.all(fetchPostsData)
              .then((postsWithProfilePics) => {
                setPosts(postsWithProfilePics);
                setSortedPosts(sortedPostsData);

                // Initialize the 'likes' state based on fetched posts
                const initialLikes = {};
                postsWithProfilePics.forEach((post) => {
                  initialLikes[post.id] = post.likes;
                });
                setLikes(initialLikes);
              })
              .catch((error) => {
                console.error(
                  'Error fetching profile pics and posts:',
                  error
                );
              });
            })
            .catch((error) => {
              console.error('Error fetching posts:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [authToken]);

  const deletePost = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/blogposts/${id}/`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNewPostContentChange = (event) => {
    setNewPostContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });

            setSelectedImage(resizedFile);
            setImagePreview(URL.createObjectURL(resizedFile));
          }, 'image/jpeg', 0.8);
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const createNewPost = () => {
    if (!user) {
      console.log('Unauthorised', user);
      return;
    }

    const formData = new FormData();
    formData.append('content', newPostContent);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    formData.append('author', user.pk);

    const config = {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    };

    axios
      .post('http://127.0.0.1:8000/api/blogposts/', formData, config)
      .then((response) => {
        window.location.reload();

        setPosts([response.data, ...posts]);
        setNewPostContent('');
        setSelectedImage(null);
        setImagePreview(null);
      })
      .catch((error) => {
        console.error('Error creating blog post:', error);
      });
  };

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const selectPostForComment = (post) => {
    setSelectedPost(post);
  };

  const createComment = () => {
    if (!user || !selectedPost) {
      console.log('Unauthorised or post is not available', user, selectedPost);
      return;
    }

    const newComment = {
      post: selectedPost.id,
      user: user.pk,
      text: commentText,
    };

    const config = {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    };

    axios
      .post('http://127.0.0.1:8000/api/comments/', newComment, config)
      .then((response) => {
        const updatedPost = { ...selectedPost };
        updatedPost.comments.push(response.data);

        const updatedPosts = posts.map((p) =>
          p.id === updatedPost.id ? updatedPost : p
        );
        setPosts(updatedPosts);

        setCommentText('');
      })
      .catch((error) => {
        console.error('Error creating comment:', error.response ? error.response.data : error.message);
      });
  };

  const toggleComments = (postId) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [postId]: !prevShowComments[postId],
    }));
  };

  const handleLike = (postId) => {
    if (!authToken || !postId) {
      console.error('Authentication token or post ID is missing.');
      return;
    }

    const config = {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    };

    axios
      .post('http://127.0.0.1:8000/api/likes/', { post: postId }, config)
      .then(() => {
        setLikes((prevLikes) => ({
          ...prevLikes,
          [postId]: (prevLikes[postId] || 0) + 1,
        }));
      })
      .catch((error) => {
        console.error('Error liking post:', error);
      });
  };

  const formatTimeDifference = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div style={{ backgroundColor: '#121661', color: 'white' }}>
      <div className="container" style={{ minHeight: '100vh' }}>
        <br />
        <h1 className="text-secondary" style={{ fontFamily: 'cursive' }}>
          Travellers Blog
        </h1>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <div className="input-group blogpost-input mb-3">
              <input
                type="text"
                className="form-control m-1 custom-blog-placeholder text-secondary"
                placeholder="Share your experience ..."
                value={newPostContent}
                onChange={handleNewPostContentChange}
                style={{ backgroundColor: '#121661', border: '1px solid #d9d9d9', borderRadius: '30px' }}
              />
              <label className="custom-file-upload m-2 what-card" style={{ borderRadius: '100%', backgroundColor: '#A9A9A9', color: '#121661', fontWeight: 'bold' }}>
                <input
                  type="file"
                  accept="image/*"
                  className="btn-sm m-1"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <span className="custom-button mx-1" style={{ fontSize: '9px', color: '#121661' }}>
                  <span className="mt-2" style={{ borderRadius: '100%', width: '10%' }}>Upload image</span>
                  <br />
                </span>
              </label>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary m-1" type="button" onClick={createNewPost}>Post</button>
              </div>
            </div>
            <hr />
            {imagePreview && (
              <div className="mb-3 mt-1">
                <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%' }} />
              </div>
            )}
            <div className="row">
              {posts.map((post) => (
                <div key={post.id} className="card blog-post-card m-auto mb-2" style={{ margin: '5px', padding: '10px', width: '87%' }}>
                  <div className="card-header blog-post-header" style={{ borderBottom: '1px solid #e1e1e1' }}>
                    <div className="d-flex align-items-center">
                      <img
                        src={post.profilePic}
                        alt="Profile Pic"
                        className="rounded-circle author-avatar"
                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                      />
                      <div className="author-info">
                        <h5 className="author-name" style={{ marginBottom: '5px', fontSize: '18px', fontWeight: 'bold' }}>
                          {post.author_full_name}
                        </h5>
                        <p className="author-meta" style={{ fontSize: '14px', color: '#666' }}>
                          <span style={{ fontSize: '12px' }}>{post.followers} </span> &nbsp; {formatTimeDifference(post.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text post-content" style={{ fontSize: '16px', lineHeight: '1.5' }}>{post.content}</p>
                  </div>
                  {post.image && (
                    <img src={post.image} alt="Post" className="card-img-top post-image" style={{ maxWidth: '100%', height: 'auto' }} />
                  )}
                  <div className="card-footer blog-post-footer" style={{ borderTop: '1px solid #e1e1e1' }}>
                    {selectedPost && selectedPost.id === post.id && (
                      <div className="card-footer blog-post-footer" style={{ borderTop: '1px solid #e1e1e1' }}>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={handleCommentTextChange}
                          />
                          <div className="input-group-append">
                            <button className="btn btn-outline-primary" onClick={createComment}>Submit</button>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="d-flex justify-content-between">
                      <div></div>
                      <div className="post-stats" style={{ fontSize: '12px', color: '#666' }}>
                        <span className="text-primary like-button" onClick={() => handleLike(post.id)}>
                          <i className="fa fa-thumbs-up"></i>
                          <span className="like-count">{likes[post.id] || 0} Likes</span>
                        </span>
                        <span style={{ fontSize: '12px', cursor: 'pointer' }} className="text-secondary comment-button" onClick={() => selectPostForComment(post)}>
                          <i className="fa fa-comment"></i>
                          {post.comments ? `${post.comments.length} Comments` : '0 Comments'}
                        </span>
                      </div>
                    </div>
                    {showComments[post.id] &&
                      post.comments &&
                      post.comments.length > 0 && (
                        <div>
                          {post.comments.map((comment) => (
                            <div key={comment.id}>
                              <span>{comment.user}: {comment.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4 text-right">
            <h4 className="text-center mt-5" style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Top chats</h4>
            <Carousel
              className="fixed-carousel mt-3 mx-5"
              style={{
                height: '200px',
                outline: '1px solid #198754',
                padding: '1rem',
                borderRadius: '10px',
              }}
            >
              {sortedPosts.map((post) => (
                <Carousel.Item key={post.id}>
                  <div className="">
                    <p className='text-success' style={{ fontWeight: 'bolder' }}>{post.author_full_name}</p>
                    <hr />
                    <div className="text-center">
                      <img
                        src={natpark}
                        alt="User profile"
                        className="rounded-circle"
                        width="150"
                      />
                    </div>
                    <p className='text-white mt-3'>{post.content}</p>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
            <br />
            <h4 className="text-center mt-4" style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Sponsored Ads</h4>
            <hr />
            <div className="what-card text-secondary">
              <img src={placeholderImage1} alt="Ad 1" className="img-fluid mx-auto mt-2" />
              <p className="text-primary what-card-title" style={{ color: '#198754', fontWeight: 'bold' }}>Holiday Destination</p>
              <p className="what-card-text">Explore the world with our luxury holiday packages.</p>
            </div>
            <div className="what-card text-secondary">
              <img src={placeholderImage2} alt="Ad 2" className="img-fluid mx-auto mt-2" />
              <p className="text-primary what-card-title" style={{ color: '#198754', fontWeight: 'bold' }}>Mountain Retreat</p>
              <p className="what-card-text">Find the best mountain retreats for a peaceful vacation.</p>
            </div>
            <div className="what-card text-secondary">
              <img src={placeholderImage3} alt="Ad 3" className="img-fluid mx-auto mt-2" />
              <p className="text-primary what-card-title" style={{ color: '#198754', fontWeight: 'bold' }}>Beach Resorts</p>
              <p className="what-card-text">Enjoy your holidays at the most exquisite beach resorts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogList;
