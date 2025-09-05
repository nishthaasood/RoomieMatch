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
  id,
  accessToken,
  setLikedUser
}) => {
  const [toShow, setToShow] = useState(true);
  const [liked, setLiked] = useState(false)
  const handleLiked =async()=>{
    setLiked(true);
    const res = await fetch(`https://roomiebackend-production.up.railway.app/api/user/likeRoomie`, {
      method:"PUT",
      body:JSON.stringify({
        id:id,
        accessToken:accessToken
      }),
      headers:{
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data.likedRoomies)
    console.log("liked")
    setLikedUser(data.likedRoomies)
    setToShow(false)

  }

  if (!toShow) return null;

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
          {!liked && <button className="action-btn" onClick={handleLiked} >❤️</button>}
        </div>
        <button className="message-btn">Message</button>
      </div>
    </div>
  );
};

export default Card;
