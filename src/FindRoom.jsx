"use client"

import { useState } from "react"
import {
  Heart,
  MessageCircle,
  Plus,
  MapPin,
  Star,
  Users,
  Utensils,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Car,
  Dumbbell,
  BookOpen,
  Coffee,
  Home,
} from "lucide-react"
import "./FindRoom.css"

const FindRoom = ({ setCurrentPage }) => {
  const [favorites, setFavorites] = useState(new Set())
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [sortBy, setSortBy] = useState("default")
  const [currentImageIndex, setCurrentImageIndex] = useState({})

  const sampleRooms = [
    {
      id: 1,
      title: "Modern City Apartment",
      rent: 5000,
      location: "Rohini, Delhi",
      roomie: "Alex",
      tiffinServiceName: "FreshBite Tiffin Service",
      rating: 4.8,
      reviews: 24,
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
      ],
      description: "Cozy room in a modern apartment with great city views. Perfect for young professionals.",
      dealbreakers: ["Smoking", "Pets"],
      amenities: ["WiFi", "Parking", "Gym Access", "Study Room"],
      distance: "2.3 km from Metro",
      availableFrom: "Dec 2024",
      matchPercentage: 85,
    },
    {
      id: 2,
      title: "Student-Friendly Room",
      rent: 4000,
      location: "Pitampura, Delhi",
      roomie: "Jordan",
      tiffinServiceName: "Campus Meals",
      rating: 4.5,
      reviews: 18,
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      ],
      description: "Student-friendly room near campus. Great for studying and socializing.",
      dealbreakers: ["Smoking", "Strong Cooking Odors"],
      amenities: ["WiFi", "Study Room", "Kitchen Access", "Library", "Common Area"],
      distance: "0.8 km from University",
      availableFrom: "Jan 2025",
      matchPercentage: 92,
    },
    {
      id: 3,
      title: "Luxury High-Rise Suite",
      rent: 8000,
      location: "Laxmi Nagar, Delhi",
      roomie: "Taylor",
      tiffinServiceName: "Premium Dining Service",
      rating: 4.9,
      reviews: 35,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
      ],
      description: "Premium room with high-end amenities and excellent facilities.",
      dealbreakers: ["Pets"],
      amenities: ["WiFi", "Parking", "Gym Access", "Concierge"],
      distance: "1.5 km from Business District",
      availableFrom: "Available Now",
      matchPercentage: 78,
    },
  ]

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      WiFi: Wifi,
      Parking: Car,
      "Gym Access": Dumbbell,
      "Study Room": BookOpen,
      Library: BookOpen,
      "Kitchen Access": Coffee,
      "Common Area": Home,
    }
    return iconMap[amenity] || Home
  }

  const nextImage = (roomId) => {
    const room = sampleRooms.find((r) => r.id === roomId)
    const currentIndex = currentImageIndex[roomId] || 0
    const nextIndex = (currentIndex + 1) % room.images.length
    setCurrentImageIndex((prev) => ({ ...prev, [roomId]: nextIndex }))
  }

  const prevImage = (roomId) => {
    const room = sampleRooms.find((r) => r.id === roomId)
    const currentIndex = currentImageIndex[roomId] || 0
    const prevIndex = currentIndex === 0 ? room.images.length - 1 : currentIndex - 1
    setCurrentImageIndex((prev) => ({ ...prev, [roomId]: prevIndex }))
  }

  const toggleFavorite = (roomId) => {
    const newFavorites = new Set(favorites)
    newFavorites.has(roomId) ? newFavorites.delete(roomId) : newFavorites.add(roomId)
    setFavorites(newFavorites)
  }

  const getSortedRooms = () => {
    const filtered = showFavoritesOnly ? sampleRooms.filter((room) => favorites.has(room.id)) : sampleRooms

    switch (sortBy) {
      case "rent-high":
        return [...filtered].sort((a, b) => b.rent - a.rent)
      case "rent-low":
        return [...filtered].sort((a, b) => a.rent - b.rent)
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating)
      default:
        return filtered
    }
  }

  const handleMessage = (roomie) => {
    alert(`Opening chat with ${roomie}...`)
  }

  return (
    <div className="find-room-container">
      <header className="find-room-header">
        <div className="header-content">
          <div className="header-controls">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`favorites-btn ${showFavoritesOnly ? "active" : ""}`}
            >
              <Heart className={`icon-sm ${showFavoritesOnly ? "filled" : ""}`} />
              <span className="favorites-text">Favorites</span>
              {favorites.size > 0 && (
                <span className={`favorites-count ${showFavoritesOnly ? "active" : ""}`}>{favorites.size}</span>
              )}
            </button>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="default">Sort By</option>
              <option value="rent-low">Price: Low to High</option>
              <option value="rent-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <button onClick={() => setCurrentPage("listARoom")} className="list-room-btn">
              <Plus className="icon-sm" />
              <span className="list-room-text">List Room</span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="results-header">
          <div>
            <h2 className="results-title">{showFavoritesOnly ? "Your Favorite Rooms" : "Available Rooms"}</h2>
            <p className="results-count">{getSortedRooms().length} rooms found</p>
          </div>
        </div>

        {getSortedRooms().length === 0 ? (
          <div className="no-rooms">
            <div className="no-rooms-icon">
              <Heart className="icon-lg" />
            </div>
            <h3 className="no-rooms-title">No rooms found</h3>
            <p className="no-rooms-text">
              {showFavoritesOnly ? "Start adding rooms to your favorites!" : "Try adjusting your filters."}
            </p>
          </div>
        ) : (
          <div className="rooms-list">
            {getSortedRooms().map((room) => (
              <article key={room.id} className="room-card-professional">
                <div className="room-image-wrapper">
                  <div className="room-image-container-pro">
                    <img
                      src={room.images[currentImageIndex[room.id] || 0]}
                      alt={room.title}
                      className="room-image-pro"
                    />

                    {room.images.length > 1 && (
                      <>
                        <button
                          onClick={() => prevImage(room.id)}
                          className="image-nav-btn-pro prev-btn-pro"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="icon-xs" />
                        </button>
                        <button
                          onClick={() => nextImage(room.id)}
                          className="image-nav-btn-pro next-btn-pro"
                          aria-label="Next image"
                        >
                          <ChevronRight className="icon-xs" />
                        </button>
                      </>
                    )}

                    <div className="image-indicators">
                      {room.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`indicator ${idx === (currentImageIndex[room.id] || 0) ? "active" : ""}`}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFavorite(room.id)}
                    className={`favorite-btn-pro ${favorites.has(room.id) ? "favorited" : ""}`}
                  >
                    <Heart className={`icon-sm ${favorites.has(room.id) ? "filled" : ""}`} />
                  </button>
                </div>

                <div className="card-content-pro">
                  <div className="card-header-pro">
                    <div className="title-section">
                      <h3 className="room-title-pro">{room.title}</h3>
                      <div className="price-pro">₹{room.rent.toLocaleString()}/month</div>
                    </div>
                    <div className="match-percentage-pro">{room.matchPercentage}% match</div>
                  </div>

                  <div className="location-rating-pro">
                    <div className="location-pro">
                      <MapPin className="icon-xs" />
                      <span>{room.location}</span>
                    </div>
                    <div className="rating-pro">
                      <Star className="icon-xs star-filled" />
                      <span>
                        {room.rating} ({room.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="roomie-availability-pro">
                    <div className="roomie-info-pro">
                      <Users className="icon-xs" />
                      <span>Roomie: {room.roomie}</span>
                    </div>
                    <span className="availability-pro">Available: {room.availableFrom}</span>
                  </div>

                  <div className="tiffin-distance-pro">
                    <div className="tiffin-pro">
                      <Utensils className="icon-xs" />
                      <span>{room.tiffinServiceName}</span>
                    </div>
                    <span className="distance-pro">{room.distance}</span>
                  </div>

                  <p className="description-pro">{room.description}</p>

                  <div className="amenities-section-pro">
                    <h4 className="section-title-pro">Amenities</h4>
                    <div className="amenities-grid-pro">
                      {room.amenities.map((amenity, idx) => {
                        const IconComponent = getAmenityIcon(amenity)
                        return (
                          <div key={idx} className="amenity-item-pro positive">
                            <IconComponent className="icon-xs" />
                            <span>{amenity}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {room.dealbreakers.length > 0 && (
                    <div className="dealbreakers-section-pro">
                      <h4 className="section-title-pro">Deal Breakers</h4>
                      <div className="dealbreakers-grid-pro">
                        {room.dealbreakers.map((dealbreaker, idx) => (
                          <div key={idx} className="dealbreaker-item-pro negative">
                            <span>•</span>
                            <span>{dealbreaker}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="card-actions-pro">
                    <button onClick={() => handleMessage(room.roomie)} className="message-btn-pro">
                      <MessageCircle className="icon-sm" />
                      Message {room.roomie}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default FindRoom

