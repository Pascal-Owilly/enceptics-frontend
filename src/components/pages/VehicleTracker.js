import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMapGL, { Marker } from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = 'your_mapbox_access_token';

function VehicleTracker({ vehicleId }) {
  const [vehiclePosition, setVehiclePosition] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10,
  });

  useEffect(() => {
    axios.get(`/api/get-vehicle-location/${vehicleId}/`)
      .then(response => {
        const { latitude, longitude } = response.data;
        setVehiclePosition({ latitude, longitude });
        setViewport({ ...viewport, latitude, longitude });
      })
      .catch(error => {
        console.error('Error fetching vehicle location:', error);
      });
  }, [vehicleId]);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="400px"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        {vehiclePosition && (
          <Marker
            latitude={vehiclePosition.latitude}
            longitude={vehiclePosition.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div>Vehicle</div>
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
}

export default VehicleTracker;