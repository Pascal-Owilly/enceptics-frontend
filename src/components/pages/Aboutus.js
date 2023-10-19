import React, {useState} from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import natpark from '../../images/undraw_trip_re_f724.svg';

import Login from './authenticate/Login';
import { useNavigate } from 'react-router-dom';
// import './AboutUs.css';

const AboutUs = () => {


  return (
    <div style={{backgroundColor:'#121661'}}>
      <Container fluid>
      <Row >
        <Col md={8}>
          <Card
              
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
              <Card.Text style={{ height: "auto" }}>
              <header>
        
    </header>
    <main>
        <section>
            <h3>Explore, Book, Relax</h3>
            <p>At Enceptics, we make your dream vacations a reality. We understand that planning a trip can be overwhelming, so we've simplified the entire process for you.</p>
            <p>Discover a world of stunning destinations, handpicked for you. Explore and select your favorite place, and we'll take care of the rest.</p>
        </section>
        <section>
            <h3>What We Offer</h3>
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
            <h3>Join Our Community</h3>
            <p>Enceptics is more than an app; it's a community of travelers sharing their journeys and experiences. Connect with like-minded individuals, exchange tips, and inspire each other.</p>
            <p>Whether you're an avid globetrotter or a first-time traveler, you're welcome here. Let's explore the world together.</p>
        </section>
    </main>
              </Card.Text>
              </Card.Body>
              </Card>
        </Col>
        <Col md={4}>
          <Row>
            <Col>
            <Card className="what-card-btn text-white p-2 mx-auto" style={{marginTop:'14vh', backgroundColor:'transparent'}}>  
     
              <h3 style={{fontSize:'25px', color: "rgb(18, 187, 18)"}}>Mission</h3>
              <p>
              At Enceptics, our mission is to create unforgettable travel experiences for our customers. We strive to simplify the journey from dreaming to exploring by offering hassle-free bookings, expertly curated tours, and reliable services. We are dedicated to taking care of the details, so you can focus on creating memories.              </p>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
            <Card className="what-card-btn text-white p-2 mx-auto" style={{backgroundColor:'transparent'}}>  
              <h3 style={{fontSize:'25px', color: 'rgb(18, 187, 18)'}}>Vision</h3>
              <p>
              Our vision at Enceptics is to become the go-to platform for stress-free and immersive travel adventures. We aim to connect travelers with their dream destinations, providing seamless transportation, comfortable accommodations, and insightful tour guides. We envision a world where everyone can explore the world without worry, enabled by our innovative and reliable services. 
              </p>
              </Card>
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