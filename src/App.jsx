import React from 'react';
import PerfumeExperience from './components/PerfumeExperience';
import BlackBanner from './components/BlackBanner';
import ProductGrid from './components/ProductGrid';
import CollageSection from './components/CollageSection';
import Footer from './components/Footer';
import './App.css'; // Just keeping it empty or simple, or you can delete the import

function App() {
  return (
    <main>
      {/* Premium E-commerce Header */}
      <header className="app-header">
        <div className="header-left">
          <nav className="nav-links">
            <a href="#home" className="header-link">Home</a>
            <a href="#collection" className="header-link">Collection</a>
            <a href="#products" className="header-link">Products</a>
            <a href="#contact" className="header-link">Contact Us</a>
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

      {/* Site Footer */}
      <Footer />
    </main>
  );
}

export default App;
