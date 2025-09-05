import React, { useState, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  ChevronUp,
  ChevronDown,
  Plus,
} from 'lucide-react';
import './FindRoom.css';

const FindRoom = ({ setCurrentPage }) => {
  const [favorites, setFavorites] = useState(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [expandedCards, setExpandedCards] = useState(new Set());
  const scrollRef = useRef(null);

  const sampleRooms = [
    {
      id: 1,
      title: 'Modern City Apartment',
      rent: 5000,
      location: 'Rohini, Delhi',
      roomie: 'Alex',
      tiffinServiceName: 'FreshBite Tiffin Service',
      image:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      description:
        'Cozy room in a modern apartment with great city views. Perfect for young professionals.',
      dealbreakers: ['Smoking', 'Pets', 'Loud Music After 10 PM'],
      amenities: ['WiFi', 'Parking', 'Gym Access', 'Balcony'],
    },
    {
      id: 2,
      title: 'Student-Friendly Room',
      rent: 4000,
      location: 'Pitampura, Delhi',
      roomie: 'Jordan',
      tiffinServiceName: 'Campus Meals',
      image:
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      description:
        'Student-friendly room near campus. Great for studying and socializing.',
      dealbreakers: ['Smoking', 'Strong Cooking Odors'],
      amenities: ['WiFi', 'Study Room', 'Kitchen Access'],
    },
    {
      id: 3,
      title: 'Luxury High-Rise Suite',
      rent: 8000,
      location: 'Laxmi Nagar, Delhi',
      roomie: 'Taylor',
      tiffinServiceName: 'No Tiffin Service',
      image:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      description:
        'Premium room with high-end amenities and excellent facilities.',
      dealbreakers: [
        'Pets',
        'Overnight Guests Frequently',
        'Messy Common Areas',
      ],
      amenities: ['WiFi', 'Pool', 'Concierge', 'Gym', 'Parking'],
    },
    {
      id: 4,
      title: 'Creative Artist Loft',
      rent: 4500,
      location: 'Preet Vihar, Delhi',
      roomie: 'Sam',
      tiffinServiceName: 'GreenLeaf Veg Tiffins',
      image:
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
      description:
        'Artistic space perfect for creatives. Lots of natural light and inspiration.',
      dealbreakers: ['Smoking', 'Vaping', 'Different Sleep Schedules'],
      amenities: ['WiFi', 'Art Studio', 'Garden Access'],
    },
    {
      id: 5,
      title: 'Tech-Friendly Smart Room',
      rent: 6000,
      location: 'Mayur Vihar, Delhi',
      roomie: 'Morgan',
      tiffinServiceName: 'SmartEats Home Delivery',
      image:
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400',
      description:
        'Modern tech-friendly environment with smart home features.',
      dealbreakers: ['Loud Music After 10 PM', 'Drinking/Parties'],
      amenities: ['Smart Home', 'High-Speed Internet', 'Co-working Space'],
    },
  ];

  const toggleFavorite = (roomId) => {
    const newFavorites = new Set(favorites);
    newFavorites.has(roomId)
      ? newFavorites.delete(roomId)
      : newFavorites.add(roomId);
    setFavorites(newFavorites);
  };

  const toggleCardExpansion = (roomId) => {
    const newExpanded = new Set(expandedCards);
    newExpanded.has(roomId)
      ? newExpanded.delete(roomId)
      : newExpanded.add(roomId);
    setExpandedCards(newExpanded);
  };

  const getSortedRooms = () => {
    let filtered = showFavoritesOnly
      ? sampleRooms.filter((room) => favorites.has(room.id))
      : sampleRooms;

    switch (sortBy) {
      case 'rent-high':
        return [...filtered].sort((a, b) => b.rent - a.rent);
      case 'rent-low':
        return [...filtered].sort((a, b) => a.rent - b.rent);
      default:
        return filtered;
    }
  };

  const handleMessage = (roomie) => {
    alert(`Opening chat with ${roomie}...`);
  };

  return (
    <div className="findroom-wrapper">
      {/* Header */}
      <div className="findroom-header">
        <div className="header-inner">
          <div className="header-actions">
            {/* Favorites Button */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`favorites-btn ${
                showFavoritesOnly ? 'active' : ''
              }`}
            >
              <Heart
                className={`icon ${showFavoritesOnly ? 'filled' : ''}`}
              />
              <span>Favorites</span>
            </button>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Sort By</option>
              <option value="rent-high">Rent: High to Low</option>
              <option value="rent-low">Rent: Low to High</option>
            </select>

            {/* ✅ List Room Button */}
            <button
              className="list-btn"
              onClick={() => setCurrentPage('listARoom')}
            >
              <Plus className="icon" />
              <span>List Your Room</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="room-container">
          {getSortedRooms().length === 0 ? (
            <div className="no-rooms">
              <Heart className="empty-icon" />
              <h3>No rooms found</h3>
              <p>
                {showFavoritesOnly
                  ? 'Add some rooms to your favorites!'
                  : 'Try adjusting your filters.'}
              </p>
            </div>
          ) : (
            <div ref={scrollRef} className="room-list">
              {getSortedRooms().map((room) => (
                <div key={room.id} className="room-card">
                  {/* Card Header */}
                  <div className="card-header">
                    <img
                      src={room.image}
                      alt={`Room in ${room.location}`}
                    />
                    <div className="card-actions">
                      <button
                        onClick={() => toggleFavorite(room.id)}
                        className={`fav-btn ${
                          favorites.has(room.id) ? 'active' : ''
                        }`}
                      >
                        <Heart
                          className={`icon ${
                            favorites.has(room.id) ? 'filled' : ''
                          }`}
                        />
                      </button>
                    </div>
                    <div className="price-badge">
                      <span className="price">₹{room.rent}</span>
                      <span className="per-month">/month</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="card-body">
                    <div className="card-top">
                      <div>
                        <h2 className="room-title">{room.title}</h2>
                        <h3>{room.location}</h3>
                        <p className="roomie">Roomie: {room.roomie}</p>
                        <p className="tiffin">
                          🍴 Tiffin Service: {room.tiffinServiceName}
                        </p>
                      </div>

                      <div className="card-buttons">
                        <button
                          onClick={() => handleMessage(room.roomie)}
                          className="message-btn"
                        >
                          <MessageCircle className="icon" />
                          <span>Message</span>
                        </button>
                        <button
                          onClick={() => toggleCardExpansion(room.id)}
                          className="expand-btn"
                        >
                          {expandedCards.has(room.id) ? (
                            <ChevronUp className="icon" />
                          ) : (
                            <ChevronDown className="icon" />
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="description">{room.description}</p>

                    {/* Expandable Content */}
                    <div
                      className={`expandable ${
                        expandedCards.has(room.id) ? 'open' : ''
                      }`}
                    >
                      <div className="section">
                        <h4>Amenities</h4>
                        <div className="tags">
                          {room.amenities.map((amenity, idx) => (
                            <span key={idx} className="tag amenity">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="section">
                        <h4>Dealbreakers</h4>
                        <div className="dealbreakers">
                          {room.dealbreakers.length > 0 ? (
                            room.dealbreakers.map((dealbreaker, idx) => (
                              <div
                                key={idx}
                                className="dealbreaker active"
                              >
                                <div className="dot" />
                                <span>{dealbreaker}</span>
                              </div>
                            ))
                          ) : (
                            <p className="no-dealbreakers">
                              No dealbreakers
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindRoom;
