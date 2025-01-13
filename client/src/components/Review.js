import React, { useRef, useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import './Review.css';
import ReviewImg from '../assets/images/rev-img.jpg';
import next_icon from '../assets/images/next-icon.png';
import back_icon from '../assets/images/back-icon.png';
import user_1 from '../assets/images/user-1.jpg';
import user_2 from '../assets/images/user-2.jpg';
import user_3 from '../assets/images/user-3.jpg';
import user_4 from '../assets/images/user-4.jpg';
import Footer from './Footer';

const Review = () => {
  const sliderRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Joy Anthony',
      img: user_1,
      review:
        'This platform is a game-changer! It made checking my food items for compliance so easy and stress-free. I highly recommend it to anyone traveling abroad with Sri Lankan goods.',
    },
    {
      name: 'Sarah Fernando',
      img: user_2,
      review:
        'Carrying my favorite spices and sweets has never been simpler. The compliance checker is quick, accurate, and easy to use. A must-have tool for every traveler!',
    },
    {
      name: 'Jane Perera',
      img: user_3,
      review:
        'I was unsure if my food items met the regulations, but this tool cleared my doubts instantly. It saved me so much time and worry. Excellent service!',
    },
    {
      name: 'Merisa Jenifer',
      img: user_4,
      review:
        'As someone who loves sharing Sri Lankan treats abroad, this platform gave me the confidence I needed. It’s reliable, efficient, and incredibly helpful!',
    },
  ];

  const slideForward = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const slideBackward = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <Navbar />
      <Hero cName="hero-mid" heroImg={ReviewImg} title="Reviews" />
      <div className="topic">
      <h1>What Our Travelers Say</h1>
      </div>
      
      <div className="testimonials">
        <img src={back_icon} alt="Back" className="back-btn" onClick={slideBackward} />
        <div className="slider" ref={sliderRef}>
          <ul style={{ transform: `translateY(-${currentIndex * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <li key={index}>
                <div className="slide">
                  <img src={testimonial.img} alt={testimonial.name} />
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.review}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <img src={next_icon} alt="Next" className="next-btn" onClick={slideForward} />
      </div>
      <Footer />
    </>
  );
};

export default Review;
