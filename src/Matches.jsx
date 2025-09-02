import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./App.css";

const Matches = ({ setCurrentPage }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="matches-page">
      <h1 className="matches-title">All Matches</h1>

      {matches.length > 0 ? (
        <div className="matches-grid">
          {matches
          .filter((match) => match.isLooking)
          .map((match) => (
            < Card
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
