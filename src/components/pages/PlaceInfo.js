import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { Carousel } from 'react-bootstrap';

const PlaceInfo = () => {
  const { id } = useParams();

  const [placeInfo, setPlaceInfo] = useState(null);
  const [placeName, setPlaceName] = useState(""); 

  useEffect(() => {
    fetchPlaceInfo(id);
  }, [id]);

  const fetchPlaceInfo = (id) => {
    axios
      .get(`http://127.0.0.1:8000/api/place-info/${id}/`)
      .then((response) => {
        setPlaceInfo(response.data);
        fetchPlaceName(response.data.id); // Fetch the place name based on place_id
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
        })
        .catch((error) => {
          console.error(error);
        });
    };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#121661" }}>
      {placeInfo ? (
        <div>
          <div className="container-fluid" style={{ marginTop: "", color: "yellow" }}>
            <div className="row">
              <p mt-5></p>
              <h2 style={{marginTop:'12vh'}}>{placeName}</h2>
              <div className="col-md-7">
                <hr />
                <p style={{ fontSize: "14px", color: "#d9d9d9" }}>{placeInfo.weather_forecast}</p>
                <hr />

                <Carousel>
                  <Carousel.Item>
                    <img src={placeInfo.pictures} alt="img" style={{ width: "100%", maxHeight: "100vh", borderRadius: '10px' }} />
                  </Carousel.Item>
                  {/* Add more Carousel.Items if needed */}
                </Carousel>
              </div>
              <div className="col-md-5 text-center mb-4">
                <h5 className="text-secondary mb-3 text-center">3 Day Weather Forecast for {placeName}</h5>
                <table className="table table-bordered table-hover text-primary" style={{width:'99%', backgroundColor:'#d9d9d9', color:'blue'}}>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Morning (°C)</th>
                      <th>Afternoon (°C)</th>
                      <th>Evening  (°C)</th>
                      <th>Night  (°C)</th>
                      <th>Humidity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monday</td>
                      <td>18°C Sunny</td>
                      <td>22°C Cloudy</td>
                      <td>20°C Rainy</td>
                      <td>15°C Windy</td>
                      <td>65% Clear</td>
                    </tr>
                    <tr>
                      <td>Tuesday</td>
                      <td>18°C Sunny</td>
                      <td>22°C Cloudy</td>
                      <td>20°C Rainy</td>
                      <td>15°C Windy</td>
                      <td>65% Clear</td>
                    </tr>
                    <tr>
                      <td>Wednesday</td>
                      <td>18°C Sunny</td>
                      <td>22°C Cloudy</td>
                      <td>20°C Rainy</td>
                      <td>15°C Windy</td>
                      <td>65% Clear</td>
                    </tr>
                     </tbody>
                </table>
                <hr />
                <button
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
              </div>
            </div>
          </div>
        </div>
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
