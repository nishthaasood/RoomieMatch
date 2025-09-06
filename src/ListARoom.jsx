import React, { useState } from "react";
import "./ListRoom.css";

const dealBreakerOptions = [
  "Smoking", "Vaping", "Loud Music After 10 PM", "Pets",
  "Overnight Guests Frequently", "Messy Common Areas", "Strong Cooking Odors",
  "Late Night Phone Calls", "Drinking/Parties", "Different Sleep Schedules"
];

const amenityOptions = [
  "WiFi", "AC", "Parking", "Laundry", "Housekeeping", 
  "Balcony", "Gym", "Security", "Elevator", "Metro Access"
];

const stepTitles = [
  "Room Title", "Description", "Rent Amount", "Location", 
  "Amenities", "Photos", "Deal Breakers"
];

const stepDescriptions = [
  "Give your room a catchy and descriptive title",
  "Describe what makes your room special and unique",
  "Set a competitive monthly rent for your room",
  "Specify the exact location of your room",
  "Select all available amenities and facilities",
  "Upload high-quality photos to attract tenants",
  "Select behaviors or habits you cannot tolerate"
];

function ListARoom({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    location: "",
    amenities: [],
    images: [],
    dealBreakers: [],
    availability: "",
    roomType: "single"
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const totalSteps = 7;

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
        if (formData.title.length > 60) {
          setErrors("Title must be 60 characters or less.");
          return false;
        }
        break;
      case 2: 
        if (!formData.description.trim()) {
          setErrors("Description is required.");
          return false;
        }
        if (formData.description.length > 300) {
          setErrors("Description must be 300 characters or less.");
          return false;
        }
        break;
      case 3: 
        if (!formData.rent || isNaN(formData.rent)) {
          setErrors("Please enter a valid rent amount.");
          return false;
        }
        break;
      case 4: 
        if (!formData.location.trim()) {
          setErrors("Location is required.");
          return false;
        }
        if (formData.location.length > 100) {
          setErrors("Location must be 100 characters or less.");
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
    if (files.length > 5) {
      setErrors("You can upload maximum 5 photos.");
      return;
    }
    setFormData(prev => ({ ...prev, images: files }));
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
      <div className="listroomSubmittedContainer">
        <div className="listroomSubmittedCard">
          <h2 className="listroomSubmittedTitle">🎉 Room Listed Successfully!</h2>
          <p className="listroomSubmittedText">
            Your room is now live and visible to potential roommates! 
            <br /><br />
            Thank you for choosing Listroom! 🏠✨
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="listroomContainer">
      <div className="listroomWrapper">
        <div className="listroomHeader">
          <div>
            <h1 className="listroomHeaderTitle">🏠 List Your Room</h1>
            <p className="listroomHeaderStep">Step {currentStep} of {totalSteps}</p>
          </div>
        </div>

        <div className="listroomProgressWrapper">
          <div className="listroomProgressBar">
            <div 
              className="listroomProgressFill"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>

        <div className="listroomStepInfo">
          <h2 className="listroomStepTitle">{stepTitles[currentStep - 1]}</h2>
          <p className="listroomStepDescription">{stepDescriptions[currentStep - 1]}</p>
        </div>

        {errors && <div className="listroomErrorMessage">⚠️ {errors}</div>}

        <div className="listroomStepContent">
          {currentStep === 1 && (
            <div className="listroomFormGroup">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Cozy room in modern apartment"
                className="listroomInput"
                maxLength={60}
                style={{
                  borderColor: formData.title ? '#8D4318' : undefined,
                  boxShadow: formData.title ? '0 0 0 3px rgba(141, 67, 24, 0.1)' : undefined,
                }}
                onFocus={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(141, 67, 24, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = formData.title ? '0 0 0 3px rgba(141, 67, 24, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)';
                }}
              />
              <span className="listroomCharCount" style={{ color: formData.title.length > 50 ? '#e74c3c' : undefined }}>
                {formData.title.length}/60
              </span>
            </div>
          )}

          {currentStep === 2 && (
            <div className="listroomFormGroup">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your room, neighborhood, and what makes it special..."
                className="listroomTextarea"
                maxLength={300}
                rows={5}
                style={{
                  borderColor: formData.description ? '#8D4318' : undefined,
                  boxShadow: formData.description ? '0 0 0 3px rgba(141, 67, 24, 0.1)' : undefined,
                }}
                onFocus={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(141, 67, 24, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = formData.description ? '0 0 0 3px rgba(141, 67, 24, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)';
                }}
              />
              <span className="listroomCharCount" style={{ color: formData.description.length > 250 ? '#e74c3c' : undefined }}>
                {formData.description.length}/300
              </span>
            </div>
          )}

          {currentStep === 3 && (
            <div className="listroomFormGroup">
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                placeholder="Monthly rent amount"
                className="listroomInput"
                min="0"
                onFocus={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(141, 67, 24, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                }}
              />
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="listroomSelect"
                onFocus={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(141, 67, 24, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                }}
              >
                <option value="single">Single Room</option>
                <option value="shared">Shared Room</option>
                <option value="studio">Studio</option>
              </select>
            </div>
          )}

          {currentStep === 4 && (
            <div className="listroomFormGroup">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Area, Landmark"
                className="listroomInput"
                maxLength={100}
                style={{
                  borderColor: formData.location ? '#8D4318' : undefined,
                  boxShadow: formData.location ? '0 0 0 3px rgba(141, 67, 24, 0.1)' : undefined,
                }}
                onFocus={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(141, 67, 24, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = formData.location ? '0 0 0 3px rgba(141, 67, 24, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)';
                }}
              />
              <span className="listroomCharCount" style={{ color: formData.location.length > 80 ? '#e74c3c' : undefined }}>
                {formData.location.length}/100
              </span>
              <input
                type="date"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="listroomInput"
                onFocus={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(141, 67, 24, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                }}
              />
              <label className="listroomInputLabel">Available from</label>
            </div>
          )}

          {currentStep === 5 && (
            <div className="listroomFormGroup">
              <div className="listroomCheckboxGrid">
                {amenityOptions.map((amenity) => (
                  <label 
                    key={amenity} 
                    className="listroomCheckboxItem"
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleMultiSelect(amenity, 'amenities')}
                      className="listroomCheckbox"
                      style={{
                        transform: formData.amenities.includes(amenity) ? 'scale(1.1)' : 'scale(1)'
                      }}
                    />
                    <span 
                      className="listroomCheckboxText"
                      style={{
                        fontWeight: formData.amenities.includes(amenity) ? '700' : '500',
                        color: formData.amenities.includes(amenity) ? '#632D00' : '#495057'
                      }}
                    >
                      {amenity}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="listroomFormGroup">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="listroomFileInput"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload" 
                className="listroomFileUploadBtn"
              >
                📸 Choose Photos (Max 5)
              </label>
              
              {imagePreview.length > 0 && (
                <div className="listroomImagePreviewGrid">
                  {imagePreview.map((preview, index) => (
                    <div 
                      key={index} 
                      className="listroomImagePreviewItem"
                    >
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        className="listroomImagePreview" 
                      />
                      <button 
                        type="button"
                        onClick={() => removeImage(index)}
                        className="listroomRemoveImageBtn"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentStep === 7 && (
            <div className="listroomFormGroup">
              <div className="listroomCheckboxGrid">
                {dealBreakerOptions.map((dealBreaker) => (
                  <label 
                    key={dealBreaker} 
                    className="listroomCheckboxItem"
                  >
                    <input
                      type="checkbox"
                      checked={formData.dealBreakers.includes(dealBreaker)}
                      onChange={() => handleMultiSelect(dealBreaker, 'dealBreakers')}
                      className="listroomCheckbox"
                      style={{
                        transform: formData.dealBreakers.includes(dealBreaker) ? 'scale(1.1)' : 'scale(1)'
                      }}
                    />
                    <span 
                      className="listroomCheckboxText"
                      style={{
                        fontWeight: formData.dealBreakers.includes(dealBreaker) ? '700' : '500',
                        color: formData.dealBreakers.includes(dealBreaker) ? '#632D00' : '#495057'
                      }}
                    >
                      {dealBreaker}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="listroomNavFooter">
          {currentStep > 1 && (
            <button 
              type="button" 
              onClick={prevStep} 
              className="listroomNavBtn listroomNavBtnBack"
            >
              ← Back
            </button>
          )}
          {currentStep < totalSteps ? (
            <button 
              type="button" 
              onClick={nextStep} 
              className="listroomNavBtn listroomNavBtnNext"
            >
              Next →
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleSubmit} 
              className="listroomNavBtn listroomNavBtnSubmit"
            >
              🚀 List My Room
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListARoom;