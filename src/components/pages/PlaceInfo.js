import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlaceInfo = () => {
  const { id } = useParams(); // Use useParams to get the 'id'

  const [placeInfo, setPlaceInfo] = useState(null);

  useEffect(() => {
    // Use 'id' obtained from useParams instead of 'destinationId'
    fetchPlaceInfo(id);
  }, [id]);

  const fetchPlaceInfo = (id) => {
    axios
      .get(`http://127.0.0.1:8000/profile/place-info/${id}/`)
      .then((response) => {
        setPlaceInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#121661" }}>
      {placeInfo && (
        <div>
  <div className="container-fluid" style={{ marginTop: "10vh", color: "yellow" }}>    
  <h2 className="text-white mt-5">{placeInfo.name}</h2>
          <p className="text-white mt-5">Description: {placeInfo.weather_forecast}</p>
          <p className="text-white mt-5">Destination No: {placeInfo.destination}</p>
          <img src={placeInfo.pictures} alt="Place" style={{width:'200px'}}/>
        </div>
        </div>
      )}
    </div>
  );
};

export default PlaceInfo;
