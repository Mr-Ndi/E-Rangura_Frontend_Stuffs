import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HeroSection from './components/HeroSection/HeroSection'
import GallerySection from './components/GallerySection/Gallerysection';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path= "/" element={< HeroSection />} />
                    <Route path="/gallery" element={<GallerySection />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
