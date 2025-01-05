import React, { useRef } from "react";
import Logo from "../assets/images/logo.jpg";

const Navbar = () => {
  const navbarRef = useRef();
  const searchRef = useRef();
  
const navbarHandler = () => {
    navbarRef.current.classList.toggle("active");
    searchRef.current.classList.remove("active");
};

const searchHandler = () => {
  searchRef.current.classList.toggle("active");
  navbarRef.current.classList.remove("active");
};

  return (
    <>
      <header className="header">
        <a href="#" className="logo">
          <img src={Logo} alt="" />
        </a>
        <nav className="navbar" ref={navbarRef}> 
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/review">review</a>
          <a href="/contact">contact</a>

        </nav>

        <a href="#" className="btn">
              Login
            </a>
        
        <div className="icons">
        <div className="fas fa-search" id="search-btn" onClick={searchHandler}></div>
        <div className="fas fa-bars" id="menu-btn" onClick={navbarHandler}></div>
        </div>

        <div className="search-form" ref={searchRef}>
          <input type="search" placeholder="search here..." id="search-box"/>
          <label htmlFor="search-box" className="fas fa-search"></label>
        </div>

        
        


    </header>
    </>
  );
};

export default Navbar;
