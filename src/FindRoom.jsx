import React, { useEffect, useState, useRef } from "react";
import "./FindRoom.css"; // External CSS file

// Swipeable Room Card Component
const SwipeableRoomCard = ({ 
  room,
  onSwipe,
  isTop,
  style
}) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleStart = (clientX, clientY) => {
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging) return;
    
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const threshold = 150;
    
    if (Math.abs(dragOffset.x) > threshold) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      onSwipe(room.id, direction);
    }
    
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startPos]);

  const rotation = dragOffset.x * 0.1;
  const opacity = Math.max(0.7, 1 - Math.abs(dragOffset.x) / 300);
  
  const swipeIndicator = dragOffset.x > 50 ? 'ACCEPT' : dragOffset.x < -50 ? 'DECLINE' : '';
  
  return (
    <div
      ref={cardRef}
      className="swipe-card"
      style={{
        ...style,
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
        opacity: isTop ? opacity : 0.8,
        zIndex: isTop ? 10 : 1,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe Indicators */}
      {isTop && swipeIndicator && (
        <div className={`swipe-indicator ${swipeIndicator.toLowerCase()}`}>
          {swipeIndicator}
        </div>
      )}
      
      <div className="card-image-container">
        <img src={room.roomPhoto} alt={room.roomTitle} className="card-image" />
        <div className="rent-overlay">₹{room.rent.toLocaleString()}/mo</div>
        
        {/* Gradient overlay for better text readability */}
        <div className="image-gradient"></div>
        
        <div className="card-basic-info">
          <h2>{room.roomTitle}</h2>
          <p className="location">{room.location}</p>
        </div>
      </div>
      
      <div className="card-details">
        <p className="description">{room.roomDetails}</p>
        
        {room.selectedDealBreakers && room.selectedDealBreakers.length > 0 && (
          <div className="preferences">
            <h4>House Rules</h4>
            <div className="preference-tags">
              {room.selectedDealBreakers.slice(0, 3).map((rule, idx) => (
                <span key={idx} className="preference-tag">No {rule}</span>
              ))}
              {room.selectedDealBreakers.length > 3 && (
                <span className="preference-tag">+{room.selectedDealBreakers.length - 3} more</span>
              )}
            </div>
          </div>
        )}
        
        <div className="owner-info">
          <div className="owner-details">
            <h4>Owner</h4>
            <p>{room.ownerName}</p>
            <p className="contact">{room.ownerContact}</p>
          </div>
          <div className="action-buttons">
            <button 
              className="decline-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSwipe(room.id, 'left');
              }}
            >
              ✗
            </button>
            <button 
              className="accept-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSwipe(room.id, 'right');
              }}
            >
              ♥
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SwipeableRoomFinder = ({ setCurrentPage }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortBy, setSortBy] = useState('rent');
  const [acceptedRooms, setAcceptedRooms] = useState([]);
  const [showMatches, setShowMatches] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const mockRooms = [
        {
          id: 1,
          roomTitle: "Cozy Corner Room",
          roomDetails: "Well-lit room with attached bathroom. Fully furnished with bed, study table, and wardrobe. Perfect for working professionals.",
          location: "Rohini Sector 7, Delhi",
          rent: 8000,
          tiffinServices: "Sharma Tiffin Service nearby",
          selectedDealBreakers: ["Smoking", "Loud Music After 10 PM", "Pets"],
          roomPhoto: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=500&fit=crop&crop=center",
          ownerName: "Priya Sharma",
          ownerContact: "+91 9876543210"
        },
        {
          id: 2,
          roomTitle: "Student Paradise",
          roomDetails: "Spacious room in peaceful locality. Close to metro and university. WiFi included with high-speed internet connection.",
          location: "Laxmi Nagar, Delhi",
          rent: 6500,
          tiffinServices: "Multiple food options",
          selectedDealBreakers: ["Pets", "Overnight Guests"],
          roomPhoto: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=500&fit=crop&crop=center",
          ownerName: "Rajesh Kumar",
          ownerContact: "+91 9876543211"
        },
        {
          id: 3,
          roomTitle: "Modern Living Space",
          roomDetails: "Contemporary furnished room with AC, good ventilation, and 24/7 security. Premium amenities included.",
          location: "Janakpuri, Delhi",
          rent: 12000,
          tiffinServices: "Home-style meals available",
          selectedDealBreakers: ["Smoking", "Messy Areas"],
          roomPhoto: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop&crop=center",
          ownerName: "Anjali Gupta",
          ownerContact: "+91 9876543212"
        },
        {
          id: 4,
          roomTitle: "Budget-Friendly Room",
          roomDetails: "Clean room in friendly neighborhood. Basic amenities provided. Great for students and fresh graduates.",
          location: "Tilak Nagar, Delhi",
          rent: 5000,
          tiffinServices: "Local mess nearby",
          selectedDealBreakers: ["Drinking/Parties", "Different Sleep Schedules"],
          roomPhoto: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=500&fit=crop&crop=center",
          ownerName: "Suresh Patel",
          ownerContact: "+91 9876543213"
        },
        {
          id: 5,
          roomTitle: "Executive Suite",
          roomDetails: "Premium room with private balcony, attached bathroom, and workspace. Perfect for business travelers.",
          location: "Connaught Place, Delhi",
          rent: 15000,
          tiffinServices: "Restaurant quality meals",
          selectedDealBreakers: ["Pets", "Smoking", "Loud Activities"],
          roomPhoto: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=400&h=500&fit=crop&crop=center",
          ownerName: "Vikram Singh",
          ownerContact: "+91 9876543214"
        }
      ];
      
      setRooms(mockRooms);
      setLoading(false);
    }, 800);
  }, []);

  const sortedRooms = [...rooms].sort((a, b) => {
    switch (sortBy) {
      case 'rent':
        return a.rent - b.rent;
      case 'location':
        return a.location.localeCompare(b.location);
      default:
        return 0;
    }
  });

  const handleSwipe = (roomId, direction) => {
    if (direction === 'right') {
      const room = rooms.find(r => r.id === roomId);
      setAcceptedRooms(prev => [...prev, room]);
    }
    
    setCurrentIndex(prev => prev + 1);
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
          <button className="back-btn" onClick={() => setShowMatches(false)}>←</button>
          <h2>Your Matches ({acceptedRooms.length})</h2>
        </div>
        <div className="matches-grid">
          {acceptedRooms.map(room => (
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
          onClick={() => setCurrentPage('listRoom')}
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
            style={{ transform: 'scale(0.95) translateY(10px)' }}
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
  <button 
    className="instruction decline" 
    onClick={() => handleSwipe(currentRoom.id, 'left')}
  >
    ← Swipe left to decline
  </button>
  <button 
    className="instruction accept" 
    onClick={() => handleSwipe(currentRoom.id, 'right')}
  >
    Swipe right to accept →
  </button>
</div>
    </div>
  );
};

export default SwipeableRoomFinder;
