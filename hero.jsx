import React from 'react';
import GlassSurface from './GlassSurface'; // Import the component you provided
import './GlassSurface.css'; // Import the component's CSS
import './Hero.css';         // Import the new styles below

const Hero = () => {
  return (
    <header id="hero">
      
      {/* 1. Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="hero-video"
      >
        <source src="/sr.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Sparkle Overlay (from previous design) */}
      <div className="sparkles">
        {[...Array(10)].map((_, i) => <div className="sparkle" key={i}></div>)}
      </div>

      {/* 2. Centered Content */}
      <div className="hero-content">
        
        {/* Cursive Title */}
        <h1 className="hero-title-cursive">
          Christmas Core
        </h1>

        {/* 3. GlassSurface Button */}
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

export default Hero;
