import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./App.css";

const Matches = ({ setCurrentPage, accessToken, setLikedUser, likedUser }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onLiked, setOnLiked] = useState(false);

  useEffect(() => {
    fetch("https://roomiebackend-production.up.railway.app/api/user/getAllUsers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setMatches(data.data);
        } else {
          setMatches([data.data]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching matches:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading matches...</p>
      </div>
    );
  }

  const handleLiked = () => {
    setOnLiked(true);
    console.log("likedUser:", likedUser);
  };

  // Decide what to show
  const dataToRender = onLiked ? likedUser : matches.filter((m) => m.isLooking);

  return (
    <div className="matches-page">
      <div className="matches-top">
        <button className="matches-title" onClick={() => setOnLiked(false)}>
          All Roomies
        </button>
        <button className="matches-liked" onClick={handleLiked}>
          Liked
        </button>
      </div>

      {dataToRender && dataToRender.length > 0 ? (
        <div className="matches-grid">
          {dataToRender.map((match) => (
            <Card
              key={match._id}
              name={match.name}
              age={match.age}
              description={match.description}
              budget={match.budget}
              interests={match.interests}
              dealbrakers={match.dealbrakers}
              leaseDuration={match.leaseDuration}
              moveinDate={match.moveinDate}
              imageURL={match.avatar}
              id={match._id}
              accessToken={accessToken}
              setLikedUser={setLikedUser}
            />
          ))}
        </div>
      ) : (
        <p className="no-matches">No matches found 😢</p>
      )}
    </div>
  );
};

export default Matches;
