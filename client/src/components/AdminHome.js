import React from "react";

export default function AdminHome({ userData }) {
  const logOut = () => {
    localStorage.clear();
    window.location.href = "./login";
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          <h1>Welcome Admin</h1>
          <p>Name: {userData.fname}</p>
          <p>Email: {userData.email}</p>
          <br />
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
