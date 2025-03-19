import React, { useState, useEffect } from 'react';
import './FeedbackPage.css';
import { Link } from 'react-router-dom';


const FeedbackPage = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedbacks from backend
  useEffect(() => {
    fetch('http://localhost:8080/api/feedback')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error('Error fetching feedback:', err));
  }, []);

  // Handle feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = { name, message };

    try {
      const response = await fetch('http://localhost:8080/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        const newFeedback = await response.json();
        setFeedbacks([newFeedback, ...feedbacks]); // Add new feedback to list
        setName('');
        setMessage('');
      } else {
        alert('Error submitting feedback');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="feedback-page-container">
      <h2 className="feedback-page-title">Submit Your Feedback</h2>
      <form className="feedback-page-form" onSubmit={handleSubmit}>
        <input
          className="feedback-page-input"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="feedback-page-textarea"
          placeholder="Write your feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button className="feedback-page-submit" type="submit">Submit</button>
      </form>

      <h2 className="feedback-page-title">User Feedback</h2>
      <ul className="feedback-page-list">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <li key={feedback._id} className="feedback-page-item">
              <strong className="feedback-page-name">{feedback.name}</strong>: {feedback.message}
            </li>
          ))
        ) : (
          <p className="feedback-page-no-feedback">No feedback available</p>
        )}
      </ul>

      {/* Link to Feedback Management Page */}
      <div>
        <Link to="/">
          <button>Logout</button>
        </Link>
      </div>

      
    </div>
  );
};

export default FeedbackPage;
