import React from 'react';
import './ParallaxCTA.css';

export default function ParallaxCTA() {
  return (
    <section className="parallax-cta-section">
      <div className="parallax-bg"></div>
      <div className="parallax-content container">
        <h2 className="parallax-title">Discover Your Signature Scent</h2>
        <p className="parallax-subtitle">Explore our exclusive collections and find the fragrance that speaks to your unique style and mood.</p>
        <button className="parallax-shop-btn">SHOP ALL COLLECTIONS</button>
      </div>
    </section>
  );
}
