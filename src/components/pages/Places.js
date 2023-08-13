import React, { useState } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import './Places.css';
import house1 from '../../images/house1.jpg';
import house2 from '../../images/house2.jpg';
import house3 from '../../images/house3.jpg';
import house4 from '../../images/house4.jpg';
import house5 from '../../images/house5.jpg';

const MySection = () => {

  return (
    <>
    <Container fluid style={{height:'100vh', position:'relative', backgroundColor:'#121661'}}>
      <Row className="places">    
      <h1 className="text-center m-3" style={{color:'#d9d9d9'}}>Explore Your Country</h1>   
      <hr style={{padding:'0.5rem', color:'#121661'}} /> 
      <Col md={3} className='' style={{marginTop:'0'}}>
           <Card className="places-cards" style={{backgroundColor:'#d9d9d9'}}>  
           <Card.Img src={house2} style={{width:'100%'}}/>
           
            </Card>


      </Col>  
      <Col md={6}>
          <Card.Title >
           <h5 className="mt-2" style={{color:'#d9d9d9',  fontWeight: 500}}>Salar de Uyuni</h5>
           </Card.Title>
            <Card.Body style={{color:'white'}}>
              <p> Depending on the type of fertilizer used, its qualities, or the expected results, there are three ways of application. </p>
            <p> Depending on the type of fertilizer used, its qualities, or the expected results, there are three ways of application. </p>
            </Card.Body>
            <Card.Footer>
            <a href="/description"> 
            <button className="btn btn-sm p-2"
            style={{backgroundColor:'green', color:'white', padding:'0.3rem', borderRadius:'30px 0 30px 30px', border:'none', width:'auto', fontSize:'11px'}}
            >Watch Description</button>
             </a>
            </Card.Footer>
            </Col>     
        <Col md={3} className='' style={{color:'#d9d9d9'}} >
      <h5 className="text-center">Top Rated</h5><hr />
           <div className=""> 
            <p>Depending on the type of fertilizer used, its qualities, or the expected results, there are three ways of application.</p>
            <p>Depending on the type of fertilizer used, its qualities, or the expected results, there are three ways of application.</p>
            <p>Depending on the type of fertilizer used, its qualities, or the expected results, there are three ways of application.</p>        
            </div>
        </Col>
      </Row>
    </Container>
   
    </>
  );
};

export default MySection;