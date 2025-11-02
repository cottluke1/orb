import React, { useEffect, useState, useRef, useId, useMemo } from 'react';

// --- STYLES ---
// This component injects all CSS into the document head.
// All styles, including GlassSurface.css, Hero.css, and the original CSS, are combined here.
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* --- Google Fonts --- */
      @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Merriweather:wght@400;700&display=swap');

      /* --- Global & Reset --- */
      :root {
          --color-red-deep: #A12C2C;
          --color-gold: #D4AF37;
          --color-white-soft: #f4f4f4;
          --color-white-pure: #ffffff;
          --color-text-dark: #333333;
          --color-text-light: #555555;
          --font-heading: 'Merriweather', serif;
          --font-body: 'Lato', sans-serif;
      }

      * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
      }

      html {
          scroll-behavior: smooth;
      }

      body {
          font-family: var(--font-body);
          background-color: var(--color-white-pure);
          color: var(--color-text-dark);
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
      }

      /* --- Reusable Components --- */
      .container {
          width: 90%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 0;
      }
      
      section {
          overflow: hidden; /* Contains animations */
      }

      h1, h2, h3 {
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--color-text-dark);
          margin-bottom: 20px;
      }

      h1 {
          font-size: 3.5rem;
          color: var(--color-white-pure);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      }

      h2 {
          font-size: 2.8rem;
          text-align: center;
          color: var(--color-red-deep);
      }
      
      h3 {
          font-size: 1.5rem;
      }

      p {
          font-size: 1.1rem;
          color: var(--color-text-light);
          margin-bottom: 15px;
      }

      .text-center {
          text-align: center;
      }

      .btn {
          display: inline-block;
          background-color: var(--color-red-deep);
          color: var(--color-white-pure);
          padding: 15px 35px;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          border: none;
          cursor: pointer;
      }

      .btn:hover {
          background-color: #8a2525;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(161, 44, 44, 0.3);
      }

      .image-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 450px;
          background-color: #cccccc;
          color: #555;
          font-style: italic;
          font-size: 1.2rem;
          border-radius: 8px;
          text-align: center;
          padding: 20px;
      }
      
      /* --- 1. Countdown Bar --- */
      #countdown-bar {
          background-color: #2a2a2a;
          color: var(--color-white-pure);
          padding: 12px 20px;
          text-align: center;
          font-weight: 700;
          font-size: 1rem;
          position: sticky;
          top: 0;
          z-index: 1000;
          letter-spacing: 0.5px;
      }
      #countdown-bar span {
          color: var(--color-gold);
          margin: 0 5px;
      }

      /* --- 2. Hero Section --- */
      #hero {
          height: 100vh;
          min-height: 700px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--color-white-pure);
          position: relative;
          background: #333; /* Fallback color */
          overflow: hidden;
      }

      .hero-video {
          position: absolute;
          top: 50%;
          left: 50%;
          width: auto;
          height: auto;
          min-width: 100%;
          min-height: 100%;
          transform: translate(-50%, -50%);
          object-fit: cover; /* Cover the entire area */
          z-index: 0;
          filter: brightness(0.8); /* Slightly dim the video */
      }

      .hero-content {
          z-index: 2; /* Sits above video and sparkles */
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
      }

      .hero-title-cursive {
          font-family: 'Dancing Script', cursive;
          font-size: 5rem; /* Large, elegant text */
          font-weight: 700;
          color: var(--color-white-pure);
          text-shadow: 0 3px 15px rgba(0, 0, 0, 0.6);
          margin-bottom: 30px; /* Space between title and button */
      }

      .hero-button-glass {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      .hero-button-glass:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }

      .hero-button-text {
          font-family: var(--font-body); /* Use 'Lato' from original CSS */
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--color-white-pure);
          text-decoration: none;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.5px;
      }

      .sparkles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
      }

      .sparkle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: var(--color-gold);
          border-radius: 50%;
          opacity: 0;
          animation: sparkle 15s infinite linear;
      }

      .sparkle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
      .sparkle:nth-child(2) { top: 50%; left: 30%; animation-delay: -2s; }
      .sparkle:nth-child(3) { top: 80%; left: 15%; animation-delay: -4s; }
      .sparkle:nth-child(4) { top: 10%; left: 50%; animation-delay: -6s; }
      .sparkle:nth-child(5) { top: 40%; left: 70%; animation-delay: -8s; }
      .sparkle:nth-child(6) { top: 70%; left: 60%; animation-delay: -10s; }
      .sparkle:nth-child(7) { top: 30%; left: 90%; animation-delay: -12s; }
      .sparkle:nth-child(8) { top: 60%; left: 85%; animation-delay: -14s; }
      .sparkle:nth-child(9) { top: 90%; left: 40%; animation-delay: -1s; }
      .sparkle:nth-child(10) { top: 5%; left: 25%; animation-delay: -3s; }

      @keyframes sparkle {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(20px, 50px); opacity: 0; }
      }
      
      /* --- 3. Intro Section --- */
      #intro {
          background-color: var(--color-white-soft);
      }
      #intro .container {
          max-width: 800px;
      }
      #intro p {
          font-size: 1.25rem;
          line-height: 1.8;
          color: var(--color-text-dark);
      }

      /* --- 4. How It Works Section --- */
      #how-it-works .container {
          max-width: 1200px;
      }
      .how-it-works-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
      }

      .how-it-works-steps {
          list-style: none;
      }

      .how-it-works-steps li {
          margin-bottom: 30px;
      }

      .how-it-works-steps h3 {
          display: flex;
          align-items: center;
          font-size: 1.4rem;
          color: var(--color-text-dark);
      }
      
      .how-it-works-steps .step-icon {
          display: inline-block;
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background-color: var(--color-red-deep);
          color: var(--color-white-pure);
          border-radius: 50%;
          font-weight: 700;
          margin-right: 15px;
          font-family: var(--font-body);
      }
      
      .specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 30px;
      }
      
      .spec-item {
          background: var(--color-white-soft);
          padding: 20px;
          border-radius: 8px;
          text-align: center;
      }
      .spec-item h4 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-red-deep);
          margin-bottom: 5px;
      }
      .spec-item p {
          font-size: 1rem;
          color: var(--color-text-dark);
          margin-bottom: 0;
          font-weight: 700;
      }

      /* --- 5. Testimonials Section --- */
      #testimonials {
          background-color: var(--color-white-soft);
      }

      .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
      }

      .review-card {
          background: var(--color-white-pure);
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      .review-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
      }

      .review-card .stars {
          font-size: 1.2rem;
          color: var(--color-gold);
          margin-bottom: 15px;
      }

      .review-card p.review-text {
          font-style: italic;
          color: var(--color-text-dark);
          font-size: 1.1rem;
          margin-bottom: 20px;
      }

      .review-card p.reviewer {
          font-weight: 700;
          color: var(--color-red-deep);
          font-size: 1rem;
          margin: 0;
      }

      /* --- 6. CTA / Order Section --- */
      #cta-order {
          background-color: var(--color-white-pure);
      }
      #cta-order .container {
          max-width: 900px;
      }
      
      .guarantee-text {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text-light);
          margin-top: -10px;
          margin-bottom: 10px;
      }
      
      .shipping-info {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text-dark);
          margin-bottom: 40px;
      }
      .shipping-info span {
          margin: 0 15px;
      }

      .order-options {
          max-width: 700px;
          margin: 0 auto 40px auto;
      }
      
      .order-option {
          display: flex;
          align-items: center;
          border: 2px solid #ddd;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 15px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative;
      }
      
      .order-option input[type="radio"] {
          width: 20px;
          height: 20px;
          margin-right: 20px;
          accent-color: var(--color-red-deep);
      }
      
      .order-option label {
          flex-grow: 1;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
      }
      
      .option-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-text-dark);
      }
      
      .option-price-details {
          display: flex;
          align-items: center;
          gap: 15px;
      }
      
      .option-price {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-text-dark);
          text-align: right;
      }
      
      .option-price .old-price {
          text-decoration: line-through;
          color: var(--color-text-light);
          font-size: 1rem;
          font-weight: 400;
          display: block;
      }
      
      .option-save {
          background-color: #28a745;
          color: var(--color-white-pure);
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 5px;
          font-size: 0.9rem;
      }
      
      .order-option.popular {
          border-color: var(--color-red-deep);
          border-width: 3px;
          box-shadow: 0 5px 20px rgba(161, 44, 44, 0.1);
      }
      
      .popular-badge {
          position: absolute;
          top: -15px;
          right: 20px;
          background-color: var(--color-red-deep);
          color: var(--color-white-pure);
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
      }
      
      .order-option:hover {
          border-color: var(--color-red-deep);
          box-shadow: 0 5px 20px rgba(161, 44, 44, 0.1);
      }
      
      .btn-cta {
          padding: 20px 60px;
          font-size: 1.4rem;
          width: 100%;
          max-width: 700px;
      }

      /* --- 7. Footer --- */
      footer {
          background-color: #2a2a2a;
          color: #aaa;
          padding: 40px 20px;
          text-align: center;
      }
      
      footer .footer-links {
          margin-bottom: 15px;
      }
      
      footer .footer-links a {
          color: #aaa;
          text-decoration: none;
          margin: 0 10px;
          transition: color 0.3s ease;
      }
      
      footer .footer-links a:hover {
          color: var(--color-white-pure);
      }
      
      footer p {
          font-size: 0.9rem;
          margin: 0;
          color: #888;
      }

      /* --- Animation: Fade-in on Scroll --- */
      .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.39, 0.575, 0.565, 1), 
                      transform 0.8s cubic-bezier(0.39, 0.575, 0.565, 1);
      }

      .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
      }
      
      /* --- GlassSurface.css --- */
      .glass-surface {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: opacity 0.26s ease-out;
      }

      .glass-surface__filter {
        width: 100%;
        height: 100%;
        pointer-events: none;
        position: absolute;
        inset: 0;
        opacity: 0;
        z-index: -1;
      }

      .glass-surface__content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        border-radius: inherit;
        position: relative;
        z-index: 1;
      }

      .glass-surface--svg {
        background: light-dark(hsl(0 0% 100% / var(--glass-frost, 0)), hsl(0 0% 0% / var(--glass-frost, 0)));
        backdrop-filter: var(--filter-id, url(#glass-filter)) saturate(var(--glass-saturation, 1));
        box-shadow:
          0 0 2px 1px light-dark(color-mix(in oklch, black, transparent 85%), color-mix(in oklch, white, transparent 65%))
            inset,
          0 0 10px 4px light-dark(color-mix(in oklch, black, transparent 90%), color-mix(in oklch, white, transparent 85%))
            inset,
          0px 4px 16px rgba(17, 17, 26, 0.05),
          0px 8px 24px rgba(17, 17, 26, 0.05),
          0px 16px 56px rgba(17, 17, 26, 0.05),
          0px 4px 16px rgba(17, 17, 26, 0.05) inset,
          0px 8px 24px rgba(17, 17, 26, 0.05) inset,
          0px 16px 56px rgba(17, 17, 26, 0.05) inset;
      }

      .glass-surface--fallback {
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(12px) saturate(1.8) brightness(1.1);
        -webkit-backdrop-filter: blur(12px) saturate(1.8) brightness(1.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow:
          0 8px 32px 0 rgba(31, 38, 135, 0.2),
          0 2px 16px 0 rgba(31, 38, 135, 0.1),
          inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
          inset 0 -1px 0 0 rgba(255, 255, 255, 0.2);
      }

      @media (prefers-color-scheme: dark) {
        .glass-surface--fallback {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px) saturate(1.8) brightness(1.2);
          -webkit-backdrop-filter: blur(12px) saturate(1.8) brightness(1.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.1);
        }
      }

      @supports not (backdrop-filter: blur(10px)) {
        .glass-surface--fallback {
          background: rgba(255, 255, 255, 0.4);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.3);
        }

        .glass-surface--fallback::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.15);
          border-radius: inherit;
          z-index: -1;
        }
      }

      @supports not (backdrop-filter: blur(10px)) {
        @media (prefers-color-scheme: dark) {
          .glass-surface--fallback {
            background: rgba(0, 0, 0, 0.4);
          }

          .glass-surface--fallback::before {
            background: rgba(255, 255, 255, 0.05);
          }
        }
      }

      .glass-surface:focus-visible {
        outline: 2px solid light-dark(#007aff, #0a84ff);
        outline-offset: 2px;
      }
      
      /* --- Responsive Design --- */
      @media (max-width: 992px) {
          .how-it-works-grid {
              grid-template-columns: 1fr;
          }
          .how-it-works-grid .image-placeholder {
              order: -1; /* Move image to top on mobile */
          }
          .testimonials-grid {
              grid-template-columns: 1fr;
          }
      }
      
      @media (max-width: 768px) {
          h1 { font-size: 2.8rem; }
          .hero-title-cursive { font-size: 3.5rem; }
          h2 { font-size: 2.2rem; }

          .container {
              padding: 60px 0;
          }
          
          .order-option {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
          }
          .order-option label {
              flex-direction: column;
              align-items: flex-start;
          }
          .option-price-details {
              margin-top: 10px;
              width: 100%;
              justify-content: space-between;
          }
          .option-price {
              text-align: left;
              margin-top: 5px;
          }
          .btn-cta {
              font-size: 1.2rem;
          }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

// --- GlassSurface Component (from user) ---
const GlassSurface = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {}
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const redChannelRef = useRef(null);
  const greenChannelRef = useRef(null);
  const blueChannelRef = useRef(null);
  const gaussianBlurRef = useRef(null);

  const generateDisplacementMap = useMemo(() => {
    return () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const actualWidth = rect?.width || 400;
      const actualHeight = rect?.height || 200;
      const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

      const svgContent = `
        <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#0000"/>
              <stop offset="100%" stop-color="red"/>
            </linearGradient>
            <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0000"/>
              <stop offset="100%" stop-color="blue"/>
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
          <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
          <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
          <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
        </svg>
      `;

      return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [borderRadius, borderWidth, brightness, opacity, blur, mixBlendMode, redGradId, blueGradId]);

  const updateDisplacementMap = () => {
    feImageRef.current?.setAttribute('href', generateDisplacementMap());
  };

  useEffect(() => {
    updateDisplacementMap();
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset }
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute('scale', (distortionScale + offset).toString());
        ref.current.setAttribute('xChannelSelector', xChannel);
        ref.current.setAttribute('yChannelSelector', yChannel);
      }
    });

    gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode,
    generateDisplacementMap
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateDisplacementMap]);
  
  useEffect(() => {
    setTimeout(updateDisplacementMap, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, generateDisplacementMap]);

  const supportsSVGFilters = () => {
    if (typeof window === 'undefined') return false;
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);

    if (isWebkit || isFirefox) {
      return false;
    }
    
    // Check for CSS.supports() availability
    if (!window.CSS || typeof window.CSS.supports !== 'function') {
      return false;
    }

    // Check if backdrop-filter with a url is supported
    return window.CSS.supports(`(backdrop-filter: url(#${filterId}))`) || window.CSS.supports(`(-webkit-backdrop-filter: url(#${filterId}))`);
  };
  
  const memoizedSupportsSVGFilters = useMemo(supportsSVGFilters, [filterId]);


  const containerStyle = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    '--glass-frost': backgroundOpacity,
    '--glass-saturation': saturation,
    '--filter-id': `url(#${filterId})`
  };

  return (
    <div
      ref={containerRef}
      className={`glass-surface ${memoizedSupportsSVGFilters ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`}
      style={containerStyle}
    >
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />

            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" id="redchannel" result="dispRed" />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />

            <feDisplacementMap
              ref={greenChannelRef}
              in="SourceGraphic"
              in2="map"
              id="greenchannel"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />

            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

      <div className="glass-surface__content">{children}</div>
    </div>
  );
};


// --- Custom Hook for Scroll Animation ---
const useFadeIn = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return ref;
};

// --- 1. Countdown Bar ---
const CountdownBar = () => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let year = now.getFullYear();
      
      if (now.getMonth() === 11 && now.getDate() > 25) {
          year += 1; // Target next year's Christmas
      }
      
      const christmas = new Date(year, 11, 25);
      const diff = christmas.getTime() - now.getTime();

      if (diff <= 0) {
          setCountdown("Merry Christmas!");
          clearInterval(interval);
          return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(
          `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="countdown-bar">
      🎁 Christmas Delivery Guaranteed! <span>|</span> Time left to order: 
      <span id="countdown-timer"> {countdown}</span>
    </div>
  );
};

// --- 2. Hero Section ---
const Hero = () => {
  return (
    <header id="hero">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="hero-video"
        // Assuming sr.mov is in the /public folder
        src="/sr.mov" 
      >
        Your browser does not support the video tag.
      </video>

      <div className="sparkles">
        {[...Array(10)].map((_, i) => <div className="sparkle" key={i}></div>)}
      </div>

      <div className="hero-content">
        <h1 className="hero-title-cursive">
          Christmas Core
        </h1>

        <a href="#cta-order" style={{ textDecoration: 'none' }}>
          <GlassSurface
            width={300}
            height={70}
            borderRadius={50}
            brightness={40}
            opacity={0.8}
            blur={8}
            displace={5}
            mixBlendMode="screen"
            className="hero-button-glass"
          >
            <span className="hero-button-text">
              Order Yours for Christmas
            </span>
          </GlassSurface>
        </a>
      </div>
    </header>
  );
};

// --- 3. Intro Section ---
const Intro = () => {
  const fadeInRef = useFadeIn();
  return (
    <section id="intro" className="fade-in-section" ref={fadeInRef}>
      <div className="container text-center">
        <h2>Give the Gift of a Feeling</h2>
        <p>This Christmas, give more than just a *thing*. Give a feeling. The Christmas Memory Orb is a beautiful, modern keepsake designed to hold your most priceless memories.</p>
        <p>From your baby's first Christmas and the sound of your grandparents' laughter to the proposal you'll never forget, the Orb transforms your digital memories into a glowing, emotional experience. It's the perfect, thoughtful gift for the person you love most.</p>
      </div>
    </section>
  );
};

// --- 4. How It Works Section ---
const HowItWorks = () => {
  const fadeInRef = useFadeIn();
  return (
    <section id="how-it-works" className="fade-in-section" ref={fadeInRef}>
      <div className="container">
        <h2 className="text-center">Magic, Made Simple</h2>
        
        <div className="how-it-works-grid">
          <div className="how-it-works-content">
            <ul className="how-it-works-steps">
              <li>
                <h3><span className="step-icon">1</span>Connect & Upload</h3>
                <p>Easily connect the Orb to any Mac or PC with the included USB-C cable. Simply drag and drop your favorite videos and photos.</p>
              </li>
              <li>
                <h3><span className="step-icon">2</span>Tap to Relive</h3>
                <p>With simple, one-touch controls, you can play, pause, and switch between your most cherished memories with a single tap.</p>
              </li>
              <li>
                <h3><span className="step-icon">3</span>Watch Anywhere</h3>
                <p>The long-lasting battery provides 2-4 hours of continuous playback, perfect for passing around the tree or displaying on the mantle.</p>
              </li>
            </ul>
            
            <div className="specs-grid">
              <div className="spec-item">
                <h4>Resolution</h4>
                <p>480 x 480</p>
              </div>
              <div className="spec-item">
                <h4>Memory</h4>
                <p>4 GB Built-In</p>
              </div>
              <div className="spec-item">
                <h4>Battery</h4>
                <p>2-4 Hour Life</p>
              </div>
              <div className="spec-item">
                <h4>Material</h4>
                <p>ABS + Crystal Glass</p>
              </div>
            </div>
          </div>
          
          <div className="image-placeholder">
            [ Looping video or GIF demonstrating product use: <br /> uploading, tapping screen, orb glowing ]
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 5. Testimonials Section ---
const Testimonials = () => {
  const fadeInRef = useFadeIn();
  return (
    <section id="testimonials" className="fade-in-section" ref={fadeInRef}>
      <div className="container">
        <h2 className="text-center">What Our Families Are Saying</h2>
        
        <div className="testimonials-grid">
          <div className="review-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="review-text">"I loaded this with a montage of our family Christmases for my wife. Her reaction was priceless. There wasn't a dry eye in the house. This is, without a doubt, the best gift I've ever given."</p>
            <p className="reviewer">— Mark R.</p>
          </div>

          <div className="review-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="review-text">"My son gave me this for my birthday, filled with videos of my grandkids. I keep it on my nightstand and watch it every night. It brings back so many beautiful feelings. An absolutely magical little device."</p>
            <p className="reviewer">— Sarah K.</p>
          </div>

          <div className="review-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="review-text">"We put our old engagement video and clips from our wedding on it. It's like holding a little time capsule. The quality is amazing, and it's so much more special than just watching on a phone."</p>
            <p className="reviewer">— Hana Kim</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 6. CTA / Order Section ---
const CTAOrder = () => {
  const fadeInRef = useFadeIn();
  const [selectedOption, setSelectedOption] = useState('opt2');

  return (
    <section id="cta-order" className="fade-in-section" ref={fadeInRef}>
      <div className="container text-center">
        <h2>Capture Your Memories Today</h2>
        <p className="guarantee-text">Guaranteed Christmas Delivery for Orders Placed Before Dec 15th!</p>
        <p className="shipping-info">
          <span>30-Day Guarantee</span> | <span>Free Worldwide Shipping</span>
        </p>

        <div className="order-options">
          
          {/* Option 1 */}
          <div 
            className={`order-option ${selectedOption === 'opt1' ? 'popular' : ''}`} 
            onClick={() => setSelectedOption('opt1')}
          >
            <input 
              type="radio" 
              name="product_option" 
              id="opt1"
              checked={selectedOption === 'opt1'}
              onChange={() => setSelectedOption('opt1')}
            />
            <label htmlFor="opt1">
              <span className="option-title">Adopt 1 Orb</span>
              <div className="option-price-details">
                <div className="option-price">
                  $59.99
                  <span className="old-price">$85.70</span>
                </div>
                <span className="option-save">Save $25</span>
              </div>
            </label>
          </div>

          {/* Option 2 (Most Popular) */}
          <div 
            className={`order-option ${selectedOption === 'opt2' ? 'popular' : ''}`} 
            onClick={() => setSelectedOption('opt2')}
          >
            <span className="popular-badge">Most Popular</span>
            <input 
              type="radio" 
              name="product_option" 
              id="opt2"
              checked={selectedOption === 'opt2'}
              onChange={() => setSelectedOption('opt2')}
            />
            <label htmlFor="opt2">
              <span className="option-title">Adopt 2 Orbs</span>
              <div className="option-price-details">
                <div className="option-price">
                  $116.38
                  <span className="old-price">$171.40</span>
                </div>
                <span className="option-save">Save $55</span>
              </div>
            </label>
          </div>

          {/* Option 3 */}
          <div 
            className={`order-option ${selectedOption === 'opt3' ? 'popular' : ''}`} 
            onClick={() => setSelectedOption('opt3')}
          >
            <input 
              type="radio" 
              name="product_option" 
              id="opt3"
              checked={selectedOption === 'opt3'}
              onChange={() => setSelectedOption('opt3')}
            />
            <label htmlFor="opt3">
              <span className="option-title">Adopt 3 Orbs</span>
              <div className="option-price-details">
                <div className="option-price">
                  $170.97
                  <span className="old-price">$257.10</span>
                </div>
                <span className="option-save">Save $85</span>
              </div>
            </label>
          </div>
        </div>

        <a href="#payment-form" className="btn btn-cta" onClick={(e) => {
            e.preventDefault();
            // In a real app, this would scroll to/show the payment form
            console.log('Proceeding to payment for:', selectedOption);
        }}>
          Get My Memory Orb
        </a>
      </div>
    </section>
  );
};

// --- 7. Footer ---
const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <a href="#">Contact Us</a> | 
        <a href="#">FAQ</a> | 
        <a href="#">30-Day Guarantee</a> | 
        <a href="#">Privacy Policy</a> | 
        <a href="#">Terms of Service</a>
      </div>
      <p>© 2025 Christmas Memory Orb. All Rights Reserved.</p>
    </footer>
  );
};


// --- Main App Component ---
export default function App() {
  return (
    <>
      <GlobalStyles />
      <CountdownBar />
      <Hero />
      <main>
        <Intro />
        <HowItWorks />
        <Testimonials />
        <CTAOrder />
      </main>
      <Footer />
    </>
  );
}
