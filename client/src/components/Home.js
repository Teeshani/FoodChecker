import React from 'react';
import Navbar from './Navbar';
import AboutImg from "../assets/images/about-img.jpg";
import { review } from "../Data";
import qouteImg from "../assets/images/quote-img.png";
import mail_icon from "../assets/images/mail-icon.png";
import phone_icon from "../assets/images/phone-icon.png";
import location_icon from "../assets/images/location-icon.png";
import Footer from "./Footer";

const Home = () => {
  return (
  <>
  <section className="home" id="home">
  <div className="content">
    <Navbar />
  <h3>
  Welcome <span>to the </span>Food Compliance Checker
  </h3>
  <p>
  Your trusted AI-powered assistant to help Sri Lankan travelers ensure their food items comply with customs regulations. With our easy-to-use platform, you can quickly verify the compliance of popular Sri Lankan food items and travel hassle-free. Start exploring today to make your journey smoother and stress-free!
  </p>
  <a href="#" className="btn">
  Check Compliance Now
  </a>
  </div>

  </section>

  <section className="about">
  <h1 className="heading">
          <span>who</span> we <span> are</span>
  </h1>
  <div className="row">
          <div className="image">
            <img src={AboutImg} alt="" />
          </div>
          <div className="content">
          <h3>Ensuring Safe Travels with Trusted Compliance Checks</h3>
          <p>Welcome to the Food Compliance Checker, We are an innovative team dedicated to simplifying
             international travel for Sri Lankan travelers. Our platform leverages cutting-edge AI technology 
             to ensure the food items you carry comply with customs regulations. Whether it's spices, sweets, or 
             packaged goods, we aim to provide a seamless, hassle-free experience for every traveler.
          </p>
          
          <a href="#" className="btn">
              Learn more
            </a>
          </div>
  </div>
  </section> 

  <section className="review" id="review">
        <h1 className="heading">
            travelers' <span>reviews</span>
        </h1>
        <div className="box-container">
{
    review.map((item,index)=> (
        <div className="box" key={index * Math.random()}>
            
            <img src={qouteImg} alt="" className="quote" />
            <p>{item.text}</p>
            <img src={item.img} alt="" className="user" />
            <h3>{item.name}</h3>
            <div className="stars">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star-half-alt" />
        </div>
        </div>
    ))
}                    
    </div>
    </section>

    <section className="contact">
    <h1 class="heading">
    <span>get</span> in <span> touch</span>
        </h1>
        <div class="row">
        <iframe
            class="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7930182.014594708!2d79.64764863975888!3d7.797226002369038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25092a5a5d8eb%3A0xcdfaa99e50e18064!2sSri%20Lanka!5e0!3m2!1sen!2s!4v1697903738920!5m2!1sen!2s"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
          <form>
          <h3>send us a message</h3>
          <p>We’re here to help! Whether you have questions, feedback, or need assistance, feel free to reach out to 
         us. Your journey matters to us, and we’re committed to making it smooth and hassle-free. Get in touch 
         today!</p>
      <ul>
        <li><img src={mail_icon} alt="" />malishateeshani@gmail.com</li>
        <li><img src={phone_icon} alt="" />0764057443</li>
        <li><img src={location_icon} alt="" />59/8F, School Lane, Nawala, Rajagiriya</li>
      </ul>
          </form>
        </div>
    </section>
    <Footer />
  </>
  
  );
    
};
  
export default Home;
