import React from 'react'
import Navbar from './Navbar';
import AboutImg from "../assets/images/about-img.jpg";
import Footer from "./Footer";


const About = () => {
  return (
  <>
  <Navbar />
  
 <section className="about">
  
  <h1 className="heading">
    
     <span>about</span> us
  </h1>
  <div className="row">
          <div className="image">
            <img src={AboutImg} alt="" />
          </div>
          <div className="content">
          <h3>Ensuring Safe Travels with Trusted Compliance Checks</h3>
          <p>Welcome to the Food Compliance Checker, We are here to assist Sri Lankan travelers in ensuring their 
             food items comply with customs regulations. Our AI-powered platform provides instant compliance checks 
             for items like spices, sweets, and packaged goods, making your travel hassle-free.
          </p>
          <p>By simplifying the process, we aim to make your journey safer, smoother, and stress-free. Thank you for
             choosing us as your trusted travel companion!
          </p>
          <a href="#" className="btn">
              Learn more
            </a>
          </div>
  </div>
  </section>
  <Footer /> 

  </>
  );
};

export default About;

  

