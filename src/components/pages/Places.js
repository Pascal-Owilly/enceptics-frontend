import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import './Places.css';
import horse from '../../images/horse.jpg';
import house2 from '../../images/house2.jpg';
import natpark from '../../images/natpark.jpg';
import beach from '../../images/beach.jpg';
import malindi from '../../images/malindi.jpg';
import mombasa from '../../images/mombasa.jpg';

const Hero = () => {
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
    <Container className='p-4' fluid style={{height:'',  backgroundColor:'#121661'}}>
      <Row className="places ">   
      <h1 className="text-left mt-5 mb-5" style={{color:'#d9d9d9'}}>Explore Your country</h1>   
   
      <Col md={3} className='' style={{marginTop:''}}>
           <Card className="places-cards" style={{backgroundColor:'#ffffff', width: '100%'}}>  
           <Card.Img src={natpark} style={{width:'100%'}}/>
           <Card.Body style={{color:'black'}}>

      <h5 className="" style={{color:'green',  fontWeight: 500}}>Amboseli National Park</h5>
          <p style={{fontSize:'12px', width:'100%'}}> Experience ice skating and all types of entertainment within the heart of Kenya  </p>
           </Card.Body>
            <Card.Footer>
            <a href="/description"> 
            <button className="btn btn-sm "
            style={{backgroundColor:'#121661', color:'white', padding:'0.3rem', borderRadius:'30px 0 30px 30px', border:'none', width:'100px', fontSize:'11px', fontWeight:'bold'}}
            >Explore</button>
             </a>
            </Card.Footer>
            </Card>
      </Col>  
      <Col md={3} className='' style={{marginTop:'0'}}>
           <Card className="places-cards" style={{backgroundColor:'#ffffff', width: '100%'}}>  
           <Card.Img src={malindi} style={{width:'100%'}}/>
           <Card.Body style={{color:'black'}}>

      <h5 className="mt-2" style={{color:'green',  fontWeight: 500}}>Cool Beaches of Malindi</h5>
              <p style={{fontSize:'12px', width:'100%'}}> Experience the ocean breeze in the luxurious beach of Mombasa Pwani  </p>
           </Card.Body>
            <Card.Footer>
            <a href="/description"> 
            <button className="btn btn-sm"
            style={{backgroundColor:'#121661', color:'white', padding:'0.3rem', borderRadius:'30px 0 30px 30px', border:'none', width:'100px', fontSize:'11px', fontWeight:'bold'}}
            >Explore</button>
             </a>
            </Card.Footer>
            </Card>


      </Col> 
      <Col md={3} className='' style={{marginTop:'0'}}>
           <Card className="places-cards" style={{backgroundColor:'#ffffff', width: '100%'}}>  
           <Card.Img src={house2} style={{width:'100%', height: '195px'}}/>
           <Card.Body style={{color:'black'}}>

      <h5 className="mt-2" style={{color:'green',  fontWeight: 500}}>Mombasa Kenya</h5>
              <p style={{fontSize:'12px', width:'100%'}}> Experience the ocean breeze in the luxurious beach of Mombasa Pwani  </p>
           </Card.Body>
            <Card.Footer>
            <a href="/description"> 
            <button className="btn btn-sm "
            style={{backgroundColor:'#121661', color:'white', padding:'0.3rem', borderRadius:'30px 0 30px 30px', border:'none', width:'100px', fontSize:'11px', fontWeight:'bold'}}
            >Explore</button>
             </a>
            </Card.Footer>
            </Card>


      </Col> 


        <Col md={3} className='' style={{color:'#ffffff'}} >
      
           <div className=""> 

           {/* START TRENDING SLIDE SHOW */}
           <Container fluid style={{height:'auto', width:'auto', overflow:'hidden', padding:0}} className="team-title  slideshow-container">
                    <div style={{textAlign:'center',marginTop:''}} >
                    <h4 style={{fontWeight:'bold'}}>Trending</h4>
                    <hr />
                         <div className="slideshow">
                         
                         
                         <div ref={slideshowContainerRef} className="slideshow__wrapper">       
                              {teamMembers.map((member, index) => (
                              <div
                              key={index}
                              className={`slideshow__slide ${
                                   index === currentSlide ? "active" : ""
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
              <div className="slideshow__info" style={{color:'goldenrod'}}>
                <h2 className="slideshow__name">{member.name}</h2>
                <p style={{color:'#fff', fontSize:'12px'}} className="slideshow__position">{member.position}</p>
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

        <Col md={3} className='mt-4' style={{marginTop:'0'}}>
           <Card className="places-cards" style={{backgroundColor:'#ffffff', width: '100%'}}>  
           <Card.Img src={beach} style={{width:'100%'}}/>
           <Card.Body style={{color:'black'}}>

      <h5 className="" style={{color:'green',  fontWeight: 500}}>Pwani</h5>
              <p style={{fontSize:'12px', width:'100%'}}> Experience ice skating and all types of entertainment within the heart of Kenya  </p>
           </Card.Body>
            <Card.Footer>
            <a href="/description"> 
            <button className="btn btn-sm "
            style={{backgroundColor:'#121661', color:'white', padding:'0.3rem', borderRadius:'30px 0 30px 30px', border:'none', width:'100px', fontSize:'11px', fontWeight:'bold'}}
            >Explore</button>
             </a>
            </Card.Footer>
            </Card>
      </Col> 

      <Col md={3} className='mt-4' style={{marginTop:'0'}}>
           <Card className="places-cards" style={{backgroundColor:'#ffffff', width: '100%'}}>  
           <Card.Img src={mombasa} style={{width:'100%'}}/>
           <Card.Body style={{color:'black'}}>

      <h5 className="" style={{color:'green',  fontWeight: 500}}>Panary Nairobi</h5>
              <p style={{fontSize:'12px', width:'100%'}}> Experience ice skating and all types of entertainment within the heart of Kenya  </p>
           </Card.Body>
            <Card.Footer>
            <a href="/description"> 
            <button className="btn btn-sm "
            style={{backgroundColor:'#121661', color:'white', padding:'0.3rem', borderRadius:'30px 0 30px 30px', border:'none', width:'100px', fontSize:'11px', fontWeight:'bold'}}
            >Explore</button>
             </a>
            </Card.Footer>
            </Card>
      </Col> 

      <Col md={3} className='mt-4' style={{marginTop:'0'}}>
           <Card className="places-cards" style={{backgroundColor:'#ffffff', width: '100%'}}>  
           <Card.Img src={horse} style={{width:'100%'}}/>
           <Card.Body style={{color:'black'}}>

      <h5 className="" style={{color:'green',  fontWeight: 500}}>Horse Racing Nairobi</h5>
              <p style={{fontSize:'12px', width:'100%'}}> Experience ice skating and all types of entertainment within the heart of Kenya  </p>
           </Card.Body>
            <Card.Footer>
            <a href="/description"> 
            <button className="btn btn-sm "
            style={{backgroundColor:'#121661', color:'white', padding:'0.3rem', borderRadius:'30px 0 30px 30px', border:'none', width:'100px', fontSize:'11px', fontWeight:'bold'}}
            >Explore</button>
             </a>
            </Card.Footer>
            </Card>
      </Col>         
      </Row>
    </Container>
   
    </>
  );
};

export default Hero;