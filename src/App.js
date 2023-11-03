import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import '../src/static/Homepage.css';
import PlaceInfo from './components/pages/PlaceInfo';
import Homepage from './components/pages/Hero';
import Profile from '../src/components/pages/Profile';
import BookingPage from '../src/components/pages/BookingPage';
import Places from '../src/components/pages/Places';
import About from '../src/components/pages/About';
import Aboutus from '../src/components/pages/Aboutus';
import NavigationBar from './components/pages/NavigationBar';
import Home from './components/pages/Home';
import Login from './components/pages/authenticate/Login';
import LoginBooking from './components/pages/authenticate/LoginBooking';
import LoginBlog from './components/pages/authenticate/LoginBlog';
import SignUpBlog from './components/pages/authenticate/SignupBlog';
import ForgotPassword from './components/pages/authenticate/ForgotPassword';

import SignUp from './components/pages/authenticate/SignUp';
import Footer from './components/pages/Footer';
import CurrencyConverter from './components/pages/CurrencyConverter'
import "bootstrap/dist/css/bootstrap.min.css";
import BlogList from './components/pages/BlogList';
import AddPlaceInfo from './components/pages/placeinfotest/AddPlaceInfo';

import { SearchProvider } from './components/pages/SearchContext';
import SearchResults from './components/pages/SearchResults';

import TopChats from './components/pages/TopChats';

import PaymentStatus from './components/pages/PaymentSuccess';
import PaymentResponsePage from './components/pages/mpesa/paymentResponse';


function App() {

  // Mpesa payment response
  const response = {
    data: {
      msg: "M-Pesa payment initiated successfully",
      response: {
        CheckoutRequestID: "ws_CO_15102023102931234725276739",
        CustomerMessage: "Success. Request accepted for processing",
        MerchantRequestID: "92646-150652872-1",
        ResponseCode: "0",
        ResponseDescription: "Success. Request accepted for processing"
      }
    },
    status: 201,
    statusText: 'Created'
  };
  
  return (  
    <Router>
      <SearchProvider>
      <div className='wrapper'>
        <NavigationBar />
        <Routes>

          <Route path="/" element={<Homepage />} />
          <Route path="/places" element={<Places />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-booking" element={<LoginBooking />} />
          <Route path="/login-blog" element={<LoginBlog />} />
          <Route path="/signup-blog" element={<SignUpBlog />} />


          <Route path="/forgot-password" element={<ForgotPassword />} />


          <Route path="/signup" element={<SignUp />} />   

          <Route path="/search" element={<SearchResults />} />
          <Route path="/result/:id" element={<PlaceInfo />} />

       

          <Route path="/blog" element={ <BlogList />} />
          <Route exact path='/profile/*' element={<Profile/>}/>
          <Route exact path='/booking' element={<BookingPage/>}/>
          <Route path="/currencyconverter" element={<CurrencyConverter />} />
          <Route path="/place-info/:id" element={<PlaceInfo />} />  
          <Route path="/info" element={<AddPlaceInfo />} />          
          <Route path="/topchats" element={<TopChats />} /> 

          <Route path="/payment/status/:status" element={<PaymentStatus />} />

          <Route path="/payment/response" element={<PaymentResponsePage paymentResponse={response} />} />
                  
        </Routes>
        <Footer />  
      </div>
      </SearchProvider>
    </Router>
   
  );
}

export default App;
