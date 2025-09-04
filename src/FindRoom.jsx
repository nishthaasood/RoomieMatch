import React, { useState, useEffect } from "react";
import SwipeableRoomCard from "./SwipeableRoomCard";
import "./FindRoom.css";

const SwipeableRoomFinder = ({ setCurrentPage }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortBy, setSortBy] = useState("rent");
  const [acceptedRooms, setAcceptedRooms] = useState([]);
  const [showMatches, setShowMatches] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const mockRooms = [
        {
          id: 1,
          roomTitle: "Cozy Corner Room",
          roomDetails:
            "Well-lit room with attached bathroom. Fully furnished with bed, study table, and wardrobe. Perfect for working professionals.",
          location: "Rohini Sector 7, Delhi",
          rent: 8000,
          selectedDealBreakers: ["Smoking", "Loud Music After 10 PM", "Pets"],
          roomPhoto:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=500&fit=crop&crop=center",
          ownerName: "Priya Sharma",
          ownerContact: "+91 9876543210",
        },
        {
          id: 2,
          roomTitle: "Student Paradise",
          roomDetails:
            "Spacious room in peaceful locality. Close to metro and university. WiFi included with high-speed internet connection.",
          location: "Laxmi Nagar, Delhi",
          rent: 6500,
          selectedDealBreakers: ["Pets", "Overnight Guests"],
          roomPhoto:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=500&fit=crop&crop=center",
          ownerName: "Rajesh Kumar",
          ownerContact: "+91 9876543211",
        },
        {
          id: 3,
          roomTitle: "Modern Living Space",
          roomDetails:
            "Contemporary furnished room with AC, good ventilation, and 24/7 security. Premium amenities included.",
          location: "Janakpuri, Delhi",
          rent: 12000,
          selectedDealBreakers: ["Smoking", "Messy Areas"],
          roomPhoto:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop&crop=center",
          ownerName: "Anjali Gupta",
          ownerContact: "+91 9876543212",
        },
      ];
      setRooms(mockRooms);
      setLoading(false);
    }, 800);
  }, []);

  const sortedRooms = [...rooms].sort((a, b) => {
    switch (sortBy) {
      case "rent":
        return a.rent - b.rent;
      case "location":
        return a.location.localeCompare(b.location);
      default:
        return 0;
    }
  });

  const handleSwipe = (roomId, direction) => {
    if (direction === "right") {
      const room = rooms.find((r) => r.id === roomId);
      setAcceptedRooms((prev) => [...prev, room]);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const currentRoom = sortedRooms[currentIndex];
  const nextRoom = sortedRooms[currentIndex + 1];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Finding perfect rooms for you...</p>
      </div>
    );
  }

  if (showMatches) {
    return (
      <div className="matches-container">
        <div className="matches-header">
          <button className="back-btn" onClick={() => setShowMatches(false)}>
            ←
          </button>
          <h2>Your Matches ({acceptedRooms.length})</h2>
        </div>
        <div className="matches-grid">
          {acceptedRooms.map((room) => (
            <div key={room.id} className="match-card">
              <img src={room.roomPhoto} alt={room.roomTitle} />
              <div className="match-info">
                <h3>{room.roomTitle}</h3>
                <p>{room.location}</p>
                <p className="match-rent">₹{room.rent.toLocaleString()}/mo</p>
                <button className="contact-match-btn">Contact Owner</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentIndex >= sortedRooms.length) {
    return (
      <div className="end-container">
        <h2>No more rooms!</h2>
        <p>You've seen all available rooms</p>
        <button
          className="view-matches-btn"
          onClick={() => setShowMatches(true)}
        >
          View Your Matches ({acceptedRooms.length})
        </button>
        <button
          className="list-room-btn"
          onClick={() => setCurrentPage("listRoom")}
        >
          List Your Room
        </button>
      </div>
    );
  }

  return (
    <div className="swipe-container">
      <div className="header">
        <h1>Find Your Room</h1>
        <div className="header-controls">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="rent">Sort by Rent</option>
            <option value="location">Sort by Location</option>
          </select>
          {acceptedRooms.length > 0 && (
            <button
              className="matches-btn"
              onClick={() => setShowMatches(true)}
            >
              Matches ({acceptedRooms.length})
            </button>
          )}
        </div>
      </div>

      <div className="cards-stack">
        {nextRoom && (
          <SwipeableRoomCard
            key={nextRoom.id}
            room={nextRoom}
            onSwipe={handleSwipe}
            isTop={false}
            style={{ transform: "scale(0.95) translateY(10px)" }}
          />
        )}
        {currentRoom && (
          <SwipeableRoomCard
            key={currentRoom.id}
            room={currentRoom}
            onSwipe={handleSwipe}
            isTop={true}
          />
        )}
      </div>

      <div className="swipe-instructions">
        <span className="instruction decline">← Swipe left to decline</span>
        <span className="instruction accept">Swipe right to accept →</span>
      </div>
    </div>
  );
};

export default SwipeableRoomFinder;
