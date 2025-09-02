import Footer from './Footer';
import { useState, useEffect } from 'react';
import React from 'react';
import { Users } from 'lucide-react';
// Predefined options
const dealBreakerOptions = [
  "Smoking",
  "Vaping",
  "Loud Music After 10 PM",
  "Pets",
  "Overnight Guests Frequently",
  "Messy Common Areas",
  "Strong Cooking Odors",
  "Late Night Phone Calls",
  "Drinking/Parties",
  "Different Sleep Schedules",
  "Shared Food Without Asking",
  "Not Cleaning Dishes",
  "Leaving Lights On",
  "High Energy Bills",
];

function ListARoom({ setCurrentPage }) {
  const [roomTitle, setRoomTitle] = useState("");
  const [roomDetails, setRoomDetails] = useState("");
  const [roomPhoto, setRoomPhoto] = useState(null);
  const [location, setLocation] = useState("");
  const [rent, setRent] = useState("");
  const [tiffinServices, setTiffinServices] = useState("");
  const [selectedDealBreakers, setSelectedDealBreakers] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedDealBreakers([...selectedDealBreakers, value]);
    } else {
      setSelectedDealBreakers(
        selectedDealBreakers.filter((item) => item !== value)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      roomTitle,
      roomDetails,
      roomPhoto,
      location,
      rent,
      tiffinServices,
      selectedDealBreakers,
    });
    alert("Room details submitted!");
  };

  return (
    <div className="form-container">
      <h2>List a Room</h2>
      <form onSubmit={handleSubmit}>
        {/* Room Title */}
        <label>Room Title</label>
        <input
          type="text"
          value={roomTitle}
          onChange={(e) => setRoomTitle(e.target.value)}
          placeholder="Enter a catchy title for your room"
        />

        {/* Room Details */}
        <label>Room Details</label>
        <textarea
          value={roomDetails}
          onChange={(e) => setRoomDetails(e.target.value)}
          placeholder="Describe your room..."
        />

        {/* Room Photo */}
        <label>Upload Room Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setRoomPhoto(e.target.files[0])}
        />

        {/* Location */}
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />

        {/* Rent */}
        <label>Rent (₹)</label>
        <input
          type="number"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          placeholder="Enter rent amount"
        />

        {/* Nearby Tiffin Services */}
        <label>Nearby Tiffin Services</label>
        <input
          type="text"
          value={tiffinServices}
          onChange={(e) => setTiffinServices(e.target.value)}
          placeholder="Enter tiffin service names"
        />

        {/* Deal Breakers Section */}
        <label>Deal Breakers</label>
        <div className="checkbox-group">
          {dealBreakerOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                onChange={handleCheckboxChange}
                checked={selectedDealBreakers.includes(option)}
              />
              {option}
            </label>
          ))}
        </div>

        {/* Show selected values */}
        <p>
          <strong>Selected:</strong>{" "}
          {selectedDealBreakers.join(", ") || "None"}
        </p>

        <button type="submit">Submit Room</button>
      </form>

      {/* Messages link */}
      <button
        className="messages-btn"
        onClick={() => setCurrentPage("messages")}
      >
        Go to Messages
      </button>
    </div>
  );
}

export default ListARoom;
