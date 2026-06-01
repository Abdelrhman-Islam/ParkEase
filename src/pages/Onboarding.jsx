import React from 'react';
import '../layouts/Onboarding.css'; 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const Onboarding = () => {
  // التشيك على وجود التوكن لتحديد وجهة الزرار أوتوماتيك
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="page-shell">
      <Navbar/>
      
      <main className="hero">
        <section className="hero-copy">
          <h1>Welcome to<br />ParkEase</h1>
          <p>
            Seamless Parking. Find your perfect spot
            instantly. One garage, zero hassle.
          </p>

          <div className="features">
            <FeatureItem 
              iconPath="M13 2 5 13h5l-1 9 8-11h-5l1-9Z"
              title="Instant Booking"
              desc="Reserve your spot in seconds with real-time availability"
              type="blue"
            />
            <FeatureItem 
              iconPath="M20 11v1a8 8 0 1 1-4.7-7.3 M20 4-8.5 8.5-2.5-2.5"
              title="Visual Parking Map"
              desc="See exactly where you'll park with our interactive 2D map"
              type="green"
            />
          </div>

          {/* لو مسجل يروح للجراجات، مش مسجل يروح للوجين */}
          <Link 
            to={isAuthenticated ? "/garages" : "/login"} 
            className="cta-button"
          >
            Get Started
          </Link>
        </section>

        <section className="hero-visual">
          <div className="visual-glow"></div>
          <motion.img 
            src="/car_fixed_transparent.png" 
            alt="ParkEase car" 
            className="car-image"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </section>
      </main>
    </div>
  );
};

const FeatureItem = ({ iconPath, title, desc, type }) => (
  <article className="feature-item">
    <div className={`feature-icon ${type}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={iconPath} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  </article>
);

export default Onboarding;