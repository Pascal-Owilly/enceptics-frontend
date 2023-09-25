import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import '../src/static/Homepage.css';
import PlaceInfo from './components/pages/PlaceInfo';
import Homepage from './components/pages/Hero';
import Blogs from '../src/components/pages/Blogs';
import Profile from '../src/components/pages/Profile';
import BookingPage from '../src/components/pages/BookingPage';
import Places from '../src/components/pages/Places';
import About from '../src/components/pages/About';
import Aboutus from '../src/components/pages/Aboutus';
import NavigationBar from './components/pages/NavigationBar';
import Home from './components/pages/Home';
import Login from './components/pages/authenticate/Login';
import Footer from './components/pages/Footer';
import CurrencyConverter from './components/pages/CurrencyConverter'
import "bootstrap/dist/css/bootstrap.min.css";
import BlogList from './components/pages/BlogList';
import BlogDetail from './components/pages/BlogDetail';
import BlogForm from './components/pages/BlogForm';
import PlaceInfoTest from './components/pages/placeinfotest/PlaceInfoTest';
function App() {

  return (  
    <Router>
      <div className='wrapper'>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/places" element={<Places />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={ <BlogList />} />
          <Route path="/post/:id" element={< BlogDetail />} />
          <Route path="/create" element={< BlogForm />} />
          <Route path="/edit/:id" element={ <BlogForm />} />
          <Route exact path='/profile/*' element={<Profile/>}/>
          <Route exact path='/booking' element={<BookingPage/>}/>
          <Route path="/currencyconverter" element={<CurrencyConverter />} />
          <Route path="/place-info/:id" element={<PlaceInfo />} />  

          <Route path="/placeinfo" element={<PlaceInfoTest />} />          
        
        </Routes>
        <Footer />  
      </div>
    </Router>
   
  );
}

export default App;
