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

  useEffect(() => {
    // Fetch search results based on the searchQuery
    if (searchQuery) {
      axios
        .get(`http://127.0.0.1:8000/api/places/search/?query=${encodeURIComponent(searchQuery)}`, {
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
    <div className="" style={{ height: '100vh', marginTop:"14vh", backgroundColor:'#121661', color:'white' }}>
      <div className="mx-5">
    <h2>Search Results for "{searchQuery}"</h2>
    {loading ? (
      <p className="text-center">Loading...</p>
    ) : results.length === 0 ? (
      <p>No results found.</p>
    ) : (
      <ul>
         {results.map((result) => (
    <li className="mt-3" key={result.id} style={{listStyleType:'none'}}>
      <Link to={`/result/${result.id}`}>
        <h5 style={{color:'green'}}>{result.name}</h5>
        </Link>
        <p>{result.description}</p>
        <p>Price: KES {result.price}</p>
    </li>
  ))}
      </ul>
    )}
  </div>
  </div>
  );
}

export default SearchResults;
