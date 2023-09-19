import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import '../src/static/Homepage.css';
import Homepage from './components/pages/Hero';
import Blogs from '../src/components/pages/Blogs';
import Profile from '../src/components/pages/Profile';
import BookingPage from '../src/components/pages/BookingPage';
import Places from '../src/components/pages/Places';
import Description from '../src/components/pages/Description';
import About from '../src/components/pages/About';
import Aboutus from '../src/components/pages/Aboutus';
import BookNew from '../src/components/pages/BookNew';
import NavigationBar from './components/pages/NavigationBar';
import Home from './components/pages/Home';
import Login from './components/pages/authenticate/Login';
import Footer from './components/pages/Footer';
import CurrencyConverter from './components/pages/CurrencyConverter'
import "bootstrap/dist/css/bootstrap.min.css";

import { Outlet } from "react-router-dom";
import Cookies from 'js-cookie';


import BlogList from './components/pages/BlogList';
import BlogDetail from './components/pages/BlogDetail';
import BlogForm from './components/pages/BlogForm';
// import { AuthProvider } from "../src/components/pages/authenticate/AuthContext";
import PrivateRoute from './components/pages/authenticate/PrivateRoute';

function App() {

  return (  
   
    <Router>
          {/* <AuthProvider> */}

      <div className='wrapper'>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/login" element={<Login />} />

          <Route path="/blog" element={ <BlogList />} />
          <Route path="/post/:id" element={< BlogDetail />} />
          <Route path="/create" element={< BlogForm />} />
          <Route path="/edit/:id" element={ <BlogForm />} />

            <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/profile/*' element={<Profile/>}/>
          </Route> 
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/booking' element={<BookingPage/>}/>
          </Route>
          {/* <PrivateRoute path="/booking" component={BookingPage} />
          <PrivateRoute path="/profile" component={Profile} /> */}
          <Route path="/description" element={<Description />} />
          <Route path="/currencyconverter" element={<CurrencyConverter />} />
        </Routes>
        <Footer />  
      </div>
      
      {/* </AuthProvider> */}
    </Router>
   
  );
}

export default App;
