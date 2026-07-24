import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import bottleImg from '../assets/slash.png';
import './MobileSplash.css';

export default function MobileSplash() {
  const containerRef = useRef(null);
  const watermarkRef = useRef(null);
  const bottleRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    // Only run on mobile
    mm.add("(max-width: 768px)", () => {
      // ---- Initial states ----
      gsap.set(watermarkRef.current, { opacity: 0, scale: 1.1 });
      gsap.set('.mobile-watermark-left', { x: 0 });
      gsap.set('.mobile-watermark-right', { x: 0 });
      // Bottle starts BELOW the viewport and small, so it visibly
      // rises up from the bottom while it zooms in.
      gsap.set(bottleRef.current, { opacity: 0, scale: 0.35, y: '50vh' });

      // =========================================================
      // PHASE 1 -- Splash zoom-in on load (autoplay, NOT tied to
      // scroll). Bottle now rises from the bottom slowly and
      // smoothly, and the "LO" / "PAZ" brand split is more
      // pronounced -- matching the desktop treatment.
      // =========================================================
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(watermarkRef.current, { opacity: 1, scale: 1, duration: 1.8, ease: 'power3.out' }, 0)
        .to('.mobile-watermark-left', { x: '-4vw', duration: 1.8, ease: 'power3.out' }, 0)
        .to('.mobile-watermark-right', { x: '4vw', duration: 1.8, ease: 'power3.out' }, 0)
        .to(bottleRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,                // rises up to its resting position
          duration: 2.4,       // slower, more deliberate arrival
          ease: 'power2.out'   // smooth deceleration, no sharp "snap"
        }, 0.4);
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="mobile-splash-section relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div ref={watermarkRef} className="absolute top-0 left-0 w-full flex items-start justify-center pointer-events-none" style={{ zIndex: 0, paddingTop: '8vh' }}>
        <h1 className="serif m-0 p-0 watermark-gradient text-center" style={{ fontSize: '25vw', lineHeight: 1 }}>
          <span className="mobile-watermark-left">LO</span><span className="mobile-watermark-right">PAZ</span>
        </h1>
      </div>

      <div className="relative pointer-events-none flex items-center justify-center" style={{ zIndex: 10, height: '80vh', width: '100vw', marginTop: '20vh' }}>
        <img ref={bottleRef} src={bottleImg} alt="Bottle" style={{ height: '80vh', width: 'auto', maxWidth: 'none' }} className="drop-shadow-2xl" />
      </div>
    </section>
  );
}