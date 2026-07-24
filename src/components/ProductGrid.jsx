import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';
import img8 from '../assets/8.png';

gsap.registerPlugin(ScrollTrigger);

import './ProductGrid.css';

const products = [
  { id: 1, name: 'Embrace Elegance', subtitle: 'WOMEN', img: img1 },
  { id: 2, name: 'Unleash Confidence', subtitle: 'MEN', img: img2 },
  { id: 3, name: 'For Every Mood', subtitle: 'UNISEX', img: img3 },
  { id: 4, name: 'Customer Favorites', subtitle: 'BEST SELLERS', img: img4 },
  { id: 5, name: 'Velvet Blossom', subtitle: 'NEW ARRIVALS', img: img5 },
  { id: 6, name: 'Noir Intense', subtitle: 'LIMITED EDITION', img: img6 },
  { id: 7, name: 'Azure Mist', subtitle: 'SUMMER VIBES', img: img7 },
  { id: 8, name: 'Amber Oud', subtitle: 'SIGNATURE', img: img8 },
];

export default function ProductGrid() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleScrollLeft1 = () => {
    if (sliderRef1.current) sliderRef1.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const handleScrollRight1 = () => {
    if (sliderRef1.current) sliderRef1.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleScrollLeft2 = () => {
    if (sliderRef2.current) sliderRef2.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const handleScrollRight2 = () => {
    if (sliderRef2.current) sliderRef2.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="product-grid-section py-24 product-grid-bg">
      <div className="container">
        <div className="section-header-centered">
          <h2 className="product-grid-heading uppercase">SHOP BY COLLECTION</h2>
          <div className="decorative-underline">
            <span className="flower-icon">✻</span>
          </div>
        </div>

        {/* Top Row Slider */}
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <div ref={sliderRef1} className="collection-grid-layout">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} ref={addToRefs} className="collection-card">
                <img src={product.img} alt={product.name} className="collection-card-img" />
                <div className="collection-card-overlay">
                  <span className="collection-card-subtitle">{product.subtitle}</span>
                  <h3 className="collection-card-title">{product.name}</h3>
                  <span className="collection-shop-now">SHOP NOW</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="slider-controls hide-on-desktop">
            <button className="slider-btn" onClick={handleScrollLeft1}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button className="slider-btn" onClick={handleScrollRight1}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        {/* Bottom Row Slider */}
        <div style={{ position: 'relative' }}>
          <div ref={sliderRef2} className="collection-grid-layout">
            {products.slice(4, 8).map((product) => (
              <div key={product.id} ref={addToRefs} className="collection-card">
                <img src={product.img} alt={product.name} className="collection-card-img" />
                <div className="collection-card-overlay">
                  <span className="collection-card-subtitle">{product.subtitle}</span>
                  <h3 className="collection-card-title">{product.name}</h3>
                  <span className="collection-shop-now">SHOP NOW</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="slider-controls hide-on-desktop">
            <button className="slider-btn" onClick={handleScrollLeft2}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button className="slider-btn" onClick={handleScrollRight2}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
