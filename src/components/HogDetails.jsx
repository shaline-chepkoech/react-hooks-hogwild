// HogDetails.jsx
import React from "react";

function HogDetails({ hog, onClose }) {
	return (
		<div className="hog-details">
			<h3>{hog.name}</h3>
			<p><strong>Specialty:</strong> {hog.specialty}</p>
			<p><strong>Weight:</strong> {hog.weight} lbs</p>
			<p><strong>Greased:</strong> {hog.greased ? 'Yes' : 'No'}</p>
			<p><strong>Highest Medal Achieved:</strong> {hog["highest medal achieved"]}</p>
			<button onClick={onClose}>Close</button>
		</div>
	);
}

export default HogDetails;
