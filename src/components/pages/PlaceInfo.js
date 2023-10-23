import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { Carousel, Card } from 'react-bootstrap';
import '../../static/Styles.css';

const PlaceInfo = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const baseUrl = 'https://enc.pythonanywhere.com'


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
            .get(`${baseUrl}/api/place-info/${id}/`)
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
            .get(`${baseUrl}/weather/weather-forecast/${placeName}/`)
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
        console.log("Navigating to booking with placeName:", placeName);
        console.log("Navigating to booking with price:", price);
      
        navigate(`/booking?id=${id}&placeName=${encodeURIComponent(placeName)}&price=${price}`, {
          state: { placeId: id, placeName, price },
        });
      };
      
      

      function toggleVideoPlayback() {
        const videoPlayer = document.getElementById('videoPlayer');
        if (videoPlayer) {
            if (videoPlayer.paused) {
                videoPlayer.play();
            } else {
                videoPlayer.pause();
            }
        }
    }
    
    

    return (
        <div style={{ minHeight: 'auto', backgroundColor: '#121661' }}>
            {placeInfo ? (
                <div>
                    <div className="container-fluid" style={{ marginTop: '', color: 'yellow' }}>
                        <div className="row">
                            <h2 className="" style={{ marginTop: '14vh' }}>
                                {placeName} <span style={{fontSize:'16px', fontFamily:'cursive'}}>{price && `Price: ${price}`} </span>
                            </h2>

                            <div className="col-md-8">
    <hr />
    <Card className='place-info-slide' style={{ height: '450px', background:'black' }}>
    <Carousel
  fade={false}
  controls={true}
  indicators={true}
  interval={5000}
  keyboard={false}
>
  <Carousel.Item>
    <div className="position-relative">
      <img
        className="place-info-slide"
        src={placeInfo.pictures}
        alt="img"
        style={{ width: '100%', height: '450px' }}
      />
      <div
        className="full-width-caption"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <p className='text-center text-secondary' style={{width:'80%', top: '10%', fontSize:'18px',letterSpacing:'1px'}}>{placeInfo.weather_forecast}</p>
      </div>
    </div>
  </Carousel.Item>

  <Carousel.Item style={{ width: '100%', position: 'relative' }}>
    <video className='place-info-slide mt-1 mb-1' id="videoPlayer" width="100%" controls style={{ top: 0, display: 'block', width: '100%', height:'450px' }}>
      <source src={placeInfo.videos} type="video/mp4" />
      <source src={placeInfo.videos} type="video/webm" />
      <source src={placeInfo.videos} type="video/ogg" />
      <source src={placeInfo.videos} type="video/mkv" />
      <source src={placeInfo.videos} type="video/3gp" />
      Your browser does not support the video tag.
    </video>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <button
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: 'none',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '32px',
          cursor: 'pointer',
          padding: '10px',
        }}
        onClick={() => toggleVideoPlayback()}
      >
        ▶️
      </button>
    </div>
  </Carousel.Item>
</Carousel>

</Card>

                                        <button
                                            onClick={() => handleNavigateToBooking(id, placeName, price)}

                                            className="what-card-btn btn mt-3 mb-5  btn-sm"
                                            style={{
                                                fontSize: '18px',
                                                color: 'goldenrod',
                                                fontWeight: 'bold',
                                                width: 'auto',
                                                textAlign: 'right',
                                            }}
                                        >
                                            Proceed to booking &nbsp;&nbsp; <FaArrowRight />
                                        </button>
</div>

                            {loadWeather && (
                                <div className="col-md-4 text-center mt-3" style={{}}>
                                    <div className="weather-widget">
                                       
                                        {isLoadingWeather ? (
                                            <p>Loading weather data...</p>
                                        ) : weatherData ? (
                                            <Card className="weather-card" style={{ background: '#121661' }}>
                                            <Card.Body>
                                                <Card.Title style={{color:'#A9A9A9'}}>Weather Forecast for {placeName}</Card.Title>
                                                <table style={{ background: '#121661', color: 'greenyellow' }}>
                                                    <tbody>
                                                        <tr>
                                                            <th style={{ border: '1px dotted green', padding: '5px' }}>Summary</th>
                                                            <td style={{ border: '1px dotted green', padding: '5px' }}>{weatherData.summary}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ border: '1px dotted green', padding: '5px' }}>Temperature (°C)</th>
                                                            <td style={{ border: '1px dotted green', padding: '5px' }}>{weatherData.temperature_celsius}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ border: '1px dotted green', padding: '5px' }}>Icon</th>
                                                            <td style={{ border: '1px dotted green', padding: '5px' }}>{weatherData.icon}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ border: '1px dotted green', padding: '5px' }}>Humidity (%)</th>
                                                            <td style={{ border: '1px dotted green', padding: '5px' }}>{weatherData.humidity}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ border: '1px dotted green', padding: '5px' }}>Visibility</th>
                                                            <td style={{ border: '1px dotted green', padding: '5px' }}>{weatherData.visibility}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ border: '1px dotted green', padding: '5px' }}>UV Index</th>
                                                            <td style={{ border: '1px dotted green', padding: '5px' }}>{weatherData.uvIndex}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ border: '1px dotted green', padding: '5px' }}>Cloud Cover</th>
                                                            <td style={{ border: '1px dotted green', padding: '5px' }}>{weatherData.cloudCover}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ border: '1px dotted green', padding: '5px' }}>Wind Speed (Km/h)</th>
                                                            <td style={{ border: '1px dotted green', padding: '5px' }}>{weatherData.windSpeed}</td>
                                                        </tr>
                                                        <tr>
                                                            <th style={{ border: '1px dotted green', padding: '5px' }}>Wind Gust</th>
                                                            <td style={{ border: '1px dotted green', padding: '5px' }}>{weatherData.windGust}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Card.Body>
                                        </Card>                ) : (
                                            <p>No weather data available</p>
                                        )}
                                    </div>
                                  
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : placeInfo === 0 ? (
                <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>
                <p
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100vh',
                        justifyContent: 'space-around',
                        color: 'white',
                        fontSize: '22px',
                        marginTop:'15vh',

                    }}
                >
                    Nothing here yet
                </p>
                <div className='col-md-2'></div>
                </div>
                </div>
                </div>
            ) : (
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-8'>
                        <p
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100vh',
                        justifyContent: 'space-around',
                        color: 'white',
                        fontSize: '22px',
                        marginTop:'15vh',
                    }}
                >
                    Hang tight ...
                </p>
                        </div>
                        <div className='col-md-2'></div>


                    </div>
                </div>
            )}
        </div>
        
    );
};

export default PlaceInfo;
