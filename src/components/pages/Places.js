import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Places.css';
import PlaceInfo from "./PlaceInfo";
import Cookies from 'js-cookie';
import { HiChatAlt2 } from "react-icons/hi";

import authService from './authenticate/authService'; // Make sure the path is correct

import { checkUserRole } from './authenticate/CheckUserRoleUtils'; // Update the path accordingly



const Destination = () => {

  const [userRole, setUserRole] = useState('loading'); // Initialize with 'loading'

  useEffect(() => {
    // Check user role and update state
    checkUserRole().then((role) => {
      setUserRole(role);
    })
    });

  const navigate = useNavigate();

  function resizeImage(file, maxWidth, maxHeight, callback) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
  
    img.onload = function () {
      const width = img.width;
      const height = img.height;
  
      let newWidth = width;
      let newHeight = height;
  
      if (width > maxWidth) {
        newWidth = maxWidth;
        newHeight = (height * maxWidth) / width;
      }
  
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = (width * maxHeight) / height;
      }
  
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
  
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
      canvas.toBlob(function (blob) {
        callback(blob);
      }, file.type);
    };
  }
 
  const baseUrl = 'http://127.0.0.1:8000/'

  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState({
    name: '',
    description: '',
    cover_image: null,
    price: null,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [destinationToUpdate, setDestinationToUpdate] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);


  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedDestinationInfo, setSelectedDestinationInfo] = useState({});
  const [placeInfo, setPlaceInfo] = useState(null);
  const [showPlaceInfo, setShowPlaceInfo] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [price, setPrice] = useState(null); // Initialize with an appropriate default value
  const [placeBookingData, setPlaceBookingData] = useState({}); // Initialize with an appropriate default value


  const fetchPlaceInfo = (destinationId) => {
    axios.get(`${baseUrl}/api/place-info/${destinationId}/`)
      .then(response => {
        setPlaceInfo(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleSeeDescriptionClick = (destination) => {
    fetchPlaceInfo(destination.id);
    setSelectedDestination(destination);
  
    // Store the booking data in state, including price
    const placeBookingData = {
      placeName: destination.name,
      price: destination.price,
      // Add other relevant booking data here
      
    };
  
    // Navigate to the PlaceInfo component with query parameters
    navigate(`/place-info/${destination.id}?placeName=${encodeURIComponent(destination.name)}&price=${destination.price}`, {
      state: { placeBookingData },
    });
  };
  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDestinationToUpdate(null);
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = () => {
    axios.get(`${baseUrl}/api/places/`)
      .then(response => {
        setDestinations(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }

  const createNewDestination = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newDestination.name);
      formData.append('description', newDestination.description);
      formData.append('price', newDestination.price);
      formData.append('cover_image', newDestination.cover_image);

      const response = await axios.post(`${baseUrl}/api/places/`, formData);
      setDestinations([response.data, ...destinations]);
      console.log('Cover Image:', newDestination.cover_image);

      navigate('/info');
      closeModal();
      window.location.reload();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const [errorMessage, setErrorMessage] = useState(null); // Add state for error messages


  // Handle Axios errors and set error message
  const handleAxiosError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // Extract error data from the response
      const { data, status } = error.response;
      const message = data.detail || 'An error occurred on the server.';
      setErrorMessage(`Server error (${status}): ${message}`);
    } else if (error.request) {
      // The request was made but no response was received
      setErrorMessage('Network error: Unable to connect to the server.');
    } else {
      // Something else happened while setting up the request
      setErrorMessage('An error occurred. Please try again later.');
    }
  };
  
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newDestination.name);
      formData.append('description', newDestination.description);
      formData.append('price', newDestination.price);
      formData.append('cover_image', newDestination.cover_image);
  
      const response = await axios.put(`${baseUrl}/api/places/${destinationToUpdate.id}/`, formData);
      closeModal();
      fetchDestinations();
      console.log('Cover Image:', newDestination.cover_image);
    } catch (error) {
      handleAxiosError(error);
    }
  };
    
  
  const handleNewDestinationChange = (event) => {
    const { name, value, files } = event.target;
  
    if (name === 'cover_image') {
      const file = files[0];
      
      resizeImage(file, 400, 400, (resizedBlob) => {
        const resizedFile = new File([resizedBlob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
        
        setNewDestination((prevData) => ({
          ...prevData,
          [name]: resizedFile,
        }));
      });
    } else {
      setNewDestination((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  
  const openUpdateModal = (destination) => {
    setDestinationToUpdate(destination);
    setNewDestination({
      name: destination.name,
      description: destination.description,
      price: destination.price,
      cover_image: destination.cover_image,
    });
    setIsUpdateMode(true); // Set update mode to true
    openModal();
  };


  const deleteDestination = (id) => {
    axios.delete(`${baseUrl}/api/places/${id}/`)
      .then(response => {
        fetchDestinations();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <Container className='p-4' fluid style={{ minHeight: '100vh', backgroundColor: '#121661' }}>
        <div className="" style={{marginTop:'10vh'}}>
  <h1 className="places-span" style={{  color:'#a9a9a9', fontWeight:'500' }}>Adventure awaits. Let your vacay begin</h1>
  {userRole === 'superuser' && ( // Render only if user is a superuser
            <button className="mt-4 p-1 what-card-btn" style={{ backgroundColor: '#121661', color: '#d9d9d9' }} onClick={openModal}>
              <FaPlus /> Add New Destination
            </button>
          )}
  <hr className="text-secondary"/>

</div>
    
        {isLoading ? ( 
          <p style={{color:'#f9f9f9', fontSize:'23px', textAlign:'center', marginTop:''}}>Loading...</p>
          ) : destinations.length === 0 ? (
          <p style={{color:'#f9f9f9', fontSize:'23px', textAlign:'center', marginTop:''}}>Nothing here yet</p>
        ) : (
          <div className="places-cards-container">
            <div className="places-cards-grid">
              {destinations.map((destination) => (
                <div key={destination.id}>
                  <Card className="what-card-places" style={{ backgroundColor: '#121661', width:'100%', height:'480px'}}>
                    <Card.Img src={destination.cover_image} style={{ width: '100%', height:'180px' }} />
                    <Card.Body style={{ color: 'black' }}>
                      <h5 className="mt-2" style={{ color: 'yellow', fontWeight: 500 }}>
                        {destination.name}
                      </h5>
                      <p style={{ color: '#fff', fontWeight: 500,width:'100%' }}>{destination.description}</p>
                      <span className="what-card-navbar btn btn-sm" style={{ fontSize: '13px', color:'goldenrod', float:'right', fontWeight:'bold' }}>
                        Ksh {destination.price}
                      </span>
                    </Card.Body>
                    <Card.Footer>
                      <button
                        className="btn btn-outline-secondary btn-sm text-dark mb-2"
                        style={{ width: '100%', backgroundColor: 'rgb(18, 187, 18)', fontWeight: 'bold' }}
                        onClick={() => handleSeeDescriptionClick(destination)}
                      >
                        See description
                      </button> 

                      <hr className="text-secondary"/> 
                      <div className="d-flex mb-1 mt-1">
                      {userRole === 'superuser' && ( // Render only if user is a superuser

                        <button className=" btn btn-sm btn-outline-primary" onClick={() => openUpdateModal(destination)}>
                          <FaEdit /> Edit
                        </button>
                      )}

                        &nbsp;&nbsp;&nbsp;
                        {userRole === 'superuser' && ( // Render only if user is a superuser

                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteDestination(destination.id)}>
                          <FaTrash /> Delete
                        </button>
                        )}
                      </div>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
        <Modal 
          show={modalIsOpen}
          onHide={closeModal}
          centered
          style={{
            zIndex: 9999,
            // color: '#fff',
            backgroundColor: 'rgb(0, 0, 0, 0.7)',
            width: '100%',   
            height: '100%',  
            margin: '0',     
          }}  
        >
        <Modal.Header className="m-1 " closeButton style={{ backgroundColor: '#121661', borderRadius: '10px' }}>
          <Modal.Title className="text-center  ">
            <h3 className="text-secondary" style={{ color: '' }}>
              {isUpdateMode ? 'Update Destination' : 'Add New Destination'}
            </h3>
          </Modal.Title>
        </Modal.Header>
 
          <Modal.Body className=" text-secondary m-1" style={{ height: '100%', width:'auto', backgroundColor: '#121661', borderRadius:'10px' }}>
            <div className="container">
              <div className="row">
              <p>Add place info with a short description</p>
         
              <div className='col-md-8 m-auto'>

                <p style={{ fontSize:'18px'}}>Upload cover image</p>
              
                <input
                  className="bg-white"
                  style={{ border: '1px solid #121661', width: '100%', color: 'rgb(18, 187, 87)' }}
                  type="file"
                  name="cover_image"
                  onChange={handleNewDestinationChange} // Make sure the event handler is correctly wired up
                />
           
            <p style={{fontSize:'18px'}}>Name of destination</p>
            <p>
            <input
              className="bg-white"
              style={{ border: '1px solid #121661', width: '100%', color: 'rgb(18, 187, 87)' }}
              type="text"
              name='name'
              placeholder="Example, Salar De Uyuni"
              value={newDestination.name}
              onChange={handleNewDestinationChange}
              maxLength={23} // 12 words x 5 characters per word (adjust this based on your typical word length)
            />

            </p>
            <p style={{fontSize:'18px'}}>Short description</p>
            <p>
            <input
              className="bg-white"
              style={{ border: '1px solid #121661', width: '100%', color: 'rgb(18, 187, 87)' }}
              type="text"
              name='description'
              placeholder="Example, Salar De Uyuni"
              value={newDestination.description}
              onChange={handleNewDestinationChange}
              maxLength={106} // 12 words x 5 characters per word (adjust this based on your typical word length)
            />

            </p>
            <p style={{fontSize:'18px'}}>Price for this destination</p>
            <p>
              <input
                className="bg-white"
                style={{ border: '1px solid #121661', width: '100%', color:'rgb(18, 187, 87)' }}
                type="number"
                name='price'
                value={newDestination.price}
                onChange={handleNewDestinationChange}
              />
            </p>  
            </div>
   
  
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="m-1" style={{ backgroundColor: '#121661', color: '#d9d9d9', borderRadius: '10px' }}>
  <button className="btn btn-outline-primary" style={{ fontWeight: 'bold', width: '100%' }} onClick={isUpdateMode ? handleUpdate : createNewDestination}>
    {isUpdateMode ? 'Update' : 'Submit'}
  </button>
</Modal.Footer>
        </Modal>
        {showPlaceInfo && selectedDestination && (
  <div>
    <PlaceInfo
      destinationId={selectedDestination.id}
      price={price} // Pass the price as a prop
      placeBookingData={placeBookingData} // Pass the bookingData as a prop
      selectedDestination={selectedDestination}
    />
    <button className="btn btn-outline-secondary text-dark" onClick={() => setSelectedDestination(null)}>
      Back to Destinations
    </button>
  </div>
)}
      </Container>
    </>
  );
};

export default Destination;
