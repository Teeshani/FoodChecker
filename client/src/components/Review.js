import React from 'react';
import Navbar from './Navbar';
import { review } from "../Data";
import qouteImg from "../assets/images/quote-img.png";
import Footer from "./Footer";

const Review = () => {
  return (
  <>
  <Navbar />
    <section className="review" >
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
    <Footer />
    </> 
  );
};

export default Review;
