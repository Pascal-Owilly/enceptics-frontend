// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import authService from './authService';
// import LoginModal from './LoginModal'; // Import the LoginModal component

// const LoginTest = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loginData, setLoginData] = useState({
//     username: '',
//     password: '',
//   });
  
//   // State to control the visibility of the login modal
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const login = async (e) => {
//     if (e) {
//       e.preventDefault();
//     }
//     try {
//       const authToken = await authService.login(loginData);
//       setIsLoggedIn(true);
//       Cookies.set('authToken', authToken, { expires: 1, sameSite: 'None', secure: true });

//       // Redirect to another page after successful login if needed
//       navigate('/booking'); // Replace '/dashboard' with your desired route

//     } catch (error) {
//       // Handle login error
//       console.error('Login failed:', error);
//     }
//   };

//   useEffect(() => {
//     const storedToken = Cookies.get('authToken');
//     if (storedToken) {
//       setIsLoggedIn(true);
//     }

//     // Access query parameters from the URL
//     const query = new URLSearchParams(location.search);
//     const placeName = query.get("placeName");
//     const price = query.get("price");

//     // Use the placeName and price as needed
//     console.log("Place Name:", placeName);
//     console.log("Price:", price);

//     // Redirect to another page if the user is already logged in
//     if (isLoggedIn) {
//       navigate('/booking'); // Replace '/dashboard' with your desired route
//     }
//   }, [location.search, isLoggedIn]);

//   const handleLoginSubmit = (event) => {
//     event.preventDefault();
//     login();
//   };

//   const handleLoginChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   // Function to show the login modal
//   const showLoginModalHandler = () => {
//     setShowLoginModal(true);
//   };

//   // Function to close the login modal
//   const closeLoginModalHandler = () => {
//     setShowLoginModal(false);
//   };

//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#121661', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '' }}>
//       <form className='what-card' onSubmit={handleLoginSubmit} style={{ width: '350px', height: '400px', marginTop: '', marginLeft: '', backgroundColor: '#121661' }}>
//         <h3 className='text-center text-white'>Login</h3>
//         <hr style={{ color: '#d9d9d9' }} />
//         <div className="form-group" style={{ color:'#d9d9d9', fontSize:'18px'}}>
//           <label className="mt-1" htmlFor="username">Username</label>
//           <input
//             type="text"
//             style={{ background: '#d9d9d9' }}
//             className="form-control"
//             id="username"
//             name="username"
//             value={loginData.username}
//             placeholder="Enter username"
//             onChange={handleLoginChange}
//           />
//         </div>

//         <div className="form-group" style={{ color:'#d9d9d9', fontSize:'18px'}}>
//           <label className="mt-1" htmlFor="password">Password</label>
//           <input
//             type="password"
//             style={{ background: '#d9d9d9' }}
//             placeholder="Enter password"
//             className="form-control"
//             id="password"
//             name="password"
//             value={loginData.password}
//             onChange={handleLoginChange}
//           />
//         </div>
//         <button
//           type="submit"
//           className="btn btn-outline-secondary text-center mt-2 what-card-price btn-sm mt-4"
//           style={{ backgroundColor: '#121661', borderColor: '#000092', width:'100%', margin:'auto'}}
//         >
//           Login
//         </button>
//         <hr />
//         <p className='mb-2 text-secondary'>
//           Don't have an account? <Link to='/signup'>Signup</Link>
//         </p>
//         <p className='mb-2 text-secondary'>
//           <Link to='/forgot-password'>Forgot your password?</Link>
//         </p>
//       </form>

//       {/* Add a button to show the login modal */}
//       <button
//         onClick={showLoginModalHandler}
//         className="btn btn-primary"
//       >
//         Login
//       </button>

//       {/* Render the login modal when showLoginModal is true */}
//       {showLoginModal && (
//         <LoginModal
//           show={showLoginModal}
//           handleClose={closeLoginModalHandler}
//           loginFunction={login}
//           loginData={loginData}
//           handleLoginChange={handleLoginChange}
//         />
//       )}
//     </div>
//   );
// };

// export default LoginTest;