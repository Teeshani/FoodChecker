import React from 'react';

const Footer = () => {
  return (
    <>
    <section className="footer">
    <div class="share">
    <a href="#" class="fab fa-facebook-f"></a>
    <a href="#" class="fab fa-twitter"></a>
    <a href="#" class="fab fa-instagram"></a>
    <a href="#" class="fab fa-linkedin"></a>
    </div>

    <div class="links">
          <a href="/">home</a> 
          <a href="/about">about</a>
          <a href="/review">review</a> 
          <a href="/contact">contact</a>
    </div>

    <div class="credit">
          created by <span>MST Creation</span> | all rights reserved
    </div>
    </section>
    
    </>
  );
};

export default Footer;
