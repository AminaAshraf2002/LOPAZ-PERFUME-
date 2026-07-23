import React from 'react';
import './CollageSection.css';
import imgLeft from '../assets/banner1.png';
import imgTop from '../assets/banner2.png';
import imgBottom from '../assets/banner3.png';
import prod1 from '../assets/work1.png';
import prod2 from '../assets/work2.png';
import prod3 from '../assets/work3.png';
import prod4 from '../assets/work4.png';

const overlayProducts = [
  { id: 1, name: 'SANTAL ATTITUDE', subtitle: 'Signature woody scent for everyday wear', price: '₹4,500', img: prod1 },
  { id: 2, name: 'SHINE BEAUTY', subtitle: 'Bright & floral with notes of jasmine', price: '₹2,800', img: prod2 },
  { id: 3, name: 'BLEU DE CHANEL', subtitle: 'Fresh citrus and aromatic woods', price: '₹14,500', img: prod3 },
  { id: 4, name: 'OUD & GOLD', subtitle: 'Rich, opulent oud with warm amber', price: '₹6,600', img: prod4 }
];

export default function CollageSection() {
  return (
    <section className="collage-section">
      <div className="container">
        <div className="collage-grid">
          {/* Left Large Image */}
          <div className="collage-left">
            <img src={imgLeft} alt="Model with perfume" />
          </div>
          
          {/* Right Split Images */}
          <div className="collage-right">
            <div className="collage-right-top">
              <img src={imgTop} alt="Model smiling with perfume" />
              <a href="#shop" className="shop-now-pill">Shop Now</a>
            </div>
            <div className="collage-right-bottom">
              <img src={imgBottom} alt="Perfume bottle close up" />
            </div>
          </div>
        </div>

        <div className="collage-overlay-cards">
          {overlayProducts.map((product) => (
            <div key={product.id} className="overlay-card">
              <div className="overlay-card-img-wrapper">
                <img src={product.img} alt={product.name} />
              </div>
              <div className="overlay-card-info">
                <div className="overlay-card-text">
                  <h3 className="overlay-card-title">{product.name}</h3>
                  <p className="overlay-card-subtitle">{product.subtitle}</p>
                </div>
                <div className="overlay-card-bottom">
                  <span className="overlay-card-price">{product.price}</span>
                  <button className="overlay-card-add-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
