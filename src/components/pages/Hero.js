import React, { useState, useEffect } from 'react';
import '../../static/Homepage.css';
import '../../static/Styles.css';
import axios from 'axios';
import naturewalk from '../../images/vace1.avif';
import bonfire from '../../images/vace2.jpg';
import waterfall from '../../images/mombasa.jpg';
import { Dropdown } from 'react-bootstrap';
import heroimg from '../../images/heroimg.png'
const VideoCarousel = () => {

  
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    {
      src: naturewalk,
      title: 'Plan anywhere',
      text: 'Sit back and wait',
      more: 'Read more',
    },
    {
      src: waterfall,
      title: 'We take care of the rest',
      text: ' Enjoy your vacation in style',
      more: 'Read more',
    },
    {
      src: bonfire,
      title: 'Check Your Bucket List',
      text: 'Repeat ...',
      more: 'Read more',
    },

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const greatvibes = {
    fontFamily: 'cursive',
    fontSize: '20px',
    textDecoration: 'overline',
    textDecorationColor: 'green',
  };


  return (
    <>
    <div className='continer-fluid hero-section' style={{overflow:'hidden'}}>
      <div className="carousel" >
        {images.map((image, index) => (
          <div
            key={index}
            className={`   ${index === activeIndex ? 'active' : ''}`}
            style={{
              display: index === activeIndex ? 'block' : 'none',
              position: 'relative',
            }}
          >
            <img className="mt-5 hero-video" src={image.src} style={{ width: '100%' }} />

            <div className="carousel-caption " style={{ backgroundColor: '#121661', height:'auto' }}>
              <h3 style={{marginRight:'3rem'}} className='mt-5'>{image.title}</h3>
              <p className='caption-p mt-5 style-p' style={{marginRight:'3rem',  fontSize:'22px', fontWeight:'bolder'}} >{image.text}</p>
            </div>
          </div>
        ))}
      </div> 
    </div>
</>
  );
};

export default VideoCarousel;
