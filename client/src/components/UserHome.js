import React from 'react'
import './UserHome.css'

const UserHome = () => {
  return (
    
      <div className="userhome-container">
        <h1>Welcome UserHome</h1>
        
        <button className="logout-button" onClick={() => { 
          localStorage.clear();
          window.location.href = "./"; 
        }}>Log Out</button>
      </div>
    
  );

}

export default UserHome
