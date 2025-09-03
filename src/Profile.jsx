import Footer from './Footer';
import { useState } from 'react';
import React from 'react';

const Profile = ({ setCurrentPage, setIsLogin, accessToken, registerData }) => {
  // ✅ Define options here so they don't crash your component
  const dealBreakerOptions = [
    "Smoking",
    "Loud Music After 10 PM",
    "Pets",
    "Messiness",
    "Night Owls",
    "Alcohol/Drinking",
    "Poor Hygiene",
    "Borrowing Stuff Without Asking",
    "Dirty Dishes",
    "Leaving Lights On",
    "High Energy Bills",
    "Overnight Guests",
    "Different Sleep Schedules",
    "Strong Cooking Odors",
    "Lack of Communication",
    "Snoring"
  ];

  const interestOptions = [
  "Technology",
  "Hiking",
  "Cooking",
  "Reading",
  "Gaming",
  "Music",
  "Sports",
  "Traveling",
  "Photography",
  "Fitness/Gym",
  "Dancing",
  "Art & Painting",
  "Watching Movies/Series",
  "Yoga & Meditation",
  "Fashion & Styling",
  "Volunteering",
  "Foodie/Exploring Restaurants",
  "Writing/Blogging",
  "Gardening",
  "DIY Projects"
  ];

  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: registerData.firstName,
    lastName: registerData.lastName,
    email: registerData.email,
    age: registerData.age,
    phone: registerData.phone,
    bio: '',
    occupation: 'Student',
    university: 'Bhagwan Parshuram Institute of Technology',
    budget: '12000',
    location: 'Rohini Sector 7, Delhi',
    
    // Roommate preferences
    dealBreakers: ['Smoking', 'Loud Music After 10 PM', 'Pets'],
    preferences: {
      cleanliness: 'Very Clean',
      socialLevel: 'Moderate',
      guestPolicy: 'Occasional Guests OK',
      workSchedule: 'Day Shift',
      lifestyle: 'Active',
      dietaryRestrictions: 'None'
    },
    
    // Interests and hobbies
    interests: ['Technology', 'Hiking', 'Cooking', 'Reading', 'Gaming'],
    
    // Availability
    moveInDate: '2024-03-01',
    leaseDuration: '12 months'
  });

  const [formData, setFormData] = useState(profileData);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const [avatarUrl, setAvatarUrl] = useState("public/avatar.jpg")
  const formPayload = new FormData();
  const handleSave = async () => {
    try {

      // Map frontend state to backend API keys
      formPayload.append("name", `${formData.firstName} ${formData.lastName}`);
      formPayload.append("age", parseInt(formData.age, 10));
      formPayload.append("phoneNumber", formData.phone);
      formPayload.append("budget", parseInt(formData.budget, 10));
      formPayload.append("leaseDuration", parseInt(formData.leaseDuration, 10));
      formPayload.append("moveinDate", new Date(formData.moveInDate).toISOString());
      formPayload.append("description", formData.bio);
      // Arrays need to be stringified or appended one by one
      formPayload.append("dealbrakers",JSON.stringify(formData.dealBreakers))
      formPayload.append("interests",JSON.stringify(formData.interests))

      // Avatar file (only if changed)
      if (formData.avatarFile) {
        formPayload.append("avatar", formData.avatarFile);
      }

      // Add auth token
      
      formPayload.append("accessToken", accessToken);

      console.log("form Pay load :: ",formPayload)
      console.log("access token :: ",accessToken)
      // Call API
      const res = await fetch("https://roomiebackend-production.up.railway.app/api/user/updateUser", {
        method: "PUT", // or POST depending on your API
        body: formPayload,
        // headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("data :: ", data)
      console.log("avatar :: ", data["data"]["avatar"])

      setAvatarUrl(data["data"]["avatar"])
      if (res.ok) {
        console.log("Profile updated:", data);
        setProfileData(formData);
        setIsEditing(false);
      } else {
        console.error("Update failed:", data.message || data);
        alert("Failed to update profile!");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Something went wrong while updating!");
    }
  };
 

  // Handle multiple select (checkboxes)
  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profileData);
  };

  // const handleSave = () => {
  //   setIsEditing(false);
  //   setProfileData(formData);
  // };

  const handleSignOut = () => {
    setIsLogin(false);
    setCurrentPage('home');
    setShowSignOutModal(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* Tab Navigation */}
        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Info
          </button>
          <button 
            className={`tab ${activeTab === 'roommate' ? 'active' : ''}`}
            onClick={() => setActiveTab('roommate')}
          >
            Roommate Preferences
          </button>
          <button 
            className={`tab ${activeTab === 'matching' ? 'active' : ''}`}
            onClick={() => setActiveTab('matching')}
          >
            Matching Criteria
          </button>
        </div>

        <div className="profile-card">
          {/* Profile Image Section */}
          <div className="profile-image-section">
            <div className="profile-image-wrapper">
              <img
                src={avatarUrl}
                alt="Profile"
                className="profile-image"
              />
              {isEditing && (
                <div>
                  <button className="change-photo-btn" onClick={() => document.getElementById("avatarUpload").click()}>
                    📷 Change Photo
                  </button>
                  <input
                    type="file"
                    id="avatarUpload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFormData(prev => ({ ...prev, avatarFile: file }));
                      }
                    }}
                  />
                </div>
              )}

            </div>
          </div>

          {/* Profile Content */}
          <div className="profile-content">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="tab-content">
                <div className="tab-header">
                  <h3>Personal Information</h3>
                  {!isEditing && (
                    <button onClick={handleEdit} className="edit-btn">
                      <span className="btn-icon">✎</span>
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="profile-form">
                    {/* First & Last Name */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Age & Occupation */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Age</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="25"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Occupation</label>
                        <input
                          type="text"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="Software Engineer"
                        />
                      </div>
                    </div>

                    {/* University */}
                    <div className="form-group">
                    
                      <label className="form-label">University/School</label>
                      {isEditing &&
                      <input
                        type="text"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Stanford University"
                      />}
                    </div>

                    {/* Bio */}
                    <div className="form-group">
                      <label className="form-label">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="form-textarea"
                        rows="4"
                        placeholder="Tell us about yourself..."
                      ></textarea>
                    </div>

                    {/* Save/Cancel */}
                    <div className="profile-actions">
                      <button onClick={handleSave} className="save-btn">
                        <span className="btn-icon">✓</span>
                        Save Changes
                      </button>
                      <button onClick={handleCancel} className="cancel-btn">
                        <span className="btn-icon">✕</span>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="profile-info">
                    <div className="info-grid">
                      <div className="info-card">
                        <h4>Basic Information</h4>
                        <div className="info-item">
                          <span className="info-label">Name:</span>
                          <span className="info-value">{profileData.firstName} {profileData.lastName}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Age:</span>
                          <span className="info-value">{profileData.age} years old</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Occupation:</span>
                          <span className="info-value">{profileData.occupation}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">University:</span>
                          <span className="info-value">{profileData.university}</span>
                        </div>
                      </div>

                      <div className="info-card">
                        <h4>Contact Information</h4>
                        <div className="info-item">
                          <span className="info-label">Email:</span>
                          <span className="info-value">{profileData.email}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Phone:</span>
                          <span className="info-value">{profileData.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bio-section">
                      <h4>About Me</h4>
                      <p className="bio-text">{profileData.bio}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Roommate Preferences Tab */}
            {activeTab === 'roommate' && (
              <div className="tab-content">
                <div className="tab-header">
                  <h3>Roommate Preferences</h3>
                  {!isEditing && (
                    <button onClick={handleEdit} className="edit-btn">
                      <span className="btn-icon">✎</span>
                      Edit Preferences
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="profile-form">
                    <div className="form-group">
                      <label className="form-label">Deal Breakers</label>
                      <p className="form-help">Select things you absolutely cannot tolerate in a roommate</p>
                      <div className="checkbox-grid">
                        {dealBreakerOptions.map(option => (
                          <label key={option} className="checkbox-item">
                            <input
                              type="checkbox"
                              checked={formData.dealBreakers.includes(option)}
                              onChange={() => handleMultiSelect('dealBreakers', option)}
                            />
                            <span className="checkmark"></span>
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Cleanliness Level</label>
                        <select
                          name="preferences.cleanliness"
                          value={formData.preferences.cleanliness}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="Very Clean">Very Clean</option>
                          <option value="Moderately Clean">Moderately Clean</option>
                          <option value="Casual">Casual</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Social Level</label>
                        <select
                          name="preferences.socialLevel"
                          value={formData.preferences.socialLevel}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="Very Social">Very Social</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Prefer Privacy">Prefer Privacy</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Guest Policy</label>
                        <select
                          name="preferences.guestPolicy"
                          value={formData.preferences.guestPolicy}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="Guests Welcome">Guests Welcome</option>
                          <option value="Occasional Guests OK">Occasional Guests OK</option>
                          <option value="Rarely/No Guests">Rarely/No Guests</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Work Schedule</label>
                        <select
                          name="preferences.workSchedule"
                          value={formData.preferences.workSchedule}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="Day Shift">Day Shift (9-5)</option>
                          <option value="Night Shift">Night Shift</option>
                          <option value="Flexible">Flexible Schedule</option>
                          <option value="Student">Student Schedule</option>
                        </select>
                      </div>
                    </div>

                    {/* Save/Cancel */}
                    <div className="profile-actions">
                      <button onClick={handleSave} className="save-btn">
                        <span className="btn-icon">✓</span>
                        Save Preferences
                      </button>
                      <button onClick={handleCancel} className="cancel-btn">
                        <span className="btn-icon">✕</span>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="preferences-display">
                    <div className="dealbreakers-section">
                      <h4>My Deal Breakers</h4>
                      <div className="tags-container">
                        {profileData.dealBreakers.map(item => (
                          <span key={item} className="dealbreaker-tag">{item}</span>
                        ))}
                      </div>
                    </div>

                    <div className="preferences-grid">
                      <div className="pref-item">
                        <span className="pref-label">Cleanliness:</span>
                        <span className="pref-value">{profileData.preferences.cleanliness}</span>
                      </div>
                      <div className="pref-item">
                        <span className="pref-label">Social Level:</span>
                        <span className="pref-value">{profileData.preferences.socialLevel}</span>
                      </div>
                      <div className="pref-item">
                        <span className="pref-label">Guest Policy:</span>
                        <span className="pref-value">{profileData.preferences.guestPolicy}</span>
                      </div>
                      <div className="pref-item">
                        <span className="pref-label">Work Schedule:</span>
                        <span className="pref-value">{profileData.preferences.workSchedule}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Matching Criteria Tab */}
            {activeTab === 'matching' && (
              <div className="tab-content">
                <div className="tab-header">
                  <h3>Matching Criteria</h3>
                  {!isEditing && (
                    <button onClick={handleEdit} className="edit-btn">
                      <span className="btn-icon">✎</span>
                      Edit Criteria
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="profile-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Budget Range (Monthly)</label>
                        <input
                          type="number"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="1500"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Preferred Location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="San Francisco, CA"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Interests & Hobbies</label>
                      <p className="form-help">Select your interests to find like-minded roommates</p>
                      <div className="checkbox-grid">
                        {interestOptions.map(interest => (
                          <label key={interest} className="checkbox-item">
                            <input
                              type="checkbox"
                              checked={formData.interests.includes(interest)}
                              onChange={() => handleMultiSelect('interests', interest)}
                            />
                            <span className="checkmark"></span>
                            {interest}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Move-in Date</label>
                        <input
                          type="date"
                          name="moveInDate"
                          value={formData.moveInDate}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Lease Duration</label>
                        <select
                          name="leaseDuration"
                          value={formData.leaseDuration}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="6 months">6 months</option>
                          <option value="12 months">12 months</option>
                          <option value="18 months">18 months</option>
                          <option value="24 months">24 months</option>
                          <option value="Month to month">Month to month</option>
                        </select>
                      </div>
                    </div>

                    <div className="profile-actions">
                      <button onClick={handleSave} className="save-btn">
                        <span className="btn-icon">✓</span>
                        Save Criteria
                      </button>
                      <button onClick={handleCancel} className="cancel-btn">
                        <span className="btn-icon">✕</span>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="matching-display">
                    <div className="matching-info">
                      <div className="info-item">
                        <span className="info-label">Budget:</span>
                        <span className="info-value">${profileData.budget}/month</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Location:</span>
                        <span className="info-value">{profileData.location}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Move-in Date:</span>
                        <span className="info-value">{new Date(profileData.moveInDate).toLocaleDateString()}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Lease Duration:</span>
                        <span className="info-value">{profileData.leaseDuration}</span>
                      </div>
                    </div>

                    <div className="interests-section">
                      <h4>My Interests</h4>
                      <div className="tags-container">
                        {profileData.interests.map(interest => (
                          <span key={interest} className="interest-tag">{interest}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="profile-footer">
        <button 
          className="signout-btn"
          onClick={() => setShowSignOutModal(true)}
        >
          <span className="btn-icon">⏻</span>
          Sign Out
        </button>
      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignOutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Sign Out</h3>
            <p>Are you sure you want to sign out? You'll need to log in again to access your profile.</p>
            <div className="modal-actions">
              <button onClick={handleSignOut} className="confirm-btn">
                Yes, Sign Out
              </button>
              <button onClick={() => setShowSignOutModal(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;