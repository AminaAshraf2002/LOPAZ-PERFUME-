import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bottleImg from '../assets/bottle.png';
import bgImg from '../assets/bg.png';
import './PerfumeExperience.css';

gsap.registerPlugin(ScrollTrigger);

export default function PerfumeExperience() {
  const containerRef = useRef(null);
  const bottleContainerRef = useRef(null);
  const bottleRef = useRef(null);
  const heroTextRef = useRef(null);
  const watermarkRef = useRef(null);
  const detailLeftRef = useRef(null);
  const detailRightRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    // Single breakpoint covers ALL screen sizes — mobile now gets the exact
    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      // Set initial states for content (hidden) so they don't flash before preloader
      gsap.set('.watermark-text', { opacity: 0 });
      gsap.set('.word', { y: 100 });
      gsap.set('.flower-icon', { opacity: 0 });
      gsap.set('.hero-bottom-element', { y: 100 });

      // Create the content timeline (paused initially)
      const contentTl = gsap.timeline({ paused: true });

      // Move bottle to the right simultaneously as text fades in
      contentTl.to('.bottle-scroll-container', {
        x: isMobile ? '28vw' : '0vw', // 0vw on desktop, 28vw on mobile
        duration: 2.0, // SLOWER MOVEMENT
        ease: 'power2.inOut'
      }, 0)
      .fromTo('.watermark-text',
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' },
        0
      )
      .fromTo('.watermark-left',
        { x: 0 },
        { x: isMobile ? '0vw' : '-1vw', duration: 1.5, ease: 'power3.out' },
        0
      )
      .fromTo('.watermark-right',
        { x: 0 },
        { x: isMobile ? '1vw' : '8vw', duration: 1.5, ease: 'power3.out' },
        0
      )
      .fromTo('.word',
        { y: 100 },
        { y: 0, duration: 1, stagger: 0.08, ease: 'power3.out' },
        0.2
      )
      .to('.flower-icon', { opacity: 1, duration: 0.5 }, '-=0.5')
      .fromTo('.hero-bottom-element',
        { y: 100 },
        { y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
        '-=0.5'
      );

      // Preloader Sequence
      // 1. Initial setup: small bottle
      gsap.set(bottleRef.current, { scale: 0.4, opacity: 0 });

      const preloaderTl = gsap.timeline({
        onComplete: () => {
          contentTl.play();
        }
      });

      preloaderTl
        .to(bottleRef.current, { opacity: 1, duration: 0.3 }) // Bottle appears small
        .to(bottleRef.current, {
          scale: 1,
          duration: 2.5, // SLOWER ZOOM IN
          ease: 'power2.inOut'
        });

      // 1. Pin the bottle container
      const isMobileDevice = window.innerWidth <= 768;
      
      ScrollTrigger.create({
        trigger: isMobileDevice ? '.hero-section' : containerRef.current,
        start: 'top top',
        endTrigger: isMobileDevice ? '.left-panel' : null,
        end: isMobileDevice ? 'bottom 45%' : 'bottom bottom', // Unpins right when the bottom of left panel reaches the center
        pin: bottleContainerRef.current,
        pinSpacing: isMobileDevice ? false : true,
        scrub: 1,
      });

      // 2. Elegant Rotation ON SCROLL
      // The bottle gently tilts as you scroll to the second section
      gsap.to(bottleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        rotation: 8,
        ease: 'sine.inOut'
      });

      // 3. Fade out hero text as we scroll down
      gsap.to(heroTextRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: isMobileDevice ? 'top -30%' : 'bottom center', // Fades out very fast on mobile so it doesn't overlap the bottle
          scrub: true,
        },
        y: isMobileDevice ? -200 : -100, // Moves up faster out of the way
        opacity: 0,
      });

      // 4. Fade in detail panels when they come into view
      gsap.fromTo(detailLeftRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: '.detail-section',
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(detailRightRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: '.detail-section',
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
          }
        }
      );

      // 5. Glide bottle back to center when scrolling to detail section
      gsap.fromTo('.bottle-scroll-container',
        { x: window.innerWidth > 768 ? '0vw' : '28vw' },
        {
          scrollTrigger: {
            trigger: '.detail-section',
            start: 'top bottom',
            end: 'top 70%', // Finishes moving to center much earlier!
            scrub: 1,
          },
          x: '0vw',
          ease: 'power2.inOut',
          immediateRender: false
        }
      );

      // 6. Watermark parallax down into detail section on mobile
      if (window.innerWidth <= 768) {
        gsap.to('.watermark', {
          scrollTrigger: {
            trigger: '.detail-section',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1,
          },
          y: '110vh', // Moves it down into the second section
          ease: 'none'
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="experience-wrapper relative w-full" style={{ backgroundColor: '#ffffff' }}>

      {/* SECTION 1: HERO */}
      <section className="hero-section relative w-full h-screen flex items-center overflow-hidden">
        {/* Watermark */}
        <div ref={watermarkRef} className="watermark absolute w-full h-full flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
          <h1 className="serif watermark-text flex">
            <span className="watermark-left">LO</span>
            <span className="watermark-right">PAZ</span>
          </h1>
        </div>

        {/* Hero Left Text */}
        <div ref={heroTextRef} className="hero-text relative flex flex-col hero-text-container" style={{ zIndex: 10 }}>
          <span className="fs-xl mb-2 flower-icon opacity-0" style={{ fontWeight: 200, color: '#432f16d4' }}>✻</span>
          <h1 className="serif mb-4 hero-headline">
            <div className="inline-block overflow-hidden"><div className="word inline-block">Smell</div></div>{' '}
            <div className="inline-block overflow-hidden"><div className="word inline-block">Is</div></div>{' '}
            <div className="inline-block overflow-hidden"><div className="word inline-block">A</div></div> <br/>
            <i>
              <div className="inline-block overflow-hidden"><div className="word inline-block">Word</div></div>{' '}
              <div className="inline-block overflow-hidden"><div className="word inline-block">•</div></div>{' '}
              <div className="inline-block overflow-hidden"><div className="word inline-block">Perfume</div></div>{' '}
              <div className="inline-block overflow-hidden"><div className="word inline-block">Is</div></div>
            </i> <br/>
            <span>
              <div className="inline-block overflow-hidden"><div className="word inline-block">Literature</div></div>
            </span>
          </h1>

          <div className="overflow-hidden mb-8">
            <p className="hero-desc text-secondary hero-bottom-element inline-block" style={{ color: '#6b6358' }}>
              Discover the beauty of fragrances with art and mind.<br/>
              Each scent is a quotation in the language of soul.
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="hero-bottom-element inline-block">
              <a href="#shop" className="btn-primary shop-btn pointer-events-auto" style={{ backgroundColor: '#1a1a1a', borderRadius: '30px', padding: '0.8rem 2rem', color: '#fff' }}>Discover More <span className="arrow-icon">→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DETAIL */}
      <section className="detail-section relative w-full h-screen flex items-center justify-between detail-section-container overflow-hidden">
        {/* Detail Left Panel */}
        <div ref={detailLeftRef} className="detail-panel left-panel flex flex-col" style={{ zIndex: 10 }}>
          <span className="fs-xs mb-4 text-secondary spacing-text">OLFACTORY PYRAMID</span>
          <h2 className="serif fs-xl mb-8 detail-heading">The Architecture of Scent</h2>

          <div className="note-group mb-4">
            <h4 className="fs-xs mb-2 text-secondary">TOP NOTES</h4>
            <p className="fs-sm">Cardamom, Papyrus, Cypress</p>
          </div>
          <div className="hairline-divider"></div>

          <div className="note-group mb-4">
            <h4 className="fs-xs mb-2 text-secondary">HEART NOTES</h4>
            <p className="fs-sm">Sandalwood, Virginia Cedar, Leather</p>
          </div>
          <div className="hairline-divider"></div>

          <div className="note-group mb-4">
            <h4 className="fs-xs mb-2 text-secondary">BASE NOTES</h4>
            <p className="fs-sm">Amber, Iris, Australian Sandalwood</p>
          </div>
        </div>

        {/* Detail Right Panel */}
        <div ref={detailRightRef} className="detail-panel right-panel">
          <span className="fs-xs mb-4 text-secondary spacing-text">CRAFT FRAGRANCE</span>
          <h2 className="serif fs-xl mb-4 detail-heading">Santal Trouble</h2>
          <p className="fs-sm text-secondary mb-8 detail-desc">
            Santal Trouble is a deeply aromatic fragrance background for those who seek the extraordinary. A timeless classic to the raw, unrefined warmth of pure Australian sandalwood.
          </p>

          <div className="flex justify-between items-center mb-4">
            <span className="fs-sm text-secondary">Volume</span>
            <span className="fs-sm fw-medium">50ml / 1.6FL. OZ</span>
          </div>
          <div className="hairline-divider divider-mb-1"></div>

          <div className="flex justify-between items-center mb-4">
            <span className="fs-sm text-secondary">Concentration</span>
            <span className="fs-sm fw-medium">Extrait de Parfum</span>
          </div>
          <div className="hairline-divider divider-mb-1"></div>

          <div className="flex justify-between items-center">
            <span className="fs-sm text-secondary">Origin</span>
            <span className="fs-sm fw-medium">Hand-bottled in Paris</span>
          </div>
        </div>
      </section>

      {/* Pinned Bottle Container */}
      <div ref={bottleContainerRef} className="absolute top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none" style={{ zIndex: 20 }}>
        {/* Scrollable Container for the bottle */}
        <div className="bottle-scroll-container">
          <img ref={bottleRef} src={bottleImg} alt="Santal Trouble" className="bottle-img" />
        </div>
      </div>

      {/* Footer bar at the bottom of the second section */}
      <div className="bottom-footer absolute bottom-0 left-0 w-full py-8 text-secondary fs-xs marquee-container">
        <div className="marquee-content gap-16">
          <span>100% BOTANICAL</span>
          <span>•</span>
          <span>COMPLIMENTARY LUXURY SAMPLES WITH EVERY BOTTLE</span>
          <span>•</span>
          <span>100% AUTHENTIC FRAGRANCES HAND-BOTTLED IN PARIS</span>
          <span>•</span>
          <span>100% BOTANICAL</span>
          <span>•</span>
          <span>COMPLIMENTARY LUXURY SAMPLES WITH EVERY BOTTLE</span>
          <span>•</span>
          <span>100% AUTHENTIC FRAGRANCES HAND-BOTTLED IN PARIS</span>
          <span>•</span>
        </div>
      </div>

    </div>
  );
}