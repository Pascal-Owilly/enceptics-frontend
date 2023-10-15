import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceInfoForm = () => {
  const navigate = useNavigate();

  const [placeInfo, setPlaceInfo] = useState({
    pictures: null,
    weather_forecast: "",
    videos: null,
    destination: null,
  });

  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/places/")
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
      resizeImage(files[0], 500, 500, (resizedBlob) => {
        const resizedFile = new File([resizedBlob], files[0].name, {
          type: files[0].type,
          lastModified: Date.now(),
        });
        updatedPlaceInfo[name] = resizedFile;
        setPlaceInfo(updatedPlaceInfo);
      });
    } else {
      updatedPlaceInfo[name] = value;
      setPlaceInfo(updatedPlaceInfo);
    }
  };

  const createPlaceInfo = () => {
    if (!placeInfo.destination || placeInfo.destination.trim() === "") {
      alert("Please select a destination");
      return;
    }

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
    placeInfoData.append("destination", selectedDestination.id);

    axios
      .post("http://127.0.0.1:8000/api/place-info/", placeInfoData)
      .then((response) => {
        console.log("Place info created successfully", response.data);
        navigate("/places");
      })
      .catch((error) => {
        alert("Error creating place info", error);
      });
  };

  // Function for image resizing
  function resizeImage(file, maxWidth, maxHeight, callback) {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.src = URL.createObjectURL(file);

    img.onload = function () {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = height * ratio;
      }

      if (height > maxHeight) {
        const ratio = maxHeight / height;
        height = maxHeight;
        width = width * ratio;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        callback(blob);
      }, file.type);
    };
  }

  return (
    <div className="container-fluid" style={{ paddingTop: "50px", backgroundColor: "#121661", height: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className=" p-4 what-card-price" style={{ borderRadius: "10px", backgroundColor: '#121661' }}>
            <h4 className="text-secondary mb-4">Add more description for this place</h4>
            <hr className="text-secondary" />
            <div className="form-group">
              <label className="text-secondary">Details</label>
              <textarea
                style={{ backgroundColor: '#d9d9d9' }}
                rows="3"
                className="form-control"
                name="weather_forecast"
                value={placeInfo.weather_forecast}
                onChange={handlePlaceInfoChange}
              />
            </div>
            <div className="form-group">
              <label className="text-secondary">Pictures:</label>
              <input type="file" className="form-control" name="pictures" style={{ backgroundColor: '#d9d9d9' }} onChange={handlePlaceInfoChange} />
            </div>
            <div className="form-group">
              <label className="text-secondary">Destination</label>
              <select
                style={{ backgroundColor: '#d9d9d9' }}
                className="form-control"
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
            </div>
            <div className="form-group">
              <label className="text-secondary">Videos:</label>
              <input type="file" className="form-control" style={{ backgroundColor: '#d9d9d9' }} name="videos" onChange={handlePlaceInfoChange} />
            </div>
            <button type="button" className="btn what-card mt-3 text-secondary" onClick={createPlaceInfo}>
              Create Place Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceInfoForm;
