import React from "react";
import "./PackingGuidelinesCard.css"; // Import CSS for styling

const PackingGuidelinesCard = () => {
  return (
    <div className="packing-card">
      <h2>📦 Packing Guidelines Summary</h2>
      <ul>
        <li>✅ All food items must be properly packed.</li>
        <li>🚫 Don't use expired, spoiled food while packing.</li>
        <li>✈ A traveler has the ability to decide the packing guideline according to a treavel time range.</li>
        <li>🔍 Click "Start Compliance Check" for details.</li>
      </ul>
    </div>
  );
};

export default PackingGuidelinesCard;
