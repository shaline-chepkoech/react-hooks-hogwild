import React, { useState } from "react";
import Nav from "./Nav";

import hogs from "../porkers_data";

function App() {
	const [selectedHog, setSelectedHog] = useState(null);
	const [showGreasedOnly, setShowGreasedOnly] = useState(false);
	const [sortCriterion, setSortCriterion] = useState("name");

	const handleHogClick = (hog) => {
		setSelectedHog(hog);
	};

	const handleCloseDetails = () => {
		setSelectedHog(null);
	};

	const handleFilterChange = () => {
		setShowGreasedOnly((prev) => !prev);
	};

	const handleSortChange = (e) => {
		setSortCriterion(e.target.value);
	};

	const filteredHogs = showGreasedOnly ? hogs.filter((hog) => hog.greased) : hogs;
    const sortedHogs = [...filteredHogs].sort((a, b) => {
		if (sortCriterion === "name") {
			return a.name.localeCompare(b.name);
		} else if (sortCriterion === "weight") {
			return a.weight - b.weight;
		}
		return 0;
	});

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
			
			<div className="sort-container">
			<label>
					Sort by: 
					<select value={sortCriterion} onChange={handleSortChange}>
						<option value="name">Name</option>
						<option value="weight">Weight</option>
					</select>
				</label>
			</div>
			<div className="hog-container">
			{sortedHogs.map((hog) => (
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
