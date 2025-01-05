import React from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";

const Contact = () => {
  return (
    <>
    <Navbar />
    <section className="contact">
    <h1 class="heading">
          <span>contact</span> us
        </h1>
        <div class="row">
        <iframe
            class="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7930182.014594708!2d79.64764863975888!3d7.797226002369038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25092a5a5d8eb%3A0xcdfaa99e50e18064!2sSri%20Lanka!5e0!3m2!1sen!2s!4v1697903738920!5m2!1sen!2s"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
          <form>
          <h3>get in touch</h3>
          <div class="inputBox">
              <span class="fas fa-user"></span>
              <input type="text" placeholder="name" />
            </div>
          <div class="inputBox">
              <span class="fas fa-envelope"></span>
              <input type="email" placeholder="email" />
            </div>
          <div class="inputBox">
              <span class="fas fa-phone"></span>
              <input type="number" placeholder="number" />
            </div>
          <input type="submit" value="contact now" class="btn" />
          </form>
        </div>
    </section>
    <Footer />
    </>
  );
};

export default Contact;
