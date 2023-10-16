import React, { useState } from 'react';
import '../../static/Homepage.css';
import '../../static/Styles.css';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import '../../images/heroimg.png';
import Places from './Places';

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const images = [
    {
      src: require('../../images/Fw4epCKX0AAtaIW.jpeg'),
      title: 'Beach Resorts',
      text: 'Enjoy your holidays at the most exquisite beach resorts',
      more: 'Read more',
    },
    {
      src: require('../../images/Fw4epCLXsAEy3FC.jpeg'),
      title: 'Holiday Destination',
      text: 'Explore the world with our luxury holiday packages',
      more: 'Read more',
    },
    {
      src: require('../../images/vace2.jpg'),
      title: 'Mountain Retreat',
      text: 'Find the best mountain retreats for a peaceful vacation',
      more: 'Read more',
    },
  ]

  return (
    <>
    <div>
    <Container fluid className="hero-section" style={{ padding: 0 }}>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
          }

          .carousel-caption h2 {
            animation: slideDown 2s forwards;
          }

          .carousel-caption p {
            animation: slideLeft 3s forwards 2s;
            margin: 0;
          }

          .carousel-caption {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }

          @keyframes slideDown {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes slideLeft {
            0% {
              transform: translateX(120%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <Row>
        <Col>
          <Carousel activeIndex={index} fade={true} controls={true} interval={5000} onSelect={handleSelect} style={{ backgroundColor: 'rgba(18, 22, 97)', position: 'relative', height: '100vh' }}>
            {images.map((image, i) => (
              <Carousel.Item key={i}>
                <img className="d-block w-100 hero-image" src={image.src} alt="Carousel Image" style={{ top: 0, height: '100vh', bottom: 0 }} />
                  <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%', left: 0, right: 0, top: 0, bottom: 0 }}>
                  <h2 className='heading mb-4' style={{ fontSize: '52px', color: 'green', fontWeight:'200' }}> {image.title} </h2>
                  <p className='style-p' style={{ fontSize: '25px', color: '#A9A9A9', width: '60%' }}> {image.text} </p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
    </div>
    <Places />
    </>
  );
};

export default ImageCarousel;
