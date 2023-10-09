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
  
  const [profile, setProfile] = useState({}); // Define setProfile here
  const [profilePicUrl, setProfilePicUrl] = useState(null);


  const authToken = Cookies.get('authToken');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showComments, setShowComments] = useState({});
  // const [comments, setComments] = useState([]);


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
              setProfilePicUrl(userProfile.profile_pic); // Set the profile pic URL in state
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
  
              // Fetch comments and profile pictures for each post
              const fetchPostsData = postsData.map((post) => {
                const fetchComments = axios.get(
                  `http://127.0.0.1:8000/api/comments/?post=${post.id}`,
                  {
                    headers: {
                      Authorization: `Token ${authToken}`,
                    },
                  }
                );
  
                const fetchProfilePic = axios.get(
                  `http://127.0.0.1:8000/api/profile/${post.author}/`,
                  {
                    headers: {
                      Authorization: `Token ${authToken}`,
                    },
                  }
                );
  
                // Combine both promises to fetch comments and profile picture
                return Promise.all([fetchComments, fetchProfilePic]).then(
                  ([commentsResponse, profilePicResponse]) => {
                    const postWithProfilePic = {
                      ...post,
                      comments: commentsResponse.data,
                      profilePic: profilePicResponse.data.profile_pic,
                    };
              
                    // console.log('Profile Pic for Post', post.id, ':', postWithProfilePic.profilePic); // Add this line for debugging
              
                    return postWithProfilePic;
              


                  }
                );
              });
  
              // Use Promise.all to fetch comments, profile pics, and posts data
              Promise.all(fetchPostsData)
                .then((postsWithCommentsAndProfilePics) => {
                  setPosts(postsWithCommentsAndProfilePics);
                  setSortedPosts(sortedPostsData);
                })
                .catch((error) => {
                  console.error('Error fetching comments, profile pics, and posts:', error);
                });
            })
            .catch((error) => {
              console.error('Error fetching posts:', error);
            });
  
          // ... rest of your code
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [authToken]);
  
  
// Define a separate useEffect to initialize showComments state
// useEffect(() => {
//   if (posts && posts.length > 0) {
//     const initialShowComments = {};
//     posts.forEach((post) => {
//       initialShowComments[post.id] = false;
//     });
//     setShowComments(initialShowComments);
//   }
// }, [posts]);

useEffect(() => {
  if (posts && posts.length > 0) {
    const initialShowComments = {};
    posts.forEach((post) => {
      initialShowComments[post.id] = false;
    });
    setShowComments(initialShowComments);
  }
}, [posts]);


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
    if (!user) {
      console.log('Unauthorised', user); // Handle the case where the user is not authenticated
      return;
    }
  
    const formData = new FormData();
    formData.append('content', newPostContent);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }
  
    // Set the 'author' field to the user's ID
    formData.append('author', user.pk); // Assuming 'user.pk' contains the user's ID
  
    // Log the formData object to check its contents
    // console.log('formData:', formData);
  
    // Ensure you send 'author' as a parameter
    const config = {
      headers: {
        Authorization: `Token ${authToken}`, // Include the authToken in the request headers
      },
    };
  
    axios.post('http://127.0.0.1:8000/api/blogposts/', formData, config)
      .then(response => {

        window.location.reload();


        setPosts([response.data, ...posts]);
        setNewPostContent('');
        setSelectedImage(null);
        setImagePreview(null);


      })
      .catch(error => {
        // console.log('Error creating blog post for user', user.last_name, error.response.data);
      });
  };


  const [commentText, setCommentText] = useState(''); // State to hold the comment text
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState({});


const handleCommentTextChange = (event) => {
  setCommentText(event.target.value);
};
  

const selectPostForComment = (post) => {
  setSelectedPost(post); // Set the selectedPost state to the post being commented on
};

  
const createComment = () => {
  if (!user || !selectedPost) {
    console.log('Unauthorised or post is not available', user, selectedPost);
    return;
  }

  // Create a new comment object
  const newComment = {
    post: selectedPost.id, // The ID of the post you're commenting on
    user: user.pk, // The ID of the user creating the comment
    text: commentText, // The text of the comment
  };

  const config = {
    headers: {
      Authorization: `Token ${authToken}`, // Include the authToken in the request headers
    },
  };

  axios
    .post('http://127.0.0.1:8000/api/comments/', newComment, config)
    .then((response) => {
      // Handle the successful creation of the comment

      // Update the state to include the newly created comment
      const updatedPost = { ...selectedPost };
      updatedPost.comments.push(response.data);

      // Update the 'posts' state to reflect the changes
      const updatedPosts = posts.map((p) =>
        p.id === updatedPost.id ? updatedPost : p
      );
      setPosts(updatedPosts);

      // Clear the comment input field
      setCommentText('');
    })
    .catch((error) => {
      console.error(
        'Error creating comment:',
        error.response ? error.response.data : error.message
      );
      // Handle the error, e.g., show an error message to the user
    });
};



const fetchCommentsForPost = (postId) => {
  if (!authToken || !postId) {
    console.error('Authentication token or post ID is missing.');
    return;
  }

  axios.get(`http://127.0.0.1:8000/api/comments/?post=${postId}`, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  })
  .then((response) => {
    // Handle the successful response here
    const comments = response.data;
    
    // Update the state with the fetched comments for the specific post
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, ...comments],
          };
        }
        return post;
      });
    });

  })
  .catch((error) => {
    console.error('Error fetching comments:', error);
    // Handle the error, e.g., show an error message to the user
  });
};



const toggleComments = (postId) => {
  setShowComments((prevShowComments) => ({
    ...prevShowComments,
    [postId]: !prevShowComments[postId], // Toggle the display state for the specific post
  }));
};


const handleLike = (postId) => {
  if (!authToken || !postId) {
    console.error('Authentication token or post ID is missing.');
    return;
  }
  // Send a POST request to add a like for the post
  const config = {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  };

  axios
    .post('http://127.0.0.1:8000/api/likes/', { post: postId }, config)
    .then(() => {
      // Increment the likes count in the state
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: prevLikes[postId] + 1,
      }));
    })
    .catch((error) => {
      console.error('Error liking post:', error);
      // alert(post.author)

      // Check the error response for more details (if available)
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    });
};



  const formatTimeDifference = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };


  return (
    <div style={{backgroundColor:'#121661', color:'white'}}>
    <div className="container" style={{ minHeight: '100vh' }}>
      <br />
      <h1 className="text-secondary" style={{fontFamily:'cursive'}}>Travellers Blog</h1>
      <hr />
      <div className="row ">
      {/* <div className="col-md-1"></div> */}
        <div className="col-md-6">
          <div className="input-group blogpost-input mb-3">
          <input
          
            type="text"
            className="form-control m-1 custom-blog-placeholder text-secondary" /* Add the custom-placeholder class here */
            placeholder="Share your experience ..."
            value={newPostContent}
            onChange={handleNewPostContentChange}
            style={{ backgroundColor: '#121661', border: '1px solid #d9d9d9', borderRadius: '30px', '::placeholder': { color: 'white' }}}
          />
              <label className="custom-file-upload m-2 what-card" style={{borderRadius:'100%', backgroundColor:'#A9A9A9', color:'#121661', fontWeight:'bold'}}>
                <input
                  type="file"
                  accept="image/*"
                  className=" btn-sm m-1"
                  onChange={handleImageChange}
                  style={{ display: 'none' }} // Hide the default file input
                />
                <span className="custom-button  mx-1 " style={{ fontSize: '9px', color:'#121661' }}><span className='mt-2' style={{borderRadius:'100%', width:'10%'}}>Upload </span><br /> image</span>
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
   {posts.map(post => (
  <div  key={post.id} className="card blog-post-card m-auto mb-2" style={{ margin: '5px', padding: '10px', boxShadow: '',width:'87%' }}>
    <div className="card-header blog-post-header" style={{ borderBottom: '1px solid #e1e1e1' }}>
    <div className="d-flex align-items-center">
    <img
  src={post.profilePic}
  alt="Profile Pic"
  className="rounded-circle author-avatar"
  style={{ width: '50px', height: '50px', marginRight: '10px' }}
/>


                      <div className="author-info">
                      <h5 className="author-name" style={{ marginBottom: '5px', fontSize: '18px', fontWeight: 'bold' }}>{post.author_full_name}
                      &nbsp;&nbsp;
                      <span className="text-success btn-sm follow-button" style={{fontSize:'12px', cursor:'pointer'}}> • <i className="fa fa-user-plus"></i> Follow</span>

                      </h5>

                        <p className="author-meta" style={{ fontSize: '14px', color: '#666' }}>
                          <span style={{fontSize:'12px'}} className="">{post.followers} </span> &nbsp; {formatTimeDifference(post.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
    {post.image && (
      <img src={post.image} alt="Post" className="card-img-top post-image" style={{ maxWidth: '100%', height: 'auto' }} />
    )}
    <div className="card-body">
      <p className="card-text post-content" style={{ fontSize: '16px', lineHeight: '1.5' }}>{post.content}</p>
    </div>

    <div className="card-footer blog-post-footer" style={{ borderTop: '1px solid #e1e1e1' }}>
      <div className="d-flex justify-content-between">
        <div>
       
          </div>
          <div className="post-stats" style={{ fontSize: '12px', color: '#666' }}>
      {/* <span className="like-count">{likes[post.id]} Likes</span>&nbsp; */}
      {/* <span className="comment-count" onClick={() => toggleComments(post.id)}>
        {post.comments ? `${post.comments.length} Comments` : '0 Comments'}
      </span> */}

                {/* <button onClick={() => deletePost(post.id)} className="btn btn-outline-danger btn-sm delete-button"><i className="fa fa-trash"></i> Delete</button>&nbsp; */}
                <span style={{fontSize:'12px'}} className="text-primary like-button" onClick={() => handleLike(post.id)}>
          <i className="fa fa-thumbs-up"></i> 
          <span className="like-count">{likes[post.id]} Likes</span>&nbsp;
&nbsp;&nbsp;
        </span>        
          <span style={{fontSize:'12px', cursor:'pointer'}}  className=" text-secondary comment-button" onClick={() => selectPostForComment(post)}> 
            <i className="fa fa-comment"></i> 
            {post.comments ? `${post.comments.length} Comments` : '0 Comments'}

          </span> 
    </div>
    {/* Conditionally render comments based on showComments state */}
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

    {/* Comment Input Field */}
    {/* Conditionally render the comment input field only if post.comments is available */}
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
                  <div className=" ">
                    {/* Render post content here */}
                    <p className='text-success' style={{ fontWeight: 'bolder' }}>{post.author_full_name}</p>
                    <hr />
                    <p className=''>{post.content}</p>
                  </div>
                </Carousel.Item>
              ))}

  </Carousel>
</div>

         
      </div>
    </div>
    </div>

    

  );
}

export default BlogList;
