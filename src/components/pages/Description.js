import React, { useState } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import './Places.css';
import house1 from '../../images/house1.jpg';
import house2 from '../../images/house2.jpg';
import house3 from '../../images/house3.jpg';
import house4 from '../../images/house4.jpg';
import house5 from '../../images/house5.jpg';
import city from '../../videos/city.mp4';

const MySection = () => {

  return (
    <>
    <Container fluid className='p-3' style={{height:'100vh', backgroundColor:'#121661'}}>
      <Row className="places">    
      <h1 className="text-left" style={{color:'#d9d9d9'}}>Explore Salar de Uyuni</h1>   
      <hr style={{padding:'0.5rem', color:'#121661'}} /> 
      <Col md={4} className='' style={{marginTop:'0'}}>
           <Card className="places-cards" style={{backgroundColor:'#d9d9d9'}}>  
           {/* <Card.Video src={house2} style={{}}/> */}
           <video className="" src={city} controls={true}  style={{ width: '100%' }}>
              Your browser does not support the video tag.
            </video>
            <Card.Footer>
            <a href="/booking"> 
            <button className="btn"
            style={{backgroundColor:'#121433', color:'white', padding:'0.4rem', borderRadius:'30px 0 30px 30px', border:'none', width:'100%', fontSize:'16px'}}
            >Book Salar de uyuni</button>
            </a>
            </Card.Footer>
            </Card>
        </Col>    
        <Col md={8} className='' >
      <h5 className="text-center text-white">What our visitors say</h5>
           <div className=""> 

            </div>
        </Col>
      </Row>
    </Container>  
    </>
  );
};

export default MySection;