import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HeroSection from './components/HeroSection/HeroSection';
import GallerySection from './components/GallerySection/Gallerysection';
import AvailableSection from './components/AvailableSection/AvailableSection';
import Booking from './components/BookingSection/BookingSection';
import Contact from './components/ContactSection/ContactSection';
import About from './components/AboutSection/AboutSection';
import Posting from './components/PostingSection/PostingSection';
import Auth from './components/LoginSection/Login';
import CreateAccount from './components/AccountCreation/AccountCreation';
import UserDashboard from './components/ UserDashboard/ UserDashboard';
import { useState } from 'react';

function App() {
    const [searchQuery, setSearchQuery] = useState<string>(''); 
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Start as false

    return (
        <Router>
            <Navbar setSearchQuery={setSearchQuery} />
            <Routes>
                <Route path="/" element={<HeroSection />} />
                <Route path="/gallery" element={<GallerySection />} />
                <Route path="/shop" element={<Booking />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/available" element={<AvailableSection searchQuery={searchQuery} />} />
                <Route path="/upload" element={<Posting />} />
                <Route path="/login" element={<Auth setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="user-profile" element={< UserDashboard/>}/>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
