import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import './Places.css';

const Destination = () => {
  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState({
    name: '',
    description: '',
    cover_image: null,
    price: 0,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [destinationToUpdate, setDestinationToUpdate] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDestinationToUpdate(null); // Reset the destination to update
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = () => {
    axios.get('http://127.0.0.1:8000/profile/places/')
      .then(response => {
        setDestinations(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleNewDestinationChange = (event) => {
    const { name, value, files } = event.target;
    
    if (name === 'cover_image') {
      // Handle file input separately
      setNewDestination((prevData) => ({
        ...prevData,
        [name]: files[0], // Use the selected file
      }));
    } else {
      // Handle other input fields
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


  axios.post('http://127.0.0.1:8000/profile/places/', formData)
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
    .put(`http://127.0.0.1:8000/profile/places/${destinationToUpdate.id}/`, updatedData)
    .then((response) => {
      closeModal();
      fetchDestinations(); // Fetch the updated list of destinations
    })
    .catch((error) => {
      console.error("Update error:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
      }
    });
};


  const deleteDestination = (id) => {
    axios.delete(`http://127.0.0.1:8000/profile/places/${id}/`)
      .then(response => {
        fetchDestinations(); // Fetch the updated list of destinations
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <>
<Container className='p-4' fluid style={{ minHeight: '100vh', backgroundColor: '#121661' }}>
      <div className="mt-5">
        <button className="mb-4 mt-5 p-1 what-card" style={{ backgroundColor: '#121661', color: '#d9d9d9' }} onClick={openModal}>
          <FaPlus /> Add New Destination
        </button>
      </div>
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
                <button className="btn btn-outline-secondary text-dark" style={{width:'100%',backgroundColor:'rgb(18, 187, 18)', fontWeight:'bold'}}>See description</button>
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
        <Modal show={modalIsOpen} onHide={closeModal} centered style={{ zIndex: 9999, color: '#fff' }}>
          <Modal.Header closeButton style={{ backgroundColor: '#121661', color: '#fff' }}>
            <Modal.Title className="text-center text-white">{destinationToUpdate ? 'Update Destination' : 'Add New Destination'}</Modal.Title>
          </Modal.Header>
          <Modal.Body className=" text-secondary" style={{ height: '350px', backgroundColor: '#121661' }}>
            <form className="text-white">
<p style={{ fontSize:'15px'}}>Upload cover image</p>
<p>
            <input
              className="bg-white p-1"
              style={{ border: '1px solid #121661', width: '70%', color:'rgb(18, 187, 87)' }}
              type="file"
              name='cover_image'
              onChange={handleNewDestinationChange}
            />
</p>
              <p style={{fontSize:'15px'}}>Enter name of destination</p>

<p >
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
<p style={{fontSize:'15px'}}>Enter description</p>
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
<p style={{fontSize:'15px'}}>Price for  this destination</p>
        <p>   <input
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
          <Modal.Footer style={{ backgroundColor: '#121661', color: '#d9d9d9' }}>
            <button className="btn btn-outline-primary" style={{ fontWeight: 'bold' }} onClick={destinationToUpdate ? handleUpdate : createNewDestination}>
              {destinationToUpdate ? 'Update' : 'Submit'}
            </button>
          </Modal.Footer>
        </Modal>
      </Container>
  
    </>
  );
};

export default Destination;
