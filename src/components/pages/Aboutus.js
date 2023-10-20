import React, {useState} from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import natpark from '../../images/undraw_trip_re_f724.svg';

import Login from './authenticate/Login';
import { useNavigate } from 'react-router-dom';
// import './AboutUs.css';

const AboutUs = () => {


  return (
    <div style={{backgroundColor:'#121661'}}>
      <Container >
      <Row >
        <Col md={8}>
          <div
              
             style={{
              backgroundImage: `linear-gradient(rgba(18, 22, 97,0.8), rgba(18, 22, 97,0.8)), url(${natpark})`,
              backgroundSize: "cover",
              height: 'auto',
              color: "white",
              marginTop:'14vh',
              // margin:'5rem',
            }}
          >
            <Card.Body>
              <Card.Title className="text-center" style={{fontSize:'25px', color:'rgb(18, 187, 18)'}}><h1>Welcome to Enceptics</h1></Card.Title>
              <hr />

              <Card.Text style={{ height: "auto" }}>
              <header>
        
    </header>
    <main>
        <section>
            <h4>Explore, Book, Relax</h4>
            <p>At Enceptics, we make your dream vacations a reality. We understand that planning a trip can be overwhelming, so we've simplified the entire process for you.</p>
            <p>Discover a world of stunning destinations, handpicked for you. Explore and select your favorite place, and we'll take care of the rest.</p>
        </section>
        <section>
            <h4>What We Offer</h4>
            <ul>
                <li>Curated Destinations: We offer a selection of the most enchanting places for you to explore.</li>
                <li>All-Inclusive Packages: Relax and let us handle transportation, accommodation, and expert tour guides.</li>
                <li>Two-Day Adventure: Enjoy two days of unforgettable experiences, then return home with memories to cherish.</li>
                <li>Traveler's Blog: Join our traveler's community, share your stories, and connect with fellow adventurers.</li>
                <li>Weather Updates: Get real-time weather information for your destination to help you pack and prepare.</li>
                <li>Secure Payments: Choose your preferred payment method, whether it's M-Pesa or PayPal, and book with confidence.</li>
            </ul>
        </section>
        <section>
            <h4>Join Our Community</h4>
            <p>Enceptics is more than an app; it's a community of travelers sharing their journeys and experiences. Connect with like-minded individuals, exchange tips, and inspire each other.</p>
            <p>Whether you're an avid globetrotter or a first-time traveler, you're welcome here. Let's explore the world together.</p>
        </section>
    </main>
              </Card.Text>
              </Card.Body>
              </div>
        </Col>
        <Col md={4} className=' mt-2'>
          <Row >
            <Col className='text-right'>
            <div className="what-card-btn text-white p-2 mx-auto" style={{marginTop:'14vh', backgroundColor:'transparent'}}>  
     
              <h5 style={{color: "rgb(18, 187, 18)"}}>Mission</h5>
              <p className="text-sm" style={{fontSize:'14px'}}>
              At Enceptics, our mission is to create unforgettable travel experiences for our customers. We strive to simplify the journey from dreaming to exploring by offering hassle-free bookings, expertly curated tours, and reliable services. We are dedicated to taking care of the details, so you can focus on creating memories.              </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
            <div className="what-card-btn mt-4 text-white p-2 mx-auto" style={{backgroundColor:'transparent'}}>  
              <h5 style={{color: 'rgb(18, 187, 18)'}}>Vision</h5>
              <p className="text-sm" style={{fontSize:'14px'}}>
              Our vision at Enceptics is to become the go-to platform for stress-free and immersive travel adventures. We aim to connect travelers with their dream destinations, providing seamless transportation, comfortable accommodations, and insightful tour guides. We envision a world where everyone can explore the world without worry, enabled by our innovative and reliable services. 
              </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      </Container>
      <br /><br />
    </div>
  );
};

export default AboutUs;