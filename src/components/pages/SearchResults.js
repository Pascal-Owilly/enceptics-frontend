import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

function SearchResults() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const authToken = Cookies.get('authToken');

  const baseUrl = 'http://127.0.0.1:8000'

  useEffect(() => {
    // Fetch search results based on the searchQuery
    if (searchQuery) {
      axios
        .get(`${baseUrl}/api/places/search/?query=${encodeURIComponent(searchQuery)}`, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((response) => {
          console.log("API Response:", response.data); // Add this line
          console.log("Place found"); // Add this line

          setResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [searchQuery, authToken]);
  

  return (
    <>
    <div style={{background:'#121661'}}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-8" style={{marginTop:'17vh'}}>
        <div className="" style={{ height: '100vh', backgroundColor:'#121661', color:'white' }}>
      <div className="">
    <h2 className="text-secondary" style={{}}>Search Results for "{searchQuery}"</h2>
    <hr />
    {loading ? (
      <p className="text-center">Loading...</p>
    ) : results.length === 0 ? (
      <p>No results found.</p>
    ) : (

      <ul>

{results.map((result) => (
  <li className="" key={result.id}>
    <Link
      to={{
        pathname: `/result/${result.id}`,
        search: `?placeName=${encodeURIComponent(result.name)}&price=${result.price}`,
      }}
      style={{ listStyleType: 'none', textDecoration: 'none' }}
    >
      <h5 style={{ color: 'gold' }}>{result.name}</h5>
    </Link>
    <p className="text-secondary">{result.description}</p>
    <p className="text-secondary">Price: KES {result.price}</p>
  </li>
))}

      </ul>
    )}
  </div>
  </div>
        </div>
        <div className="col-md-1"></div>

      </div>
    </div>
    </div>

  </>
  );
}

export default SearchResults;
