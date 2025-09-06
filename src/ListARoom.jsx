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
      <div className="submittedContainer">
        <div className="submittedCard">
          <h2 className="submittedTitle">Room Listed Successfully!</h2>
          <p className="submittedText">
            Your room is now live and visible to potential roommates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="wrapper">
        <div className="header">
          <div>
            <h1 className="headerTitle">List Your Room</h1>
            <p className="headerStep">Step {currentStep} of {totalSteps}</p>
          </div>
        </div>

        <div className="progressWrapper">
          <div className="progressBar">
            <div 
              className="progressFill"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>

        <div className="stepInfo">
          <h2 className="stepTitle">{stepTitles[currentStep - 1]}</h2>
          <p className="stepDescription">{stepDescriptions[currentStep - 1]}</p>
        </div>

        {errors && <div className="errorMessage">{errors}</div>}

        <div className="stepContent">
          {currentStep === 1 && (
            <div className="formGroup">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Cozy room in modern apartment"
                className="input"
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
              <span className="charCount" style={{ color: formData.title.length > 50 ? '#e74c3c' : undefined }}>
                {formData.title.length}/60
              </span>
            </div>
          )}

          {currentStep === 2 && (
            <div className="formGroup">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your room, neighborhood, and what makes it special..."
                className="textarea"
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
              <span className="charCount" style={{ color: formData.description.length > 250 ? '#e74c3c' : undefined }}>
                {formData.description.length}/300
              </span>
            </div>
          )}

          {currentStep === 3 && (
            <div className="formGroup">
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                placeholder="Monthly rent amount"
                className="input"
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
                className="select"
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
            <div className="formGroup">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Area, Landmark"
                className="input"
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
              <span className="charCount" style={{ color: formData.location.length > 80 ? '#e74c3c' : undefined }}>
                {formData.location.length}/100
              </span>
              <input
                type="date"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="input"
                onFocus={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(141, 67, 24, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                }}
              />
              <label className="inputLabel">Available from</label>
            </div>
          )}

          {currentStep === 5 && (
            <div className="formGroup">
              <div className="checkboxGrid">
                {amenityOptions.map((amenity) => (
                  <label 
                    key={amenity} 
                    className="checkboxItem"
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleMultiSelect(amenity, 'amenities')}
                      className="checkbox"
                      style={{
                        transform: formData.amenities.includes(amenity) ? 'scale(1.1)' : 'scale(1)'
                      }}
                    />
                    <span 
                      className="checkboxText"
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
            <div className="formGroup">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="fileInput"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload" 
                className="fileUploadBtn"
              >
                Choose Photos (Max 5)
              </label>
              
              {imagePreview.length > 0 && (
                <div className="imagePreviewGrid">
                  {imagePreview.map((preview, index) => (
                    <div 
                      key={index} 
                      className="imagePreviewItem"
                    >
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        className="imagePreview" 
                      />
                      <button 
                        type="button"
                        onClick={() => removeImage(index)}
                        className="removeImageBtn"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentStep === 7 && (
            <div className="formGroup">
              <div className="checkboxGrid">
                {dealBreakerOptions.map((dealBreaker) => (
                  <label 
                    key={dealBreaker} 
                    className="checkboxItem"
                  >
                    <input
                      type="checkbox"
                      checked={formData.dealBreakers.includes(dealBreaker)}
                      onChange={() => handleMultiSelect(dealBreaker, 'dealBreakers')}
                      className="checkbox"
                      style={{
                        transform: formData.dealBreakers.includes(dealBreaker) ? 'scale(1.1)' : 'scale(1)'
                      }}
                    />
                    <span 
                      className="checkboxText"
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

        <div className="navFooter">
          {currentStep > 1 && (
            <button 
              type="button" 
              onClick={prevStep} 
              className="navBtn navBtnBack"
            >
              Back
            </button>
          )}
          {currentStep < totalSteps ? (
            <button 
              type="button" 
              onClick={nextStep} 
              className="navBtn navBtnNext"
            >
              Next
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleSubmit} 
              className="navBtn navBtnSubmit"
            >
              List My Room
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListARoom;
