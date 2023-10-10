import React, { useState, useEffect } from 'react';
import Places from '../pages/Places';
import Hero from '../pages/Hero';
import Blogs from '../pages/Blogs';
import axios from 'axios';
import TopChats from './TopChats';

function Home() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts and their likes
    axios.get('http://127.0.0.1:8000/api/blogposts/')
      .then((response) => {
        const postsData = response.data;
        setBlogPosts(postsData);
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
      });
  }, []);

  return (
    <>
      <Hero />
      <Places />
      <Blogs />
      {/* Render the TopChats component and pass the fetched blog posts */}
      {/* <TopChats blogPosts={blogPosts} /> */}
    </>
  );
}

export default Home;
