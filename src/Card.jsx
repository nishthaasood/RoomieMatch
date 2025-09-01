import React from "react";
import "./App.css";

const Card = ({ name, age, description, budget, interests, dealbrakers, leaseDuration, moveinDate }) => {
  return (
    <div className="card-custom">
      <h2 className="card-header">{name}, {age}</h2>
      <p className="card-description">{description}</p>

      <p><span className="card-section-title">Budget:</span> ₹{budget}</p>
      <p><span className="card-section-title">Lease Duration:</span> {leaseDuration} months</p>
      <p><span className="card-section-title">Move-in Date:</span> {new Date(moveinDate).toLocaleDateString()}</p>

      {interests && interests.length > 0 && (
        <div>
          <h3 className="card-section-title">Interests</h3>
          {interests.map((q, idx) => (
            <span key={idx} className="tag interest">{q}</span>
          ))}
        </div>
      )}

      {dealbrakers && dealbrakers.length > 0 && (
        <div>
          <h3 className="card-section-title">Deal Breakers</h3>
          {dealbrakers.map((d, idx) => (
            <span key={idx} className="tag dealbreaker">{d}</span>
          ))}
        </div>
      )}

      <div className="card-actions">
        <div className="action-buttons">
          <button className="action-btn">👎</button>
          <button className="action-btn">⭐</button>
          <button className="action-btn">👍</button>
        </div>
        <button className="message-btn">Message</button>
      </div>
    </div>
  );
};

export default Card;
