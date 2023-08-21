import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    axios.get(`https://contact-mail.mwani.africa/check-email/${email}`)
      .then((response) => {
        if (response.data.exists) {
          setSubscriptionStatus('already-subscribed');
        } else {
          axios.post('https://contact-mail.mwani.africa/subscribe/', { email })
            .then((response) => {
              console.log('Form submitted successfully:', response);
              setSubscriptionStatus('success');
              setEmail('');
            })
            .catch((error) => {
              console.error('Form submission failed:', error);
              setSubscriptionStatus('error');
              setEmail('');
            });
        }
      })
      .catch((error) => {
        console.error('Error checking email:', error);
        setSubscriptionStatus('error');
        setEmail('');
      });
  };
  

  return (
    <>
    <footer className="footer-content "
        style={{
          color: "white",
        }}>
      <Container fluid className='footer-container' style={{backgroundColor:'#121661'}}>
      
        <Row ><hr style={{color:'rgb(18,187, 18'}} />
          <Col md={4} className='mt-4'>
            <h5 style={{color:'#ddd2d2'}} className='text-left' >Site Links</h5>
            <ul className="list-unstyled text-white text-left ">
              <li><Link className="list-unstyled text-white" style={{textDecoration:'none', fontStyle:'italic', fontSize:'12px'}}  onClick={() => window.scrollTo(0, 0)} to="/about">About Us</Link></li>
              <li><Link className="list-unstyled text-white" style={{textDecoration:'none', fontStyle:'italic', fontSize:'12px'}}  onClick={() => window.scrollTo(0, 0)} to="#">Travel Insights</Link></li>
              <li><Link className="list-unstyled text-white" style={{textDecoration:'none', fontStyle:'italic', fontSize:'12px'}}  onClick={() => window.scrollTo(0, 0)} to="/#">Weather forecast</Link></li>
              <li><Link className="list-unstyled text-white" style={{textDecoration:'none', fontStyle:'italic', fontSize:'12px'}}  onClick={() => window.scrollTo(0, 0)} to="/#">Top rated destinations</Link></li>
            </ul>
          </Col>
          
          <Col md={4 } className='mt-4'>
          <p style={{color:'#ddd2d2'}}>Subscribe to receive vacation insights</p>
                <Card className='subscription-card' style={{width: '80%', backgroundColor:'rgb(18, 187,18'}}>
                {subscriptionStatus === 'success' && (
        <div style={{backgroundColor:'transparent', color:'white', fontWeight:'500', fontSize:'18px', borderRadius:'10px', border:'none', transition:'2s easeIn'}} className="alert alert-success text-center" role="alert">
          Subscription successful, thank you!
        </div>
      )}
      {subscriptionStatus === 'error' && (
        <div style={{backgroundColor:'transparent', color:'red', fontWeight:'500', fontSize:'18px', border:'none', transition:'2s easeIn'}} className="alert alert-danger text-center" role="alert">
          Oops!, that didn't work, try again
        </div>
)}
        {subscriptionStatus === 'already-subscribed' && (
          <div style={{backgroundColor:'green', color:'greenyellow', fontWeight:'500', fontSize:'18px', borderRadius:'10px', border:'none', transition:'2s easeIn'}} className="alert alert-warning text-center" role="alert">
            You are already subscribed with this email address!
          </div>
        
      )}    
            
                <Card.Body>
                  <Card.Text className='subscription-title'></Card.Text>
                  <Form className='subscription-email' onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label></Form.Label>
                      <Form.Control className='sub-input' type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} required />
                      <Form.Text className="text-muted">      
                      </Form.Text>
                    </Form.Group>
                    <div style={{textAlign:'right'}}>
                    <Button className='sub-btn btn btn-sm mt-3' style={{backgroundColor:'#121661', color:'#ddd2d2', border:'none', fontWeight:'bold', letterSpacing:'2px', textAlign:'right'}} variant="danger" type="submit">
                      Subscribe
                    </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col> 

            <Col md={4} className='mt-4 text-center'>
                <h5 style={{color:'#ddd2d2', textAlign:'center'}}>Contact & Location</h5>
                <p style={{fontSize:'12px'}}>Westlands, Nairobi - +254712154175</p>
                <p style={{fontFamily:'cursive'}}>View location in map</p>
                <iframe
                    title="Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.364476102313!2d36.801273917180545!3d-1.268124685200886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173c0a1f9de7%3A0xad2c84df1f7f2ec8!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1637096543542!5m2!1sen!2ske"
                    style={{width:"200px", height:"50px", border:'3px solid #cceeee', backgroundColor:'#121661', borderRadius:'10px', textAlign:'center', cursor:'pointer'}}  
                    allowFullScreen=""
                    loading="lazy">
                </iframe>

            </Col>
          </Row>
        </Container>
        <Container fluid style={{backgroundColor: '#121661'}}>
        <Row  style={{padding:''}}>    
        <br />  
        
          <Col md={12} style={{ color: 'white',textAlign:'center' }} >
          <hr style={{color:'rgb(18,187, 18'}}/>
            <p className='' style={{ color: '#fff', fontSize:'14px' }}>Enceptics &copy; 2023</p> 
          </Col> 
          <Col className='text-center' md={4} style={{ color: 'white', fontWeight:'bold', textAlign:'right' }} >
          </Col>         
          </Row>    
      </Container>  
    </footer>
    </>
  );
}

export default Footer;