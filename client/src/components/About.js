import React from 'react'
import Navbar from './Navbar';
import Hero from './Hero';
import AboutImg from "../assets/images/ab-1.jpg";
import "./About.css";
import Footer from "./Footer";


const About = () => {
  return (
  <>
  <Navbar />

  <Hero
  cName="hero-mid"
  heroImg={AboutImg}
  title="About Us"
  />

  <div className="ab-container">
    <h1>Why Choose Us</h1>
    <p>We provide trusted, AI-powered compliance checks to ensure reliability and accuracy. Our platform is designed
       for efficiency, delivering instant results to save you time. With a user-friendly interface, we offer 
       convenience and hassle-free navigation. Most importantly, we value cultural awareness, helping you carry a 
       piece of your home abroad with confidence.</p>

    <h1>Our Mission</h1>
    <p>Our mission is to empower travelers with the tools they need to confidently comply with international food 
       regulations. By providing instant, reliable, and accurate compliance checks, we strive to make your journeys 
       safer and stress-free.</p>

    <h1>Our Vision</h1>
    <p>To become a global leader in simplifying international travel by providing smart, accessible, and AI-driven 
       compliance solutions. We envision a future where travelers can carry cultural foods abroad effortlessly 
       while adhering to all legal requirements.</p>
  </div>
  
  <Footer />
  </>
  );
};

export default About;

  

