import React, { useState, useEffect } from "react";
import axios from "axios";
import './FeedbackManagement.css';

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/feedback", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFeedbacks(response.data); // Ensure feedbacks are correctly set
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks(); // Fetch feedbacks on page load
  }, []);

  // Handle feedback deletion
  const handleDeleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/feedback/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchFeedbacks(); // Refresh feedbacks after deletion
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="feedback-management-container">
      <h2>Manage User Feedbacks</h2>

      {/* Display existing feedbacks */}
      <table className="feedback-list">
        <thead>
          <tr>
            <th>User Name</th> {/* Add column for user name */}
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.name}</td> {/* Display the name of the user */}
                <td>{feedback.message}</td> {/* Display the feedback message */}
                <td>
                  <button onClick={() => handleDeleteFeedback(feedback._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No feedbacks found.</td> {/* Adjust the colspan */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackManagement;
