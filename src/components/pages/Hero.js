import React, { useState, useEffect } from 'react';
import '../../static/Homepage.css';
import '../../static/Styles.css';
import axios from 'axios';
// import naturewalk from '../../videos/naturewalk.mp4';
// import bonfire from '../../videos/waterfall.mp4';
// import waterfall from '../../videos/bonfire.mp4';
import { Dropdown } from 'react-bootstrap';
import heroimg from '../../images/heroimg.png'
const VideoCarousel = () => {

  
  const [activeIndex, setActiveIndex] = useState(0);

  const videos = [
    {
      // src: naturewalk,
      title: 'Plan anywhere',
      text: 'Sit back and wait',
      more: 'Read more',
    },
    {
      // src: waterfall,
      title: 'We take care of the rest',
      text: ' Enjoy your vacation in style',
      more: 'Read more',
    },
    {
      // src: bonfire,
      title: 'Check your bucket list',
      text: 'Repeat ...',
      more: 'Read more',
    },

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 4000);

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
    <div className='continer-fluid hero-section' style={{overflow:'hidden'}}>
      <div className="carousel" style={{backgroundColor:'rgba(18, 22, 97 )'}}>
        {videos.map((video, index) => (
          <div
            key={index}
            className={`   ${index === activeIndex ? 'active' : ''}`}
            style={{
              display: index === activeIndex ? 'block' : 'none',
              position: 'relative',
            }}
          >
            <video className="hero-video" src={video.src} autoPlay loop muted style={{ width: '100%' }} >
              Your browser does not support this video 
              </video>

            <div className="carousel-caption " style={{ backgroundColor: 'rgba(18, 22, 97 ,0.5)', height:'' }}>
              <h3 style={{marginRight:'3rem'}} className='mt-'>{video.title}</h3>
              <p className='caption-p mt- style-p' style={{marginRight:'3rem',  fontSize:'22px', fontWeight:'bolder'}} >{video.text}</p>
            </div>
          </div>
        ))}
      </div> 
    </div>
</>
  );
};

export default VideoCarousel;
