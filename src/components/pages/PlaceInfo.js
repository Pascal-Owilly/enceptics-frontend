import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { Carousel, Card } from 'react-bootstrap';

const PlaceInfo = ({ destinationId, placeBookingData, selectedDestination }) => {

    const navigate = useNavigate()

    const { id } = useParams();
    const [placeInfo, setPlaceInfo] = useState(null);
    const [placeName, setPlaceName] = useState(''); // Initialize with an empty string
    const [price, setPrice] = useState(0);
    const [weatherData, setWeatherData] = useState(null);
    const location = useLocation(); // Get the location object
    const queryParams = new URLSearchParams(location.search);

    // Use the URLSearchParams object to get the 'placeName' query parameter
    const fetchedPlaceName = queryParams.get('placeName');
    const fetchedPlacePrice = queryParams.get('price');

    useEffect(() => {
        fetchPlaceInfo(id);
    }, [id]);

    const fetchPlaceInfo = (id) => {
        axios
            .get(`http://127.0.0.1:8000/api/place-info/${id}/`)
            .then((response) => {
                setPlaceInfo(response.data);
                setPlaceName(fetchedPlaceName); // Set placeName from the query parameter
                setPrice(response.data.price);
                fetchWeatherData(fetchedPlaceName);
            })
            .catch((error) => {
                console.error(error);
            });
    };

   // Function to fetch weather data based on place name
const fetchWeatherData = (placeName) => {
    // Use Google Geocoding to fetch coordinates based on placeName
    getCoordinates(placeName)
        .then((coordinates) => {
            if (coordinates) {
                // Fetch weather data using coordinates
                axios
                    .get(`http://127.0.0.1:8000/weather/weather-forecast/${coordinates.latitude}/${coordinates.longitude}`)
                    .then((response) => {
                        setWeatherData(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                // Handle the case where coordinates are not found
                console.error('Coordinates not found for the place');
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

    // Function to get coordinates using Google Geocoding
    const getCoordinates = async (placeName) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    address: placeName,
                    key: 'YOUR_GOOGLE_API_KEY', // Replace with your Google API key
                },
            });

            const { results } = response.data;
            if (results && results.length > 0) {
                const { lat, lng } = results[0].geometry.location;
                return { latitude: lat, longitude: lng };
            } else {
                throw new Error('Geocoding failed');
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            // Handle geocoding errors here
            return null;
        }
    };

    // Function to navigate to the booking page with booking data
    const handleProceedToBooking = () => {
        navigate(`/booking?placeName=${encodeURIComponent(placeName)}&price=${price}`);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#121661' }}>
            {placeInfo ? (
                <div>
                    <div className="container-fluid" style={{ marginTop: '', color: 'yellow' }}>
                        <div className="row">
                            <h2 className="mt-4" style={{ marginTop: 'vh' }}>
                                {placeName}
                            </h2>

                            <div className="col-md-8">
                                <hr />
                                <Card style={{ maxHeight: '450px' }}>
                                    <Carousel
                                        style={{ width: '100%', maxHeight: '450px', border:'none' }}
                                        fade={false}
                                        controls={true}
                                        indicators={true}
                                        interval={3000}
                                        keyboard={false}
                                    >
                                        <Carousel.Item>
                                            <img
                                                className="mb-5"
                                                src={placeInfo.pictures}
                                                alt="img"
                                                style={{ width: '100%', maxHeight: '448px' }}
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <Carousel.Caption style={{ backgroundColor: 'rgb(0, 0, 0, 0.7)', maxHeight: '450px' }}>
                                                <p style={{ color: 'white', width: '80%', fontSize: '18px', bottom: 0, left: 0, top: 0 }}>
                                                    {placeInfo.weather_forecast}
                                                </p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item style={{ width: '100%' }}>
                                            <video width="100%" controls style={{ top: 0 }}>
                                                <source src={placeInfo.videos} type="video/mp4" />
                                                <source src={placeInfo.videos} type="video/webm" />
                                                <source src={placeInfo.videos} type="video/ogg" />
                                                <source src={placeInfo.videos} type="video/mkv" />
                                                <source src={placeInfo.videos} type="video/3gp" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </Carousel.Item>
                                    </Carousel>
                                </Card>
                            </div>
                            <div className="col-md-3 text-center mb-4">
                                <h5 className="text-secondary mb-3 text-center">2 Day Weather Forecast for {placeName}</h5>
                                <table className="table table-bordered table-hover" style={{}}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Morning (°C)</th>
                                            <th>Afternoon (°C)</th>
                                            <th>Evening (°C)</th>
                                            <th>Night (°C)</th>
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

                                <Link to={`/booking?placeName=${encodeURIComponent(placeName)}&price=${price}`}>
                                    <button
                                        className="what-card-price btn mt-5 btn-sm"
                                        style={{
                                            fontSize: '18px',
                                            color: 'goldenrod',
                                            fontWeight: 'bold',
                                            width: 'auto',
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
                        display: 'flex',
                        alignItems: 'center',
                        height: '50vh',
                        justifyContent: 'space-around',
                        color: 'white',
                        fontSize: '22px',
                    }}
                >
                    Nothing here yet
                </p>
            ) : (
                <p
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '50vh',
                        justifyContent: 'space-around',
                        color: 'white',
                        fontSize: '22px',
                    }}
                >
                    Hang tight ...
                </p>
            )}
        </div>
    );
};

export default PlaceInfo;
