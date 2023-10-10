import React from 'react';
import { Carousel } from 'react-bootstrap';

function TopChats({ blogPosts }) {
  // Check if blogPosts is defined and not null
  if (!blogPosts) {
    return <p>Loading User data ...</p>
  }

  // Sort the blog posts by likes in descending order
  const topChats = blogPosts.sort((a, b) => b.likes - a.likes);

  return (
    <div className="container mt-5" style={{height:'100vh'}}>
      <h2 className="text-center mb-4" style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>Top Chats</h2>
      <Carousel>
        {topChats.map((chat) => (
          <Carousel.Item key={chat.id}>
            <div>
              <p className='text-success' style={{ fontWeight: 'bolder' }}>{chat.author_full_name}</p>
              <hr />
              <p>{chat.content}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default TopChats;
