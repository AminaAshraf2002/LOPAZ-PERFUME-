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

  return (
    <section ref={sectionRef} className="product-grid-section py-24 product-grid-bg">
      <div className="container">
        <div className="section-header-centered">
          <h2 className="product-grid-heading uppercase">SHOP BY COLLECTION</h2>
          <div className="decorative-underline">
            <span className="flower-icon">✻</span>
          </div>
        </div>

        <div className="collection-grid-layout">
          {products.map((product) => (
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
      </div>
    </section>
  );
}
