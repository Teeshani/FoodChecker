import React from 'react'
import './AdminHome.css'

const AdminHome = () => {
  return (
    
      <div className="adminhome-container">
        <h1>Welcome AdminHome</h1>
        
        <button className="logout-button" onClick={() => { 
          localStorage.clear();
          window.location.href = "./"; 
        }}>Log Out</button>
      </div>
    
  );

}

export default AdminHome
