import React, { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  MapPin,
  Calendar
} from "lucide-react";
import "./Matches.css";

const Matches = ({ setCurrentPage }) => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://roomiebackend-production.up.railway.app/api/user/getAllUsers")
      .then((res) => res.json())
      .then((data) => {
        const userData = Array.isArray(data.data) ? data.data : [data.data];
        const availableMatches = userData.filter(match => match.isLooking);
        setMatches(availableMatches);
        setFilteredMatches(availableMatches);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching matches:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = matches;

    // Apply favorites filter only
    if (showFavoritesOnly) {
      filtered = filtered.filter(match => favorites.has(match._id));
    }

    // Apply sorting
    switch (sortBy) {
      case "budget-high":
        filtered = [...filtered].sort((a, b) => (b.budget || 0) - (a.budget || 0));
        break;
      case "budget-low":
        filtered = [...filtered].sort((a, b) => (a.budget || 0) - (b.budget || 0));
        break;
      case "match":
        filtered = [...filtered].sort((a, b) => calculateCompatibility(b) - calculateCompatibility(a));
        break;
      default:
        break;
    }

    setFilteredMatches(filtered);
  }, [matches, showFavoritesOnly, sortBy, favorites]);

  const toggleFavorite = (matchId) => {
    const newFavorites = new Set(favorites);
    newFavorites.has(matchId) ? newFavorites.delete(matchId) : newFavorites.add(matchId);
    setFavorites(newFavorites);
  };

  const handleLike = (matchId) => {
    // Toggle favorite when "liking" someone
    toggleFavorite(matchId);
  };

  const handleMessage = (matchId) => {
    console.log("Message:", matchId);
    setCurrentPage?.('messages');
  };

  const formatBudget = (budget) => {
    return budget ? `₹${budget.toLocaleString()}/month` : 'Budget not specified';
  };

  const calculateCompatibility = (match) => {
    let score = 60; // Base score
    
    if (match.interests && match.interests.length > 0) score += 20;
    if (match.budget) score += 10;
    if (match.dealbrakers && match.dealbrakers.length > 0) score += 10;
    
    return Math.min(score, 99);
  };

  if (loading) {
    return (
      <div className="matches-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Finding your perfect roommates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="matches-container">
      <header className="matches-header">
        <div className="header-content">
          <div className="header-controls">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`favorites-btn ${showFavoritesOnly ? "active" : ""}`}
            >
              <Heart className={`icon-sm ${showFavoritesOnly ? "filled" : ""}`} />
              <span className="favorites-text">Favorites</span>
              {favorites.size > 0 && (
                <span className={`favorites-count ${showFavoritesOnly ? "active" : ""}`}>
                  {favorites.size}
                </span>
              )}
            </button>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="default">Sort By</option>
              <option value="budget-low">Budget: Low to High</option>
              <option value="budget-high">Budget: High to Low</option>
              <option value="match">Best Match</option>
            </select>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="results-header">
          <div>
            <h2 className="results-title">
              {showFavoritesOnly ? "Your Favorite Roommates" : "Available Roommates"}
            </h2>
            <p className="results-count">{filteredMatches.length} roommates found</p>
          </div>
        </div>

        {filteredMatches.length === 0 ? (
          <div className="no-matches">
            <div className="no-matches-icon">
              <Heart className="icon-lg" />
            </div>
            <h3 className="no-matches-title">No roommates found</h3>
            <p className="no-matches-text">
              {showFavoritesOnly 
                ? "Start adding roommates to your favorites!" 
                : "Try adjusting your search or check back later for new matches."}
            </p>
          </div>
        ) : (
          <div className="matches-list">
            {filteredMatches.map((match) => (
              <article key={match._id} className="match-card-professional">
                <div className="match-image-wrapper">
                  <div className="match-image-container-pro">
                    <img
                      src={match.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s"}
                      alt={match.name}
                      className="match-image-pro"
                    />
                  </div>

                  <button
                    onClick={() => toggleFavorite(match._id)}
                    className={`favorite-btn-pro ${favorites.has(match._id) ? "favorited" : ""}`}
                  >
                    <Heart className={`icon-sm ${favorites.has(match._id) ? "filled" : ""}`} />
                  </button>
                </div>

                <div className="card-content-pro">
                  <div className="card-header-pro">
                    <div className="title-section">
                      <h3 className="match-title-pro">{match.name}, {match.age || 'Age not specified'}</h3>
                      <div className="budget-pro">{formatBudget(match.budget)}</div>
                    </div>
                    <div className="match-percentage-pro">{calculateCompatibility(match)}% match</div>
                  </div>

                  <div className="location-age-pro">
                    <div className="location-pro">
                      <MapPin className="icon-xs" />
                      <span>{match.location || 'Location not specified'}</span>
                    </div>
                  </div>

                  <div className="lease-availability-pro">
                    <div className="lease-info-pro">
                      <Calendar className="icon-xs" />
                      <span>Lease: {match.leaseDuration || 'Not specified'}</span>
                    </div>
                    <span className="availability-pro">Available: {match.moveinDate || 'Flexible'}</span>
                  </div>

                  <p className="description-pro">
                    {match.description || "No description provided by this user."}
                  </p>

                  {match.interests && match.interests.length > 0 && (
                    <div className="interests-section-pro">
                      <h4 className="section-title-pro">Interests</h4>
                      <div className="interests-grid-pro">
                        {match.interests.slice(0, 4).map((interest, idx) => (
                          <div key={idx} className="interest-item-pro">
                            <span>{interest}</span>
                          </div>
                        ))}
                        {match.interests.length > 4 && (
                          <div className="interest-item-pro">
                            <span>+{match.interests.length - 4} more</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {match.dealbrakers && match.dealbrakers.length > 0 && (
                    <div className="dealbreakers-section-pro">
                      <h4 className="section-title-pro">Deal Breakers</h4>
                      <div className="dealbreakers-grid-pro">
                        {match.dealbrakers.slice(0, 3).map((dealbreaker, idx) => (
                          <div key={idx} className="dealbreaker-item-pro">
                            <span>•</span>
                            <span>{dealbreaker}</span>
                          </div>
                        ))}
                        {match.dealbrakers.length > 3 && (
                          <div className="dealbreaker-item-pro">
                            <span>+{match.dealbrakers.length - 3} more</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="card-actions-pro">
                    <button 
                      className={`action-btn-pro like-btn-pro ${favorites.has(match._id) ? 'favorited' : ''}`}
                      onClick={() => handleLike(match._id)}
                    >
                      <Heart className={`icon-sm ${favorites.has(match._id) ? "filled" : ""}`} />
                      {favorites.has(match._id) ? 'Favorited' : 'Add to Favorites'}
                    </button>

                    <button 
                      className="action-btn-pro message-btn-pro"
                      onClick={() => handleMessage(match._id)}
                    >
                      <MessageCircle className="icon-sm" />
                      Message
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Matches;