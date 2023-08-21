import React, {useState} from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import natpark from '../../images/undraw_trip_re_f724.svg';

import Login from './authenticate/Login';
import { useNavigate } from 'react-router-dom';
// import './AboutUs.css';

const AboutUs = () => {


  return (
    <div style={{backgroundColor:'#121661'}}>
      <Container>
      <Row >
        <Col md={8}>
          <Card
              
             style={{
              backgroundImage: `linear-gradient(rgba(18, 22, 97,0.8), rgba(18, 22, 97,0.8)), url(${natpark})`,
              backgroundSize: "cover",
              height: 'auto',
              color: "white",
              marginTop:'15vh',
              // margin:'5rem',
            }}
          >
            <Card.Body>
              <Card.Title className="text-center" style={{fontSize:'25px', color:'rgb(18, 187, 18)'}}>Enceptics</Card.Title>
              <Card.Text style={{ height: "84vh" }}>
               <p>Enceptics is a startup company which aims to integrate vacation processes in a single platform. Once fully developed it will streamline the entire vacation experience. It will allow tourists to book transportation, hotels, and activities in a seamless and user-friendly manner, providing them with a personalized vacation itinerary. </p>
                <p>This will be made possible by collaborating with transportation companies, hotels, and tour operators to provide a comprehensive range of services on this platform. It will require a significant amount of funding and partnership development to bring the project to fruition.</p>
              <p></p>
              </Card.Text>
              </Card.Body>
              </Card>
        </Col>
        <Col md={4}>
          <Row>
            <Col>
            <Card className="what-card text-white" style={{marginRight:'3rem' , marginTop:'21vh', backgroundColor:'transparent'}}>  
     
              <h3 style={{fontSize:'25px', color: "rgb(18, 187, 18)"}}>Mission</h3>
              <p>
              To give tourists  easy time by organising their journey for them, catering for transportation and accommodation services on one time payment.
              </p>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
            <Card className="what-card mt-2 text-white" style={{marginRight:'3rem', backgroundColor:'transparent'}}>  
              <h3 style={{fontSize:'25px', color: 'rgb(18, 187, 18)'}}>Vision</h3>
              <p>
              The vision is to make vacation planning easy for everyone by providing a seamless, user-friendly, and personalized vacation planning experience for tourists
 
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