import React, { useState } from "react";
import "./App.css";

const Card = ({
  name,
  age,
  description,
  budget,
  interests,
  dealbrakers,
  leaseDuration,
  moveinDate,
  imageURL,
}) => {
  const [toShow, setToShow] = useState(true);

  if (!toShow) return null; // completely removes the card when ❌ is clicked

  return (
    <div className="card-custom">
      {/* Top Section with Image + Name */}
      <div className="card-header-section">
        {imageURL && (
          <img
            src={imageURL}
            alt={`${name}'s profile`}
            className="card-avatar"
          />
        )}
        <h2 className="card-header">
          {name}, {age}
        </h2>
      </div>

      {/* Bio */}
      <p className="card-description">{description}</p>

      {/* Budget & Lease Info */}
      <p>
        <span className="card-section-title">Budget:</span> ₹{budget}
      </p>
      <p>
        <span className="card-section-title">Lease Duration:</span>{" "}
        {leaseDuration} months
      </p>
      <p>
        <span className="card-section-title">Move-in Date:</span>{" "}
        {new Date(moveinDate).toLocaleDateString()}
      </p>

      {/* Interests */}
      {interests && interests.length > 0 && (
        <div>
          <h3 className="card-section-title">Interests</h3>
          {interests.map((q, idx) => (
            <span key={idx} className="tag interest">
              {q}
            </span>
          ))}
        </div>
      )}

      {/* Deal Breakers */}
      {dealbrakers && dealbrakers.length > 0 && (
        <div>
          <h3 className="card-section-title">Deal Breakers</h3>
          {dealbrakers.map((d, idx) => (
            <span key={idx} className="tag dealbreaker">
              {d}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="card-actions">
        <div className="action-buttons">
          <button className="action-btn" onClick={() => setToShow(false)}>
            ❌
          </button>
          <button className="action-btn">❤️</button>
        </div>
        <button className="message-btn">Message</button>
      </div>
    </div>
  );
};

export default Card;
