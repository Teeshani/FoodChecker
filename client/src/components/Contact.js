import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import ContactImg from "../assets/images/cont-img.jpg";
import "./Contact.css";
import Footer from "./Footer";

const Contact = () => {

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "289801d0-814f-4bca-b89d-8efe1f3455c8");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };



  return (
    <>
    <Navbar />

    <Hero
  cName="hero-mid"
  heroImg={ContactImg}
  title="Contact Us"
  />

    <section className="contact">
        <div class="row">
          <form onSubmit={onSubmit}>
          <h3>we’re here to help you</h3>
          <div class="inputBox">
              <span class="fas fa-user"></span>
              <input type="text" name='name' placeholder="Enter your name" required/>
            </div>
          <div class="inputBox">
              <span class="fas fa-phone"></span>
              <input type="tel" name='phone' placeholder="Enter your mobile number" required/>
            </div>
          <div class="inputBox">
              <span class="fas fa-envelope"></span>
              <input type="message" placeholder="Enter your message" required/>
            </div>
          <input type="submit" value="contact now" class="btn" />
          </form>
          <span>{result}</span>
        </div>
    </section>
    <Footer />
    </>
  );
};

export default Contact;
