import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import axios from 'axios';
import './Places.css';
import horse from '../../images/horse.jpg';
import house2 from '../../images/house2.jpg';
import natpark from '../../images/natpark.jpg';
import beach from '../../images/beach.jpg';
import malindi from '../../images/malindi.jpg';
import mombasa from '../../images/mombasa.jpg';

const Hero = () => {
const [destination, setDestination] = useState([])

  useEffect(() => {
    let mounted = true;

    // Axios request
    axios.get('http://127.0.0.1:8000/api/auth/get_place_list/') 
      .then(response => {
        if (mounted) {
          setDestination(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });

    return () => (mounted = false);
  }, []);

  const trending = [
    mombasa,
    beach,
    malindi,
  ]

  const teamMembers = [
    {
      name: "	Mombasa",
      position: "Beautiful beaches of Linkoni",
      //   contribution: "One of the top rated destinations with 4.5 stars",
      more: "",
      link: "#",
      image: mombasa,
    },

    {
      name: "Ngong hills",
      position: "The great forest of Ngong hills full of horses",
      //   contribution: "Enjoy endless rides anytime",
      more: "",
      link: "#",
      image: horse,
    },

    {
      name: "Malindi",
      position: "The cool breeze of Malindi never disapoints",
      //   contribution: "Make your vacation memorable in this magical place",
      more: "",
      link: "#",
      image: malindi,
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideshowContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === teamMembers.length - 1 ? 0 : prevSlide + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index, e) => {
    e.preventDefault();
    const lastIndex = teamMembers.length - 1;
    const currentSlide = index === lastIndex ? 0 : index;
    setCurrentSlide(currentSlide);
  };

  return (
    <>
      <Container className='p-4' fluid style={{ minHeight: '100vh', backgroundColor: '#121661' }}>
        <Row className="places" >
          <div className=" text-white">
            <div>
              <h1 className="text-left mb-5" style={{ color: '#d9d9d9', marginTop: '15vh' }}>
                Explore Your country
              </h1>
            </div>
            <div>
              Add destination
            </div>
          </div>

          <Col md={3} className='' style={{ marginTop: '0' }}>
            {destination.map((destination)=>
            
            <Card key={destination.id} className="places-cards" style={{ backgroundColor: '#ffffff', width: '100%' }}>
              <Card.Img src={destination.cover_image} style={{ width: '100%', height: '195px' }} />
              <Card.Body style={{ color: 'black' }}>
                <h5 className="mt-2" style={{ color: 'green', fontWeight: 500 }}>
                  {destination.name}
                </h5>

              <p style={{ fontSize: '12px', width: '100%' }}> 
              {destination.description}
              {destination.price}
              {destination.visited}
              </p>
              </Card.Body>
              <Card.Footer>
                <a href="/description">
                  <button className="btn btn-sm"
                    style={{ 
                      backgroundColor: '#121661', 
                      color: 'white', 
                      padding: '0.3rem',
                      borderRadius: '30px 0 30px 30px', 
                      border: 'none', 
                      width: '100px', 
                      fontSize: '11px', 
                      fontWeight: 'bold' 
                      }}>
                      Explore
                  </button>
                </a>
              </Card.Footer>
            </Card>
             )}
          </Col>
          <Col md={3} 
          className='' 
          style={{ color: '#ffffff' }} >
            <div className="">
              {/* START TRENDING SLIDE SHOW */}
              <Container fluid style={{ height: 'auto', width: 'auto', overflow: 'hidden', padding: 0 }} className="team-title slideshow-container">
                <div style={{ textAlign: 'center', marginTop: '' }} >
                  <h4 style={{ fontWeight: 'bold' }}>Trending</h4>
                  <hr />
                  <div className="slideshow">
                    <div ref={slideshowContainerRef} className="slideshow__wrapper">
                      {teamMembers.map((member, index) => (
                        <div
                          key={index}
                          className={`slideshow__slide ${index === currentSlide ? "active" : ""
                            }`}
                          style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                          }}
                        >
                          <img
                            className="slideshow__image"
                            src={member.image}
                            alt={member.name}
                          />
                          <div className="slideshow__info" style={{ color: 'goldenrod' }}>
                            <h2 className="slideshow__name">{member.name}</h2>
                            <p style={{ color: '#fff', fontSize: '12px' }} className="slideshow__position">{member.position}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="slideshow__dots">
                      {teamMembers.map((member, index) => (
                        <span
                          key={index}
                          className={`slideshow__dot ${index === currentSlide ? "active" : ""}`}
                          type="button"
                          tabIndex="-1"
                          onClick={(e) => handleDotClick(index, e)}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              </Container>
              {/* END TRENDING */}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Hero;