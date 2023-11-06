import React, { useState, useEffect } from 'react';
import Places from '../pages/Places';
import Hero from '../pages/Hero';
import axios from 'axios';
import TopChats from './TopChats';
import BlogList from './BlogList';

function Home() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts and their likes
    axios.get('https://enc.pythonanywhere.com/api/blogposts')
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
      {/* <BlogList /> */}
      {/* Render the TopChats component and pass the fetched blog posts */}
      {/* <TopChats blogPosts={blogPosts} /> */}
    </>
  );
}

export default Home;
