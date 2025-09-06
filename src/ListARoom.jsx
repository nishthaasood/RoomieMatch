import React, { useState } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  FileText, 
  IndianRupee, 
  MapPin, 
  Wifi, 
  Camera, 
  Phone, 
  Shield,
  CheckCircle2,
  Upload,
  X,
  Plus,
  Calendar,
  Users,
  Utensils,
  AlertCircle,
  Star,
  Car,
  Dumbbell,
  Zap,
  TreePine,
  Building,
  Lock
} from 'lucide-react';
import "./ListRoom.css";

const dealBreakerOptions = [
  "Smoking", "Vaping", "Loud Music After 10 PM", "Pets",
  "Overnight Guests Frequently", "Messy Common Areas", "Strong Cooking Odors",
  "Late Night Phone Calls", "Drinking/Parties", "Different Sleep Schedules",
  "Shared Food Without Asking", "Not Cleaning Dishes",
  "Leaving Lights/AC On", "Bringing Strangers Home"
];

const amenityOptions = [
  "WiFi", "AC", "Parking", "Laundry", "Kitchen", "Balcony", 
  "Gym", "Swimming Pool", "Security", "Elevator", "Power Backup", 
  "Furnished", "Semi-Furnished", "Study Room", "Garden", "Terrace",
  "CCTV", "Intercom", "Housekeeping", "Water Purifier"
];

const stepIcons = [
  Home, FileText, IndianRupee, MapPin, Wifi, Camera, Phone, Shield
];

const stepTitles = [
  "Room Title", "Description", "Rent Amount", "Location", 
  "Amenities", "Photos", "Contact Info", "Preferences"
];

const stepDescriptions = [
  "Give your room a catchy and descriptive title",
  "Describe what makes your room special and unique",
  "Set a competitive monthly rent for your room",
  "Specify the exact location of your room",
  "Select all available amenities and facilities",
  "Upload high-quality photos to attract tenants",
  "Provide your contact information for inquiries",
  "Set your preferences and deal-breakers"
];

const getAmenityIcon = (amenity) => {
  const iconMap = {
    'WiFi': Wifi,
    'AC': Zap,
    'Parking': Car,
    'Gym': Dumbbell,
    'Security': Shield,
    'Garden': TreePine,
    'Elevator': Building,
    'CCTV': Lock,
  };
  return iconMap[amenity] || Wifi;
};

function ListARoom({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    location: "",
    amenities: [],
    images: [],
    contact: "",
    dealBreakers: [],
    tiffinService: "",
    roomiePreference: "",
    availability: "",
    roomType: "single",
    securityDeposit: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const totalSteps = 8;

  const nextStep = () => {
    if (validateStep()) {
      setErrors("");
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setErrors("");
    setCurrentStep((prev) => prev - 1);
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1: 
        if (!formData.title.trim()) {
          setErrors("Room title is required.");
          return false;
        }
        if (formData.title.length < 10) {
          setErrors("Title should be at least 10 characters long.");
          return false;
        }
        break;
      case 2: 
        if (!formData.description.trim()) {
          setErrors("Description is required.");
          return false;
        }
        if (formData.description.length < 50) {
          setErrors("Description should be at least 50 characters long.");
          return false;
        }
        break;
      case 3: 
        if (!formData.rent || isNaN(formData.rent) || formData.rent < 1000) {
          setErrors("Please enter a valid rent amount (minimum ₹1000).");
          return false;
        }
        if (!formData.securityDeposit || isNaN(formData.securityDeposit)) {
          setErrors("Please enter a valid security deposit amount.");
          return false;
        }
        break;
      case 4: 
        if (!formData.location.trim()) {
          setErrors("Location is required.");
          return false;
        }
        if (!formData.availability) {
          setErrors("Please specify when the room will be available.");
          return false;
        }
        break;
      case 5: 
        if (formData.amenities.length === 0) {
          setErrors("Please select at least one amenity.");
          return false;
        }
        break;
      case 6:
        // Images are optional, so no validation needed
        break;
      case 7: 
        if (!formData.contact.trim()) {
          setErrors("Contact information is required.");
          return false;
        }
        if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.contact.replace(/[\s\-\(\)]/g, ''))) {
          setErrors("Please enter a valid phone number.");
          return false;
        }
        break;
      default: 
        break;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateStep()) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setCurrentPage("home");
      }, 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors("");
  };

  const handleMultiSelect = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: files }));
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
    setImagePreview(newPreviews);
  };

  const getProgress = () => (currentStep / totalSteps) * 100;

  if (isSubmitted) {
    return (
      <div className="lr-success-container">
        <div className="lr-success-card">
          <div className="lr-success-icon-wrapper">
            <CheckCircle2 className="lr-success-icon" />
          </div>
          <h2 className="lr-success-title">Room Listed Successfully!</h2>
          <p className="lr-success-message">
            Your room is now live and visible to potential roommates. You'll receive notifications when someone shows interest.
          </p>
          <div className="lr-success-features">
            <div className="lr-feature-item">
              <Star className="lr-feature-icon" />
              <span>Visible to thousands of users</span>
            </div>
            <div className="lr-feature-item">
              <Shield className="lr-feature-icon" />
              <span>Verified listing status</span>
            </div>
            <div className="lr-feature-item">
              <Users className="lr-feature-icon" />
              <span>Smart matching algorithm</span>
            </div>
          </div>
          <div className="lr-progress-bar">
            <div className="lr-progress-fill"></div>
          </div>
          <p className="lr-redirect-text">Redirecting you back to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lr-wrapper">
      <div className="lr-container">
        <div className="lr-card">
          {/* Header */}
          <div className="lr-header">
            <button 
              onClick={() => setCurrentPage('home')} 
              className="lr-back-to-home"
              aria-label="Back to home"
            >
              <ArrowLeft className="lr-back-icon" />
            </button>
            <div className="lr-header-content">
              <h1 className="lr-title">List Your Room</h1>
              <p className="lr-subtitle">Step {currentStep} of {totalSteps}</p>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="lr-progress-section">
            <div className="lr-steps-indicator">
              {Array.from({ length: totalSteps }, (_, i) => {
                const StepIcon = stepIcons[i];
                const isCompleted = i + 1 < currentStep;
                const isCurrent = i + 1 === currentStep;
                
                return (
                  <div key={i} className="lr-step-indicator">
                    <div className={`lr-step-circle ${
                      isCompleted ? 'completed' : isCurrent ? 'current' : 'inactive'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="lr-step-check" />
                      ) : (
                        <StepIcon className="lr-step-icon" />
                      )}
                    </div>
                    <span className="lr-step-number">{i + 1}</span>
                  </div>
                );
              })}
            </div>
            <div className="lr-progress-bar-container">
              <div 
                className="lr-progress-bar-fill" 
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="lr-content">
            <div className="lr-step-header">
              <h2 className="lr-step-title">{stepTitles[currentStep - 1]}</h2>
              <p className="lr-step-description">{stepDescriptions[currentStep - 1]}</p>
            </div>

            <div className="lr-form-content">
              {/* Step 1: Room Title */}
              {currentStep === 1 && (
                <div className="lr-form-group">
                  <div className="lr-input-wrapper">
                    <Home className="lr-input-icon" />
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Cozy room in modern apartment with great amenities"
                      className="lr-input"
                      maxLength="100"
                    />
                  </div>
                  <div className="lr-char-count">
                    {formData.title.length}/100 characters
                  </div>
                  <div className="lr-tips">
                    <strong>Tips:</strong> Use descriptive words like "cozy", "spacious", "modern" to attract more viewers.
                  </div>
                </div>
              )}

              {/* Step 2: Description */}
              {currentStep === 2 && (
                <div className="lr-form-group">
                  <div className="lr-textarea-wrapper">
                    <FileText className="lr-textarea-icon" />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your room in detail. Mention nearby facilities, transportation, what makes it special..."
                      className="lr-textarea"
                      rows="6"
                      maxLength="500"
                    />
                  </div>
                  <div className="lr-char-count">
                    {formData.description.length}/500 characters
                  </div>
                  <div className="lr-tips">
                    <strong>Tips:</strong> Mention nearby metro stations, colleges, offices, or any unique features of your room.
                  </div>
                </div>
              )}

              {/* Step 3: Rent and Security */}
              {currentStep === 3 && (
                <div className="lr-form-group">
                  <div className="lr-rent-container">
                    <div className="lr-rent-input-group">
                      <label className="lr-label">Monthly Rent</label>
                      <div className="lr-input-wrapper">
                        <IndianRupee className="lr-input-icon" />
                        <input
                          type="number"
                          name="rent"
                          value={formData.rent}
                          onChange={handleChange}
                          placeholder="15000"
                          className="lr-input"
                          min="1000"
                          max="100000"
                        />
                      </div>
                    </div>
                    
                    <div className="lr-rent-input-group">
                      <label className="lr-label">Security Deposit</label>
                      <div className="lr-input-wrapper">
                        <Shield className="lr-input-icon" />
                        <input
                          type="number"
                          name="securityDeposit"
                          value={formData.securityDeposit}
                          onChange={handleChange}
                          placeholder="30000"
                          className="lr-input"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="lr-room-type">
                    <label className="lr-label">Room Type</label>
                    <div className="lr-radio-group">
                      {['single', 'shared', 'studio'].map(type => (
                        <label key={type} className="lr-radio-item">
                          <input
                            type="radio"
                            name="roomType"
                            value={type}
                            checked={formData.roomType === type}
                            onChange={handleChange}
                            className="lr-radio"
                          />
                          <span className="lr-radio-label">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="lr-tips">
                    <strong>Tips:</strong> Research similar properties in your area to set competitive pricing.
                  </div>
                </div>
              )}

              {/* Step 4: Location and Availability */}
              {currentStep === 4 && (
                <div className="lr-form-group">
                  <div className="lr-input-wrapper">
                    <MapPin className="lr-input-icon" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Sector 15, Rohini, New Delhi - 110085"
                      className="lr-input"
                    />
                  </div>
                  
                  <div className="lr-availability-group">
                    <label className="lr-label">Available From</label>
                    <div className="lr-input-wrapper">
                      <Calendar className="lr-input-icon" />
                      <input
                        type="date"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        className="lr-input"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="lr-tips">
                    <strong>Tips:</strong> Include nearby landmarks, metro stations, or popular areas to help people find your location easily.
                  </div>
                </div>
              )}

              {/* Step 5: Amenities */}
              {currentStep === 5 && (
                <div className="lr-form-group">
                  <div className="lr-amenities-grid">
                    {amenityOptions.map((amenity) => {
                      const IconComponent = getAmenityIcon(amenity);
                      return (
                        <button
                          key={amenity}
                          type="button"
                          className={`lr-amenity-btn ${
                            formData.amenities.includes(amenity) ? 'selected' : ''
                          }`}
                          onClick={() => handleMultiSelect(amenity, 'amenities')}
                        >
                          <IconComponent className="lr-amenity-icon" />
                          <span>{amenity}</span>
                        </button>
                      );
                    })}
                  </div>
                  {formData.amenities.length > 0 && (
                    <div className="lr-selected-display">
                      <strong>Selected Amenities:</strong>
                      <div className="lr-selected-tags">
                        {formData.amenities.map((amenity, idx) => (
                          <span key={idx} className="lr-selected-tag">
                            {amenity}
                            <button
                              type="button"
                              onClick={() => handleMultiSelect(amenity, 'amenities')}
                              className="lr-tag-remove"
                            >
                              <X className="lr-tag-remove-icon" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 6: Photos */}
              {currentStep === 6 && (
                <div className="lr-form-group">
                  <div className="lr-upload-section">
                    <div className="lr-upload-area">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="lr-file-input"
                        id="room-images"
                      />
                      <label htmlFor="room-images" className="lr-upload-label">
                        <Upload className="lr-upload-icon" />
                        <div className="lr-upload-text">
                          <span className="lr-upload-title">Upload Room Photos</span>
                          <span className="lr-upload-subtitle">
                            Drag and drop or click to select images
                          </span>
                        </div>
                      </label>
                    </div>
                    
                    {imagePreview.length > 0 && (
                      <div className="lr-image-preview">
                        <h4 className="lr-preview-title">Selected Images ({imagePreview.length})</h4>
                        <div className="lr-preview-grid">
                          {imagePreview.map((preview, index) => (
                            <div key={index} className="lr-preview-item">
                              <img src={preview} alt={`Preview ${index + 1}`} className="lr-preview-image" />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="lr-remove-image"
                              >
                                <X className="lr-remove-icon" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="lr-tips">
                    <strong>Tips:</strong> Upload well-lit photos showing different angles of the room. Include photos of common areas if available.
                  </div>
                </div>
              )}

              {/* Step 7: Contact Info */}
              {currentStep === 7 && (
                <div className="lr-form-group">
                  <div className="lr-input-wrapper">
                    <Phone className="lr-input-icon" />
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="lr-input"
                    />
                  </div>
                  
                  <div className="lr-tiffin-section">
                    <label className="lr-label">Tiffin Service (Optional)</label>
                    <div className="lr-input-wrapper">
                      <Utensils className="lr-input-icon" />
                      <input
                        type="text"
                        name="tiffinService"
                        value={formData.tiffinService}
                        onChange={handleChange}
                        placeholder="e.g., Home-cooked meals available, XYZ Tiffin Service"
                        className="lr-input"
                      />
                    </div>
                  </div>

                  <div className="lr-roomie-section">
                    <label className="lr-label">Preferred Roommate</label>
                    <div className="lr-input-wrapper">
                      <Users className="lr-input-icon" />
                      <input
                        type="text"
                        name="roomiePreference"
                        value={formData.roomiePreference}
                        onChange={handleChange}
                        placeholder="e.g., Working professional, Student, No preference"
                        className="lr-input"
                      />
                    </div>
                  </div>

                  <div className="lr-tips">
                    <strong>Tips:</strong> Providing tiffin service information can attract more tenants.
                  </div>
                </div>
              )}

              {/* Step 8: Deal Breakers */}
              {currentStep === 8 && (
                <div className="lr-form-group">
                  <div className="lr-dealbreakers-grid">
                    {dealBreakerOptions.map((deal) => (
                      <button
                        key={deal}
                        type="button"
                        className={`lr-dealbreaker-btn ${
                          formData.dealBreakers.includes(deal) ? 'selected' : ''
                        }`}
                        onClick={() => handleMultiSelect(deal, 'dealBreakers')}
                      >
                        <AlertCircle className="lr-dealbreaker-icon" />
                        <span>{deal}</span>
                      </button>
                    ))}
                  </div>
                  {formData.dealBreakers.length > 0 && (
                    <div className="lr-selected-display">
                      <strong>Selected Deal Breakers:</strong>
                      <div className="lr-selected-tags">
                        {formData.dealBreakers.map((deal, idx) => (
                          <span key={idx} className="lr-selected-tag dealbreaker">
                            {deal}
                            <button
                              type="button"
                              onClick={() => handleMultiSelect(deal, 'dealBreakers')}
                              className="lr-tag-remove"
                            >
                              <X className="lr-tag-remove-icon" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="lr-tips">
                    <strong>Note:</strong> These are things you absolutely cannot tolerate. Be selective to attract the right roommates.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error Display */}
          {errors && (
            <div className="lr-error">
              <AlertCircle className="lr-error-icon" />
              <p className="lr-error-text">{errors}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="lr-navigation">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="lr-nav-btn lr-back-btn"
              >
                <ArrowLeft className="lr-nav-icon" />
                <span>Back</span>
              </button>
            )}

            <div className="lr-nav-spacer"></div>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="lr-nav-btn lr-next-btn"
              >
                <span>Next</span>
                <ArrowRight className="lr-nav-icon" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="lr-nav-btn lr-submit-btn"
              >
                <span>List My Room</span>
                <CheckCircle2 className="lr-nav-icon" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListARoom;
