import React, { useState, useEffect } from 'react';
import '../../static/Homepage.css';
import axios from 'axios';
import naturewalk from '../../videos/naturewalk.mp4';
import bonfire from '../../videos/bonfire.mp4';
import waterfall from '../../videos/waterfall.mp4';
import './ProfilePage.js';
import { Dropdown } from 'react-bootstrap';
import heroimg from '../../images/heroimg.png'
const VideoCarousel = () => {

  
  const [activeIndex, setActiveIndex] = useState(0);
  const videos = [
    {
      src: naturewalk,
      title: 'Check Your Bucket List',
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum, quis. Quasi debitis iure libero ipsam laudantium, neque molestiae. Veritatis ipsum, dignissimos distinctio natus aperiam sint cum eos nam mollitia hic.',
      more: 'Read more',
    },
    {
      src: bonfire,
      title: 'Travel with Enceptics',
      text: 'Eum, quis. Quasi debitis iure libero ipsam laudantium, neque molestiae. Veritatis ipsum, dignissimos distinctio natus aperiam sint cum eos nam mollitia hic. ',
      more: 'Read more',
    },
    {
      src: waterfall,
      title: 'Your travel partner for life',
      text: ' Quasi debitis iure libero ipsam laudantium, neque molestiae. Veritatis ipsum, dignissimos distinctio natus aperiam sint cum eos nam mollitia hic.',
      more: 'Read more',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videos.length]);

  const greatvibes = {
    fontFamily: 'cursive',
    fontSize: '20px',
    textDecoration: 'overline',
    textDecorationColor: 'green',
  };


  return (
    <>

<div className='continer-fluid'style={{postion: 'relative'}}>


      <div className="carousel" style={{position: 'relative'}}>
        {videos.map((video, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
            style={{
              display: index === activeIndex ? 'block' : 'none',
              position: 'relative',
            }}
          >
            <video className="mt-5" src={video.src} autoPlay muted loop style={{ width: '100%' }}>
              Your browser does not support the video tag.
            </video>
            <div className="carousel-caption " style={{ backgroundColor: 'rgb(18, 22, 97, 0.4)' }}>
              <h3 className=''>{video.title}</h3>
              <p className="mt-5">{video.text}</p>
            </div>
          </div>
        ))}


      </div> 
    </div>
</>

  );
};

export default VideoCarousel;
