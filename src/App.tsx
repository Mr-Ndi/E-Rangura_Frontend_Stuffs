import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HeroSection from './components/HeroSection/HeroSection'
import PromoBanner from './components/PromoBanner/PromoBanner';
import CategoriesSection from './components/CategoriesSection/CategoriesSection';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';

function App() {
    return (
        <div className="App">
            <Navbar />
            <HeroSection />
            <PromoBanner />
            <CategoriesSection />
            <FeaturedProducts />
            <TestimonialsSection />
            <Footer />
        </div>
    );
}

export default App;
