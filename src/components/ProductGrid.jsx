import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '../assets/9.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/1.png';
import img7 from '../assets/7.png';
import img8 from '../assets/8.png';

gsap.registerPlugin(ScrollTrigger);

import './ProductGrid.css';

const products = [
  { id: 1, name: 'Velvet Blossom', subtitle: 'Women', badge: '-15%', reviews: 128, price: '$68.00', oldPrice: '$80.00', img: img1 },
  { id: 2, name: 'Noir Intense', subtitle: 'Men', badge: '-10%', reviews: 96, price: '$72.00', oldPrice: '$80.00', img: img2 },
  { id: 3, name: 'Azure Mist', subtitle: 'Unisex', badge: '-15%', reviews: 74, price: '$68.00', oldPrice: '$80.00', img: img3 },
  { id: 4, name: 'Amber Oud', subtitle: 'Unisex', badge: '-10%', reviews: 88, price: '$90.00', oldPrice: '$100.00', img: img4 },
  { id: 5, name: 'Oud Mystique', subtitle: 'Unisex', badge: null, reviews: 145, price: '$85.00', oldPrice: null, img: img5 },
  { id: 6, name: 'Santal Whisper', subtitle: 'Women', badge: '-20%', reviews: 210, price: '$76.00', oldPrice: '$95.00', img: img6 },
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
          <h2 className="product-grid-heading">BEST SELLING PRODUCTS</h2>
          <div className="decorative-underline">
            <span className="flower-icon">❁</span>
          </div>
        </div>
        <div className="grid product-grid-layout">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card new-style-card"
              ref={addToRefs}
            >
              <div className="product-card-img-wrapper">
                {product.badge && <span className="discount-badge">{product.badge}</span>}
                <img src={product.img} alt={product.name} />
              </div>
              <div className="product-card-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-subtitle">{product.subtitle}</p>
                <div className="product-rating">
                  <span className="stars">★★★★★</span>
                  <span className="reviews">({product.reviews})</span>
                </div>
                <div className="product-pricing">
                  <span className="current-price">{product.price}</span>
                  {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
                </div>
                <button className="add-to-cart-outline-btn">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
