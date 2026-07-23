import React from 'react';
import './BlackBanner.css';
import bannerImg from '../assets/banner.png';

export default function BlackBanner() {
  return (
    <section className="black-banner-section">
      <div className="black-banner-grid">
        {/* Left Side: Text Content */}
        <div className="black-banner-content">
          <span className="banner-subtitle">THE ART OF PERFUME</span>
          <h2 className="banner-title">Crafted with Passion,<br/>Made for You</h2>
          <p className="banner-text">
            At Luxora, every fragrance is a blend of the finest ingredients, carefully selected from around the world.
          </p>
          <button className="banner-btn">LEARN MORE</button>
        </div>
        
        {/* Right Side: Image */}
        <div className="black-banner-image">
          <img src={bannerImg} alt="Luxora Perfume" />
        </div>
      </div>
    </section>
  );
}
