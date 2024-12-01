import './App.css';
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
import Login from './components/LoginSection/Login';
import CreateAccount from './components/AccountCreation/AccountCreation';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HeroSection />} />
                    <Route path="/gallery" element={<GallerySection />} />
                    <Route path="/available" element={<AvailableSection />} />
                    <Route path="/shop" element={<Booking />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/upload" element={<Posting />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
