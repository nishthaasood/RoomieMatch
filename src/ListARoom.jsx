import React, { useState } from "react";
import "./ListRoom.css";

const dealBreakerOptions = [
  "Smoking", "Vaping", "Loud Music After 10 PM", "Pets",
  "Overnight Guests Frequently", "Messy Common Areas", "Strong Cooking Odors",
  "Late Night Phone Calls", "Drinking/Parties", "Different Sleep Schedules",
  "Shared Food Without Asking", "Not Cleaning Dishes",
  "Leaving Lights/AC On", "Bringing Strangers Home"
];

function ListARoom({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    location: "",
    amenities: [],
    images: [],
    contact: "",
    rules: [],
    dealBreakers: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState("");
  const totalSteps = 8;

  // ✅ Navigation
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

  // ✅ Validation per step
  const validateStep = () => {
    switch (currentStep) {
      case 1: if (!formData.title) return setErrors("Title is required."), false; break;
      case 2: if (!formData.description) return setErrors("Description is required."), false; break;
      case 3: if (!formData.rent || isNaN(formData.rent)) return setErrors("Valid rent is required."), false; break;
      case 4: if (!formData.location) return setErrors("Location is required."), false; break;
      case 5: if (formData.amenities.length === 0) return setErrors("Please select at least one amenity."), false; break;
      case 7: if (!formData.contact) return setErrors("Contact info is required."), false; break;
      default: break;
    }
    return true;
  };

  // ✅ Handle submit
  const handleSubmit = () => {
    if (validateStep()) {
      console.log("Form submitted:", formData);
      alert("Room Listed Successfully!");
      setCurrentPage("home");
    }
  };

  // ✅ Field updates
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e, field) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  return (
    <div className="lr-container">
      <div className="lr-card">
        {/* Header */}
        <div className="lr-header">
          <h2>List Your Room</h2>
          <p>Step {currentStep} of {totalSteps}</p>
        </div>

        {/* Step Content */}
        <div className="lr-content">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div>
              <label>Room Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div>
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div>
              <label>Monthly Rent (₹)</label>
              <input type="number" name="rent" value={formData.rent} onChange={handleChange} />
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div>
              <label>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} />
            </div>
          )}

          {/* Step 5 */}
          {currentStep === 5 && (
            <div>
              <label>Amenities</label>
              <div className="lr-options">
                {["WiFi", "AC", "Parking", "Laundry", "Kitchen", "Balcony"].map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    className={formData.amenities.includes(amenity) ? "selected" : ""}
                    onClick={() => handleMultiSelect({ target: { value: amenity } }, "amenities")}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6 */}
          {currentStep === 6 && (
            <div>
              <label>Upload Images</label>
              <input type="file" multiple onChange={handleFileChange} />
              {formData.images.length > 0 && (
                <p>{formData.images.length} image(s) selected</p>
              )}
            </div>
          )}

          {/* Step 7 */}
          {currentStep === 7 && (
            <div>
              <label>Contact Info</label>
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
            </div>
          )}

          {currentStep === 8 && (
            <div>
              <label>Deal Breakers</label>
              <div className="lr-options">
                {dealBreakerOptions.map((deal) => (
                  <button
                    key={deal}
                    type="button"
                    className={formData.dealBreakers.includes(deal) ? "selected" : ""}
                    onClick={() => handleMultiSelect({ target: { value: deal } }, "dealBreakers")}
                  >
                    {deal}
                  </button>
                ))}
              </div>
              {selectedDealBreakers.length > 0 && (
                <div className="lr-selected-display">
                  <strong>Selected:</strong> {selectedDealBreakers.join(", ")}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {errors && (
          <div className="lr-error">
            <p>{errors}</p>
          </div>
        )}

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
  );
}

export default ListARoom;
