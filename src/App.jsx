import React, { useState, useEffect } from 'react';
import MobileSplash from './components/MobileSplash';
import PerfumeExperience from './components/PerfumeExperience';
import BlackBanner from './components/BlackBanner';
import ProductGrid from './components/ProductGrid';
import CollageSection from './components/CollageSection';
import ParallaxCTA from './components/ParallaxCTA';
import Footer from './components/Footer';
import './App.css'; 

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { 
          setIsHeaderVisible(false);
        } else { 
          setIsHeaderVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  return (
    <main>
      {/* Premium E-commerce Header */}
      <header className={`app-header ${isHeaderVisible ? '' : 'header-hidden'}`}>
        
        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        <div className="header-left">
          <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#home" className="header-link" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#collection" className="header-link" onClick={() => setIsMobileMenuOpen(false)}>Collection</a>
            <a href="#products" className="header-link" onClick={() => setIsMobileMenuOpen(false)}>Products</a>
            <a href="#contact" className="header-link" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a>
          </nav>
        </div>
        
        <div className="logo-container">
          <h1 className="logo-text">LOPAZ</h1>
        </div>

        <div className="nav-actions">
          <div className="search-bar-container">
            <input type="text" placeholder="Search" className="search-input" />
            <button className="search-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main GSAP Experience */}
      <div id="home">
        {/* <MobileSplash /> */}
        <PerfumeExperience />
      </div>

      {/* Black Banner Section */}
      <BlackBanner />

      {/* Product Grid Section */}
      <div id="products">
        <ProductGrid />
      </div>

      {/* Masonry Collage Section */}
      <div id="collection">
        <CollageSection />
      </div>

      {/* Parallax Call to Action */}
      <ParallaxCTA />

      {/* Site Footer */}
      <Footer />
    </main>
  );
}

export default App;
