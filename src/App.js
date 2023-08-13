import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import '../src/static/Homepage.css';
import Homepage from './components/pages/Hero';
import Blogs from '../src/components/pages/Blogs';
import ProfilePage from '../src/components/pages/ProfilePage';
import BookingPage from '../src/components/pages/BookingPage';
import Places from '../src/components/pages/Places';
import Description from '../src/components/pages/Description';
import About from '../src/components/pages/About';
import BookNew from '../src/components/pages/BookNew';
import NavigationBar from './components/pages/NavigationBar';
import Home from './components/pages/Home';

function App() {
  return (  
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/booknew" element={<BookNew />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/description" element={<Description />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
