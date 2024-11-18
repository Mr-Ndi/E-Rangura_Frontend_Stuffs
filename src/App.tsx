import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HeroSection from './components/HeroSection/HeroSection'

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <HeroSection />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
