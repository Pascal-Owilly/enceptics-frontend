import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Places.css';
import PlaceInfo from "./PlaceInfo";

const Destination = () => {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState({
    name: '',
    description: '',
    cover_image: null,
    price: 0,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [destinationToUpdate, setDestinationToUpdate] = useState(null);

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedDestinationInfo, setSelectedDestinationInfo] = useState({});
  const [placeInfo, setPlaceInfo] = useState(null);
  const [showPlaceInfo, setShowPlaceInfo] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const fetchPlaceInfo = (destinationId) => {
    axios.get(`http://127.0.0.1:8000/api/place-info/${destinationId}/`)
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
    navigate(`/place-info/${destination.id}`); 
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
    axios.get('http://127.0.0.1:8000/api/places/')
      .then(response => {
        setDestinations(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }

  const handleNewDestinationChange = (event) => {
    const { name, value, files } = event.target;
    
    if (name === 'cover_image') {
      setNewDestination((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setNewDestination((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const createNewDestination = () => {
    const formData = new FormData();
    formData.append('name', newDestination.name);
    formData.append('description', newDestination.description);
    formData.append('price', newDestination.price);
    formData.append('cover_image', newDestination.cover_image);

    axios.post('http://127.0.0.1:8000/api/places/', formData)
      .then(response => {
        setDestinations([response.data, ...destinations]);
        setNewDestination({
          name: '',
          description: '',
          price: 0,
          cover_image: null,
        });
        closeModal();
      })
      .catch(error => {
        console.error(error);
        console.log('Not successful');
      });
  };

  const openUpdateModal = (destination) => {
    setDestinationToUpdate(destination);
    setNewDestination({
      name: destination.name,
      description: destination.description,
      price: destination.price,
      cover_image: destination.cover_image,
    });
    openModal();
  };

  const handleUpdate = () => {
    const updatedData = {
      name: newDestination.name,
      description: newDestination.description,
      price: newDestination.price,
      cover_image: newDestination.cover_image,
    };

    axios
      .put(`http://127.0.0.1:8000/api/places/${destinationToUpdate.id}/`, updatedData)
      .then((response) => {
        closeModal();
        fetchDestinations();
      })
      .catch((error) => {
        console.error("Update error:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
        }
      });
  };

  const deleteDestination = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/places/${id}/`)
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
        <div className="mt-5">
          <button className="mb-4 mt-5 p-1 what-card" style={{ backgroundColor: '#121661', color: '#d9d9d9' }} onClick={openModal}>
            <FaPlus /> Add New Destination
          </button>
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
                  <Card className="places-cards" style={{ backgroundColor: '#121661', width:'100%', height:'450px'}}>
                    <Card.Img src={destination.cover_image} style={{ width: '100%', height:'210px' }} />
                    <Card.Body style={{ color: 'black' }}>
                      <h5 className="mt-2" style={{ color: 'yellow', fontWeight: 500 }}>
                        {destination.name}
                      </h5>
                      <p style={{ color: '#fff', fontWeight: 500,width:'100%' }}>{destination.description}</p>
                      <p className="what-card-price btn btn-sm " style={{ fontSize: '13px', color:'goldenrod', float:'right', fontWeight:'bold' }}>
                        Ksh {destination.price}
                      </p>
                    </Card.Body>
                    <Card.Footer>
                      <button
                        className="btn btn-outline-secondary text-dark"
                        style={{ width: '100%', backgroundColor: 'rgb(18, 187, 18)', fontWeight: 'bold' }}
                        onClick={() => handleSeeDescriptionClick(destination)}
                      >
                        See description
                      </button> 
                      <hr className="text-white" />
                      <div className="d-flex">
                        <button className=" btn btn-sm btn-outline-primary" onClick={() => openUpdateModal(destination)}>
                          <FaEdit /> Edit
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteDestination(destination.id)}>
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
        <Modal show={modalIsOpen} onHide={closeModal} centered style={{ zIndex: 9999, color: '#fff', backgroundColor:'rgb(0,  0, 0, 0.7)'}}>
          <Modal.Header className="m-1 " closeButton style={{ backgroundColor: '#121661', color: '#fff', borderRadius:'30px' }}>
            <Modal.Title className="text-center mx-2 text-white">{destinationToUpdate ? 'Update Destination' : 'Add New Destination'}</Modal.Title>
          </Modal.Header>
          <Modal.Body className=" text-secondary m-2" style={{ height: '350px', backgroundColor: '#121661',borderRadius:'10px' }}>
            <form className="text-white text-center"  style={{borderRadius:'20px' }}>
              <p style={{ fontSize:'18px'}}>Upload cover image</p>
              <p>
                <input
                  className="bg-white p-1"
                  style={{ border: '1px solid #121661', width: '70%', color:'rgb(18, 187, 87)' }}
                  type="file"
                  name='cover_image'
                  onChange={handleNewDestinationChange}
                />
              </p>
              <p style={{fontSize:'18px'}}>Enter name of destination</p>
              <p>
                <input
                  className="bg-white  p-1"
                  style={{ border: '1px solid #121661', width: '70%', color:'rgb(18, 187, 87)' }}
                  type="text"
                  name='name'
                  placeholder="Example, Salar De Uyuni"
                  value={newDestination.name}
                  onChange={handleNewDestinationChange}
                />
              </p>
              <p style={{fontSize:'18px'}}>Enter description</p>
              <p>
                <input
                  className="bg-white p-1"
                  style={{ border: '1px solid #121661', width: '70%', color:'rgb(18, 187, 87)' }}
                  type="text"
                  name='description'
                  placeholder="Welcome to Salar de uyuni"
                  value={newDestination.description}
                  onChange={handleNewDestinationChange}
                />
              </p>
              <p style={{fontSize:'18px'}}>Price for  this destination</p>
              <p>
                <input
                  className="bg-white p-1"
                  style={{ border: '1px solid #121661', width: '70%', color:'rgb(18, 187, 87)' }}
                  type="text"
                  name='price'
                  value={newDestination.price}
                  onChange={handleNewDestinationChange}
                />
              </p>
            </form>
          </Modal.Body>
          <Modal.Footer className="m-1" style={{ backgroundColor: '#121661', color: '#d9d9d9', borderRadius:'10px' }}>
            <button className="btn btn-outline-primary" style={{ fontWeight: 'bold', width:'100%' }} onClick={destinationToUpdate ? handleUpdate : createNewDestination}>
              {destinationToUpdate ? 'Update' : 'Submit'}
            </button>
          </Modal.Footer>
        </Modal>
        {showPlaceInfo && selectedDestination && (
          <div>
            <PlaceInfo destinationId={selectedDestination.id} />
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
