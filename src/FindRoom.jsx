import React, { useEffect, useState } from "react";
import "./App.css";

// Clean Room Card Component
const RoomCard = ({ 
  roomTitle, 
  roomDetails, 
  location, 
  rent, 
  tiffinServices,
  selectedDealBreakers,
  roomPhoto,
  ownerName,
  ownerContact 
}) => {
  return (
    <div className="room-card-clean">
      <div className="room-image-wrapper">
        <img src={roomPhoto} alt={roomTitle} className="room-img" />
        <div className="rent-tag">₹{rent.toLocaleString()}/mo</div>
      </div>
      
      <div className="room-info">
        <h3 className="room-title">{roomTitle}</h3>
        <p className="room-location">{location}</p>
        <p className="room-desc">{roomDetails}</p>
        
        {selectedDealBreakers && selectedDealBreakers.length > 0 && (
          <div className="deal-breakers">
            {selectedDealBreakers.slice(0, 2).map((item, idx) => (
              <span key={idx} className="deal-tag">{item}</span>
            ))}
            {selectedDealBreakers.length > 2 && (
              <span className="deal-tag">+{selectedDealBreakers.length - 2} more</span>
            )}
          </div>
        )}
        
        <div className="room-bottom">
          <div className="owner-contact">
            <span>{ownerName}</span>
            <span>{ownerContact}</span>
          </div>
          <button className="contact-btn">Contact</button>
        </div>
      </div>
    </div>
  );
};

const FindRoom = ({ setCurrentPage }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxRent, setMaxRent] = useState('');

  useEffect(() => {
    setTimeout(() => {
      const mockRooms = [
        {
          id: 1,
          roomTitle: "Cozy Corner Room",
          roomDetails: "Well-lit room with attached bathroom. Fully furnished with bed, study table, and wardrobe.",
          location: "Rohini Sector 7, Delhi",
          rent: 8000,
          tiffinServices: "Sharma Tiffin Service nearby",
          selectedDealBreakers: ["Smoking", "Loud Music After 10 PM", "Pets"],
          roomPhoto: "https://via.placeholder.com/300x200/bb7d5f/ffffff?text=Room+1",
          ownerName: "Priya Sharma",
          ownerContact: "+91 9876543210"
        },
        {
          id: 2,
          roomTitle: "Student Paradise",
          roomDetails: "Spacious room in peaceful locality. Close to metro and university. WiFi included.",
          location: "Laxmi Nagar, Delhi",
          rent: 6500,
          tiffinServices: "Multiple food options",
          selectedDealBreakers: ["Pets", "Overnight Guests"],
          roomPhoto: "https://via.placeholder.com/300x200/97341B/ffffff?text=Room+2",
          ownerName: "Rajesh Kumar",
          ownerContact: "+91 9876543211"
        },
        {
          id: 3,
          roomTitle: "Modern Living Space",
          roomDetails: "Contemporary furnished room with AC, good ventilation, and 24/7 security.",
          location: "Janakpuri, Delhi",
          rent: 12000,
          tiffinServices: "Home-style meals available",
          selectedDealBreakers: ["Smoking", "Messy Areas"],
          roomPhoto: "https://via.placeholder.com/300x200/62200C/ffffff?text=Room+3",
          ownerName: "Anjali Gupta",
          ownerContact: "+91 9876543212"
        },
        {
          id: 4,
          roomTitle: "Budget-Friendly Room",
          roomDetails: "Clean room in friendly neighborhood. Basic amenities provided. Great for students.",
          location: "Tilak Nagar, Delhi",
          rent: 5000,
          tiffinServices: "Local mess nearby",
          selectedDealBreakers: ["Drinking/Parties", "Different Sleep Schedules"],
          roomPhoto: "https://via.placeholder.com/300x200/bb7d5f/ffffff?text=Room+4",
          ownerName: "Suresh Patel",
          ownerContact: "+91 9876543213"
        }
      ];
      
      setRooms(mockRooms);
      setLoading(false);
    }, 800);
  }, []);

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = !searchTerm || 
      room.roomTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRent = !maxRent || room.rent <= parseInt(maxRent);
    return matchesSearch && matchesRent;
  });

  if (loading) {
    return (
      <div className="loading-simple">
        <p>Finding rooms for you...</p>
      </div>
    );
  }

  return (
    <div className="find-room-clean">
      <div className="page-header">
        <h1>Find Your Room</h1>
        <p>Browse available rooms and find your perfect match</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by location or room name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Max rent (₹)"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          className="rent-input"
        />
        {(searchTerm || maxRent) && (
          <button 
            className="clear-search"
            onClick={() => { setSearchTerm(''); setMaxRent(''); }}
          >
            Clear
          </button>
        )}
      </div>

      <div className="rooms-grid-clean">
        {/* List Your Room Card */}
        <div className="list-room-simple" onClick={() => setCurrentPage('listRoom')}>
          <div className="plus-circle">+</div>
          <h3>List Your Room</h3>
          <p>Have a room to rent? Post it here!</p>
        </div>

        {filteredRooms.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="no-results">
          <h3>No rooms found</h3>
          <p>Try adjusting your search or check back later</p>
        </div>
      )}
    </div>
  );
};

export default FindRoom;
