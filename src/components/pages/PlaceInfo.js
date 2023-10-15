import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { Carousel, Card } from 'react-bootstrap';

const PlaceInfo = () => {
    const { id } = useParams();

    const navigate = useNavigate();


    console.log('Place ID:', id);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const fetchedPlaceName = queryParams.get('placeName');
    const fetchedPlacePrice = queryParams.get('price');

    const [placeInfo, setPlaceInfo] = useState(null);
    const [placeName, setPlaceName] = useState(fetchedPlaceName || ''); // Initialize with fetchedPlaceName if available
    const [price, setPrice] = useState(fetchedPlacePrice || null);
    const [weatherData, setWeatherData] = useState(null);
    const [loadWeather, setLoadWeather] = useState(false); // Control whether to load weather container
    const [isLoadingWeather, setIsLoadingWeather] = useState(false);

    useEffect(() => {
        fetchPlaceInfo(id);
    }, [id]);

    const fetchPlaceInfo = (id) => {
        axios
            .get(`http://127.0.0.1:8000/api/place-info/${id}/`)
            .then((response) => {
                setPlaceInfo(response.data);
                if (!placeName && response.data.name) {
                    setPlaceName(response.data.name);

                }
                if (response.data.price) {
                    setPrice(response.data.price);
                }
                setLoadWeather(true); // Set loadWeather to true after fetching place info
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        if (loadWeather) {
            fetchWeatherData();
        }
    }, [loadWeather]);

    const fetchWeatherData = () => {
        setIsLoadingWeather(true);
        axios
            .get(`http://127.0.0.1:8000/weather/weather-forecast/${placeName}/`)
            .then((response) => {
                setWeatherData(response.data);
                setIsLoadingWeather(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoadingWeather(false);
            });
    };


    const handleNavigateToBooking = (id, placeName, price) => {
        navigate(`/booking?id=${id}&placeName=${encodeURIComponent(placeName)}&price=${price}`, { state: { placeId: id } });
      };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#121661' }}>
            {placeInfo ? (
                <div>
                    <div className="container-fluid" style={{ marginTop: '', color: 'yellow' }}>
                        <div className="row">
                            <h2 className="mt-4" style={{ marginTop: 'vh' }}>
                                {placeName} <span style={{fontSize:'16px', fontFamily:'cursive'}}>{price && `Price: ${price}`} </span>
                            </h2>

                            <div className="col-md-6">
                                <hr />
                                <Card style={{ maxHeight: '450px' }}>
                                    <Carousel
                                        style={{ width: '100%', maxHeight: '450px', border: 'none' }}
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

                            {loadWeather && (
                                <div className="col-md-5 text-center mb-4">
                                    <div className="weather-widget">
                                        <h5 className="text-secondary mb-3 text-center">Weather forecast in {placeName}</h5>
                                        <hr />
                                        {isLoadingWeather ? (
                                            <p>Loading weather data...</p>
                                        ) : weatherData ? (
                                            <div>
                                                <p>Summary: {weatherData.summary}</p>
                                                <p>Temperature: {weatherData.temperature_celsius} °C</p>
                                                <p>Icon: {weatherData.icon}</p>
                                                <p>Humidity: {weatherData.humidity} %</p>
                                                <p>Visibility: {weatherData.visibility}</p>
                                                <p>UV Index: {weatherData.uvIndex}</p>
                                                <p>Cloud Cover: {weatherData.cloudCover}</p>
                                                <p>Wind Speed: {weatherData.windSpeed} Km/h</p>
                                                <p>Wind Gust: {weatherData.windGust}</p>
                                            </div>
                                        ) : (
                                            <p>No weather data available</p>
                                        )}
                                        <hr />
                                    </div>
                                    {/* <Link
                                        to={`/booking?id=${id}&placeName=${encodeURIComponent(placeName)}&price=${price}`}
                                        > */}
                                        <button
                                            onClick={() => handleNavigateToBooking(id, placeName, price)}

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
                                    {/* </Link> */}
                                </div>
                            )}
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
