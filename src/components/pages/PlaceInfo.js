import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { Carousel } from 'react-bootstrap';

const PlaceInfo = ({ destinationId, placeBookingData, selectedDestination }) => {  const { id } = useParams();
  const navigate = useNavigate();
  const [placeInfo, setPlaceInfo] = useState(null);
  const [placeName, setPlaceName] = useState(""); 
  const [ price, setPrice ] = useState(0);
  const location = useLocation(); // Get the location object
  // const { placeBookingData } = location.state || {}; // Access the bookingData from location state


  useEffect(() => {
    fetchPlaceInfo(id);
  }, [id]);

  const fetchPlaceInfo = (id) => {
    axios
      .get(`http://127.0.0.1:8000/api/place-info/${id}/`)
      .then((response) => {
        setPlaceInfo(response.data);
        fetchPlaceName(response.data.id); 

      })
      .catch((error) => {
        console.error(error);
      });
  };

    // Function to fetch the place name
    const fetchPlaceName = (placeId) => {
      axios
        .get(`http://127.0.0.1:8000/api/places/${placeId}/`) // Assuming this is the endpoint to fetch place details
        .then((response) => {
          setPlaceName(response.data.name);
          setPrice(response.data.price);

        })
        .catch((error) => {
          console.error(error);
        });
    };

      // Function to navigate to the booking page with booking data
      const handleProceedToBooking = () => {
        navigate(`/booking?placeName=${encodeURIComponent(placeName)}&price=${price}`);
      };
      

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#121661" }}>
      {placeInfo ? (
        <div>
          <div className="container-fluid" style={{ marginTop: "", color: "yellow" }}>
            <div className="row">
            
              <h2 className="mt-4" style={{marginTop:'vh'}}>{placeName}</h2>

              <div className="col-md-8">
                <hr />
             

                <Carousel style={{width:'100%'}} fade={false} controls={true} indicators={true} interval={3000} keyboard={false}>
                  <Carousel.Item>
                    <img className="mb-5" src={placeInfo.pictures} alt="img" style={{ width: "100%"}} />
                    <Carousel.Caption style={{backgroundColor:'rgb(0, 0, 0, 0.5)'}}>
                  </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Carousel.Caption style={{backgroundColor:'rgb(0, 0, 0, 0.7)'}}>
                    <p style={{color:'white', width: "60%", fontSize:'18px', bottom:0, marginRight: '10rem', marginTop:'8rem'}} >{placeInfo.weather_forecast}</p>
                  </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                <Carousel.Caption style={{backgroundColor:'rgb(0, 0, 0, 0.7)'}}>
                <video width="640" height="360" controls>
                  <source src={placeInfo.videos} type="video/mp4" />
                  <source src={placeInfo.videos}  type="video/webm" />
                  <source src={placeInfo.videos}  type="video/ogg" />
                  Your browser does not support the video tag.
              </video>               
            </Carousel.Caption>
                </Carousel.Item>
    

                  {/* Add more Carousel.Items if needed */}
                </Carousel>
              </div>
              <div className="col-md-3 text-center mb-4">
                <h5 className="text-secondary mb-3 text-center">2 Day Weather Forecast for {placeName}</h5>
                <table className="table table-bordered table-hover" style={{}}>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Morning (°C)</th>
                      <th>Afternoon (°C)</th>
                      <th>Evening  (°C)</th>
                      <th>Night  (°C)</th>
                   

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monday</td>
                      <td>18°C Sunny</td>
                      <td>22°C Cloudy</td>
                      <td>20°C Rainy</td>
                      <td>15°C Windy</td>

                    </tr>
                    <tr>
                      <td>Tuesday</td>
                      <td>18°C Sunny</td>
                      <td>22°C Cloudy</td>
                      <td>20°C Rainy</td>
                      <td>15°C Windy</td>

                    </tr>

                     </tbody>
                </table>
                <hr />

                <Link to={`/booking?placeName=${encodeURIComponent(placeName)}&price=${price}`}>                    <button
                      className="what-card-price btn mt-5 btn-sm"
                      style={{
                        fontSize: "18px",
                        color: "goldenrod",
                        fontWeight: "bold",
                        width: "auto",
                        textAlign: 'left',
                      }}
                    >
                      Proceed to booking &nbsp;&nbsp; <FaArrowRight />
                    </button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      ) : placeInfo === 0 ? (
        <p 
        style={{
          display: "flex",
          alignItems: "center",
          height: "50vh",
          justifyContent: "space-around",
          color: "white",
          fontSize: "22px",
        }}>Nothing here yet</p>
        ) : (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            height: "50vh",
            justifyContent: "space-around",
            color: "white",
            fontSize: "22px",
          }}
        >
          Hang tight ...
        </p>
      )}
    </div>
  );
};

export default PlaceInfo;
