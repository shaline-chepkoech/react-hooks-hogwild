import React, { useState } from "react";
import Nav from "./Nav";

import hogs from "../porkers_data";

function App() {
	const [selectedHog, setSelectedHog] = useState(null);
	const [showGreasedOnly, setShowGreasedOnly] = useState(false);

	const handleHogClick = (hog) => {
		setSelectedHog(hog);
	};

	const handleCloseDetails = () => {
		setSelectedHog(null);
	};

	const handleFilterChange = () => {
		setShowGreasedOnly((prev) => !prev);
	};

	const filteredHogs = showGreasedOnly ? hogs.filter((hog) => hog.greased) : hogs;

	return (
		<div className="App">
			<Nav />
			<div className="filter-container">
				<label>
					<input 
						type="checkbox" 
						checked={showGreasedOnly} 
						onChange={handleFilterChange} 
					/>
					Show Greased Hogs Only
				</label>
			</div>
			<div className="hog-container">
			{filteredHogs.map((hog) => (
					<div className="hog-tile" key={hog.name} onClick={() => handleHogClick(hog)}>
						<h3>{hog.name}</h3>
						<img src={hog.image} alt={hog.name} />
					</div>
				))}
		</div>
		{selectedHog && (
				<div className="hog-details">
					<h3>{selectedHog.name}</h3>
					<p><strong>Specialty:</strong> {selectedHog.specialty}</p>
					<p><strong>Weight:</strong> {selectedHog.weight} lbs</p>
					<p><strong>Greased:</strong> {selectedHog.greased ? 'Yes' : 'No'}</p>
					<p><strong>Highest Medal Achieved:</strong> {selectedHog.highestMedal}</p>
					<button onClick={handleCloseDetails}>Close</button>
				</div>
		)}
		</div>
	);
}

export default App;
