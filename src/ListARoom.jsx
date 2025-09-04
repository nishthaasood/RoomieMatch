import React, { useState } from "react";
import "./ListRoom.css";

const dealBreakerOptions = [
  "Smoking", "Vaping", "Loud Music After 10 PM", "Pets",
  "Overnight Guests Frequently", "Messy Common Areas", "Strong Cooking Odors",
  "Late Night Phone Calls", "Drinking/Parties", "Different Sleep Schedules",
  "Shared Food Without Asking", "Not Cleaning Dishes", "Leaving Lights On", "High Energy Bills"
];

export default function ListARoom() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDealBreakers, setSelectedDealBreakers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    roomTitle: "",
    roomDetails: "",
    roomPhoto: null,
    location: "",
    rent: "",
    tiffinServices: ""
  });

  const totalSteps = 7;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setErrors(""); // clear error when user types
  };

  const handleDealBreakerChange = (value) => {
    setSelectedDealBreakers((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
    setErrors(""); 
  };

  // ✅ Validation per step
  const validateStep = (step) => {
    if (step === 1 && !formData.roomTitle.trim()) {
      setErrors("Please enter a room title.");
      return false;
    }
    if (step === 2 && !formData.roomDetails.trim()) {
      setErrors("Please describe your room.");
      return false;
    }
    if (step === 3 && !formData.roomPhoto) {
      setErrors("Please upload a photo.");
      return false;
    }
    if (step === 4 && !formData.location.trim()) {
      setErrors("Please enter a location.");
      return false;
    }
    if (step === 5 && !formData.rent.trim()) {
      setErrors("Please enter the rent.");
      return false;
    }
    if (step === 7 && selectedDealBreakers.length === 0) {
      setErrors("Please select at least one deal breaker.");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setErrors(""); // clear error if valid
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setErrors(""); // clear error when going back
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(7)) {
      const finalData = {
        ...formData,
        selectedDealBreakers
      };
      console.log("Form submitted:", finalData);
      setIsSubmitted(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setCurrentStep(1);
        setFormData({
          roomTitle: "",
          roomDetails: "",
          roomPhoto: null,
          location: "",
          rent: "",
          tiffinServices: ""
        });
        setSelectedDealBreakers([]);
        setErrors("");
      }, 3000);
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  // ✅ Success screen
  if (isSubmitted) {
    return (
      <div className="lr-container">
        <div className="lr-success">
          <div className="lr-success-icon">🎉</div>
          <h2 className="lr-success-title">Room Listed Successfully!</h2>
          <p className="lr-success-message">
            Your room has been added to our listings. Potential roommates will be able to see it soon!
          </p>
          <div className="lr-success-bar"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="lr-container">
      <div className="lr-card">
        {/* Header */}
        <div className="lr-header">
          <h2 className="lr-title">List Your Room</h2>
          <div className="lr-step-counter">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="lr-progress">
            <div
              className="lr-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Form Steps */}
        <div className="lr-content">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="lr-step">
              <h3 className="lr-step-title">What's your room called?</h3>
              <p className="lr-step-subtitle">Give it a title that stands out!</p>
              <input
                type="text"
                value={formData.roomTitle}
                onChange={(e) => handleInputChange("roomTitle", e.target.value)}
                placeholder="e.g., Cozy Corner Room"
                className="lr-input"
              />
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="lr-step">
              <h3 className="lr-step-title">Tell us more!</h3>
              <p className="lr-step-subtitle">Describe what makes your room special</p>
              <textarea
                value={formData.roomDetails}
                onChange={(e) => handleInputChange("roomDetails", e.target.value)}
                placeholder="Describe your room, amenities, and what makes it unique..."
                className="lr-textarea"
                rows="4"
              />
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="lr-step">
              <h3 className="lr-step-title">Show it off!</h3>
              <p className="lr-step-subtitle">Upload photos of your room</p>
              <div className="lr-file-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleInputChange("roomPhoto", e.target.files[0])}
                  className="lr-file-input"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="lr-file-label">
                  {formData.roomPhoto ? formData.roomPhoto.name : "Choose Photo"}
                </label>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div className="lr-step">
              <h3 className="lr-step-title">Where is it?</h3>
              <p className="lr-step-subtitle">Help people find your space</p>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., Sector 17, Rohini"
                className="lr-input"
              />
            </div>
          )}

          {/* Step 5 */}
          {currentStep === 5 && (
            <div className="lr-step">
              <h3 className="lr-step-title">What's the rent?</h3>
              <p className="lr-step-subtitle">Set a price for your space!</p>
              <div className="lr-price">
                <span className="lr-currency">₹</span>
                <input
                  type="number"
                  value={formData.rent}
                  onChange={(e) => handleInputChange("rent", e.target.value)}
                  placeholder="15000"
                  className="lr-price-input"
                />
                <span className="lr-per-month">/month</span>
              </div>
            </div>
          )}

          {/* Step 6 */}
          {currentStep === 6 && (
            <div className="lr-step">
              <h3 className="lr-step-title">Food nearby?</h3>
              <p className="lr-step-subtitle">Optional: Mention nearby tiffin services</p>
              <input
                type="text"
                value={formData.tiffinServices}
                onChange={(e) => handleInputChange("tiffinServices", e.target.value)}
                placeholder="e.g., Sharma Tiffin, Local Mess"
                className="lr-input"
              />
              <button type="button" onClick={nextStep} className="lr-skip-btn">
                Skip this step
              </button>
            </div>
          )}

          {/* Step 7 */}
          {currentStep === 7 && (
            <div className="lr-step">
              <h3 className="lr-step-title">What are your deal breakers?</h3>
              <p className="lr-step-subtitle">Select things you don't Want!</p>
              <div className="lr-checkbox-grid">
                {dealBreakerOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleDealBreakerChange(option)}
                    className={`lr-checkbox-item ${
                      selectedDealBreakers.includes(option) ? "lr-selected" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDealBreakers.includes(option)}
                      readOnly
                    />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {selectedDealBreakers.length > 0 && (
                <div className="lr-selected-display">
                  <strong>Selected:</strong> {selectedDealBreakers.join(", ")}
                </div>
              )}
            </div>
          )}

          {/*  Error Message */}
          {errors && <p style={{ color: "red", marginTop: "10px" }}>{errors}</p>}

          {/* Navigation */}
          <div className="lr-buttons">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="lr-back-btn">
                Back
              </button>
            )}

            {currentStep < totalSteps ? (
              <button type="button" onClick={nextStep} className="lr-next-btn">
                Next
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} className="lr-submit-btn">
                List My Room! 
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
