// App.jsx
import React, { useState } from "react";
import Nav from "./Nav";
import HogTile from "./HogTile"; // Assuming you have a HogTile component
import hogs from "../porkers_data"; // Importing hog data

function App() {
	const [hogList, setHogList] = useState(hogs);
	const [selectedHog, setSelectedHog] = useState(null);
	const [showGreasedOnly, setShowGreasedOnly] = useState(false);
	const [sortCriterion, setSortCriterion] = useState("name");

	// Filter and sort hogs
	const filteredHogs = showGreasedOnly ? hogList.filter((hog) => hog.greased) : hogList;
	const sortedHogs = [...filteredHogs].sort((a, b) => {
		if (sortCriterion === "name") return a.name.localeCompare(b.name);
		if (sortCriterion === "weight") return a.weight - b.weight;
		return 0;
	});

	// Toggle greased filter
	const handleFilterChange = () => {
		setShowGreasedOnly((prev) => !prev);
	};

	// Update sort criterion
	const handleSortChange = (e) => {
		setSortCriterion(e.target.value);
	};

	// Set selected hog to view details
	const handleHogClick = (hog) => {
		setSelectedHog(hog);
	};

	// Close hog details
	const handleCloseDetails = () => {
		setSelectedHog(null);
	};

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

			{/* Container for hog tiles */}
			<div className="hog-container">
				{sortedHogs.map((hog) => (
					<HogTile 
						key={hog.name} 
						hog={hog} 
						onHogClick={handleHogClick} 
					/>
				))}
			</div>

			{/* Display selected hog details if a hog is selected */}
			{selectedHog && (
				<div className="hog-details">
					<h3>{selectedHog.name}</h3>
					<p><strong>Specialty:</strong> {selectedHog.specialty}</p>
					<p><strong>Weight:</strong> {selectedHog.weight} lbs</p>
					<p><strong>Greased:</strong> {selectedHog.greased ? 'Yes' : 'No'}</p>
					<p><strong>Highest Medal Achieved:</strong> {selectedHog["highest medal achieved"]}</p> {/* Bracket notation for highest medal */}
					<button onClick={handleCloseDetails}>Close</button>
				</div>
			)}
		</div>
	);
}

export default App;
