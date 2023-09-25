import React, { useState, useEffect } from "react";
import axios from "axios";

const PlaceInfoForm = () => {
  const [placeInfo, setPlaceInfo] = useState({
    pictures: null,
    weather_forecast: "",
    videos: null,
    destination: null, 
  });

  const [destinations, setDestinations] = useState([]); // Store the list of destinations

  useEffect(() => {
    // Fetch the list of destinations when the component mounts
    axios
      .get("http://127.0.0.1:8000/api/places/") // Replace with your API endpoint for fetching destinations
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching destinations", error);
      });
  }, []);

  const handlePlaceInfoChange = (event) => {
    const { name, value, files } = event.target;

    const updatedPlaceInfo = { ...placeInfo };

    if (name === "pictures" || name === "videos") {
      updatedPlaceInfo[name] = files[0];
    } else {
      updatedPlaceInfo[name] = value;
    }

    setPlaceInfo(updatedPlaceInfo);
  };

  const createPlaceInfo = () => {
    if (!placeInfo.destination || placeInfo.destination.trim() === "") {
      alert("Please select a destination");
      return;
    }
    // Find the selected destination object based on its name
    const selectedDestination = destinations.find(
      (destination) => destination.name === placeInfo.destination
    );

    if (!selectedDestination) {
      console.error("Selected destination not found");
      return;
    }

    const placeInfoData = new FormData();
    placeInfoData.append("pictures", placeInfo.pictures);
    placeInfoData.append("weather_forecast", placeInfo.weather_forecast);
    placeInfoData.append("videos", placeInfo.videos);
    placeInfoData.append("destination", selectedDestination.id); // Use the ID of the selected destination

    axios
      .post("http://127.0.0.1:8000/api/place-info/", placeInfoData)
      .then((response) => {
        // Handle success, e.g., reset form or show a success message
        alert("Place info created successfully", response.data);
      })
      .catch((error) => {
        // Handle errors, e.g., display error message
        alert("Error creating place info", error);
      });
  };

  return (
    <div className="text-center " style={{ height: "100vh" }}>
      <h2>Create Place Info</h2>
      <form className="text-center bg-secondary p-2" style={{ height: "300px" }}>
        <div>
          <label>Pictures:</label>
          <input type="file" name="pictures" onChange={handlePlaceInfoChange} encType="multipart/form-data" 
/>
        </div>
        <div>
          <p>
            <label>Weather Forecast:</label>
          </p>
          <p>
            <input
              type="text"
              name="weather_forecast"
              value={placeInfo.weather_forecast}
              onChange={handlePlaceInfoChange}
            />
          </p>
        </div>
        <div>
          <p>
            <label>Destination</label>
          </p>
          <p>
            {/* Display a select dropdown with destination options */}
            <select
              name="destination"
              value={placeInfo.destination}
              onChange={handlePlaceInfoChange}
            >
              <option value="">Select a destination</option>
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.name}>
                  {destination.name}
                </option>
              ))}
            </select>
          </p>
        </div>
        <p>
        <div>
          <label>Videos:</label>
          <input type="file" name="videos" onChange={handlePlaceInfoChange} />
        </div>
        </p>
        <button type="button" onClick={createPlaceInfo}>
          Create Place Info
        </button>
      </form>
    </div>
  );
};

export default PlaceInfoForm;
