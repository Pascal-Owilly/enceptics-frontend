import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../images/heroimg.jpg';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './authenticate/Login';


const About = () => {

  const [about, setAbout] = useState([]);


  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/about/', {

      });
      setAbout(response.data);
    } catch (error) {
      console.error('Error fetching Info:', error);
    } 
  };

  if(!Login){
    return <Login replace to="/login" />
  }
  
  return (
    <>
      <div style={{  backgroundColor:'#121661', color:'#2f8e92' }}>
        

        <div className="container" style={{height:'100vh', margin:'auto'}}>
          <div className="row">
            <div className="col-md-10 mt-5" >
              {about.map((about) => (
                <Card className='mt-5' key={about.id} style={{ width: '100%', margin:'auto' }}>
                  <div>
                    <div className="col-md-8" >
                      <Card.Body>
                        <Card.Text >
                        <h4>About us</h4>
                          {about.desc}
                        </Card.Text>
                        

                        <Card.Text style={{ }}>
                        <h4>Mission</h4>
                         {about.mission}
                        </Card.Text>
                        <div>
                        <Card.Text style={{  }}>
                          <h4>Vision</h4>
                           {about.vision}
                        </Card.Text>
                        </div>
                      </Card.Body>
                    </div>
                  </div>
                </Card>
              ))}

        <div>
          </div>

        </div>
            <div className="col-md-2 text-center mt-5">
             <h4 className='mt-5'>Navigate to: </h4> <hr />
                <p><Link style={{textDecoration:'none'}} to='/'> Home</Link></p>
                <p><Link style={{textDecoration:'none'}} to='/blogs'>Blog </Link></p>      
                <p><Link style={{textDecoration:'none'}} to='/places'>Places </Link></p>
                <p><Link style={{textDecoration:'none'}} to='/hotels'>Hotels </Link></p>
            </div>
            </div>
            </div>
        
      </div>
    </>
  );
};

export default About;
