import React, { useState, useEffect } from "react";
import "./ListRoom.css";

const dealBreakerOptions = [
  "Smoking", "Vaping", "Loud Music After 10 PM", "Pets",
  "Overnight Guests Frequently", "Messy Common Areas", "Strong Cooking Odors",
  "Late Night Phone Calls", "Drinking/Parties", "Different Sleep Schedules",
  "Shared Food Without Asking", "Not Cleaning Dishes", "Leaving Lights On", "High Energy Bills"
];

export default function ListRoom() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const [selectedDealBreakers, setSelectedDealBreakers] = useState([]);

  useEffect(() => {
    updateProgress();
  }, [currentStep]);

  const handleDealBreakerChange = (value) => {
    setSelectedDealBreakers((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const updateProgress = () => {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById("progress-fill").style.width = progress + "%";
    document.getElementById("current-step").textContent = currentStep;
  };

  const validateStep = (step) => {
    const requiredFields = {
      1: ["roomTitle"],
      2: ["roomDetails"],
      3: ["roomPhoto"],
      4: ["location"],
      5: ["rent"],
      7: [],
    };

    const fields = requiredFields[step] || [];
    for (let field of fields) {
      const element = document.getElementById(field);
      if (!element.value.trim()) {
        element.focus();
        element.style.borderColor = "#e00e0eff";
        setTimeout(() => {
          element.style.borderColor = "";
        }, 2000);
        return false;
      }
    }

    if (step === 7 && selectedDealBreakers.length === 0) {
      alert("Please select at least one deal breaker!");
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(7)) return;

    const formData = {
      roomTitle: document.getElementById("roomTitle").value,
      roomDetails: document.getElementById("roomDetails").value,
      roomPhoto: document.getElementById("roomPhoto").files[0],
      location: document.getElementById("location").value,
      rent: document.getElementById("rent").value,
      tiffinServices: document.getElementById("tiffinServices").value,
      selectedDealBreakers,
    };

    console.log("Form submitted:", formData);
    alert("Room listed successfully!");
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>List Your Room</h2>
        <div className="step-counter">
          Step <span id="current-step">1</span> of <span id="total-steps">{totalSteps}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" id="progress-fill" style={{ width: "14.28%" }}></div>
        </div>
      </div>

      <form id="step-form" onSubmit={handleSubmit}>
        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="form-step active">
            <div className="step-content">
              <h3 className="step-title">What's your room called?</h3>
              <p className="step-subtitle">Give it a title that stands out!</p>
              <input type="text" id="roomTitle" placeholder="e.g., Cozy Corner Room" required />
              <div className="button-group">
                <button type="button" className="btn btn-next" onClick={nextStep}>Next</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="form-step active">
            <div className="step-content">
              <h3 className="step-title">Tell us more!</h3>
              <p className="step-subtitle">Describe what makes your room special</p>
              <textarea id="roomDetails" placeholder="Describe your room..." required></textarea>
              <div className="button-group">
                <button type="button" className="btn btn-next" onClick={nextStep}>Next</button>
                <button type="button" className="btn btn-back" onClick={prevStep}>Back</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="form-step active">
            <div className="step-content">
              <h3 className="step-title">Show it off!</h3>
              <p className="step-subtitle">Upload a photos of your room</p>
              <input type="file" id="roomPhoto" accept="image/*" required />
              <div className="button-group">
               <button type="button" className="btn btn-next" onClick={nextStep}>Next</button>
                <button type="button" className="btn btn-back" onClick={prevStep}>Back</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <div className="form-step active">
            <div className="step-content">
              <h3 className="step-title">Where is it? </h3>
              <p className="step-subtitle">Help people find your space</p>
              <input type="text" id="location" placeholder="e.g., Address" required />
              <div className="button-group">
               <button type="button" className="btn btn-next" onClick={nextStep}>Next</button>
                <button type="button" className="btn btn-back" onClick={prevStep}>Back</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5 */}
        {currentStep === 5 && (
          <div className="form-step active">
            <div className="step-content">
              <h3 className="step-title">What's the rent? </h3>
              <p className="step-subtitle">Set a price for your space</p>
              <input type="number" id="rent" placeholder="15000" required />
              <div className="button-group">
                <button type="button" className="btn btn-next" onClick={nextStep}>Next</button>
                <button type="button" className="btn btn-back" onClick={prevStep}>Back</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 6 */}
        {currentStep === 6 && (
          <div className="form-step active">
            <div className="step-content">
              <h3 className="step-title">Food nearby? </h3>
              <p className="step-subtitle">Optional: Mention nearby tiffin services</p>
              <input type="text" id="tiffinServices" placeholder="e.g., Sharma Tiffin" />
              <button type="button" className="skip-btn" onClick={nextStep}>Skip this step</button>
              <div className="button-group">
               <button type="button" className="btn btn-next" onClick={nextStep}>Next</button>
                <button type="button" className="btn btn-back" onClick={prevStep}>Back</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 7 */}
        {currentStep === 7 && (
          <div className="form-step active">
            <div className="step-content">
              <h3 className="step-title">What are your deal breakers? </h3>
              <p className="step-subtitle">Select things you don't want</p>
              <div className="checkbox-grid">
                {dealBreakerOptions.map((option) => (
                  <div
                    key={option}
                    className={`checkbox-item ${selectedDealBreakers.includes(option) ? "selected" : ""}`}
                    onClick={() => handleDealBreakerChange(option)}
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedDealBreakers.includes(option)}
                      readOnly
                    />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              <div className="selected-display">
                <strong>Selected:</strong>{" "}
                <span id="selected-display">
                  {selectedDealBreakers.length > 0 ? selectedDealBreakers.join(", ") : "None"}
                </span>
              </div>
              <div className="button-group">
                <button type="button" className="btn btn-back" onClick={prevStep}>Back</button>
                <button type="submit" className="btn btn-submit pulse-animation">List My Room!</button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
