import React, { useState } from "react";
import Nav from "./Nav";

import hogs from "../porkers_data";

function App() {
	const [hogList, setHogList] = useState(hogs);
	const [selectedHog, setSelectedHog] = useState(null);
	const [showGreasedOnly, setShowGreasedOnly] = useState(false);
	const [sortCriterion, setSortCriterion] = useState("name");
	const [hiddenHogs, setHiddenHogs] = useState([]);
	const [newHog, setNewHog] = useState({
		name: "",
		specialty: "",
		weight: "",
		greased: false,
		image: "",
		highestMedal: "",
	});


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

	const handleHideHog = (hogName) => {
		setHiddenHogs((prevHiddenHogs) => [...prevHiddenHogs, hogName]);
	};

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setNewHog((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleAddHog = (e) => {
		e.preventDefault();
		const newHogEntry = { ...newHog, weight: parseFloat(newHog.weight) };
		setHogList((prevHogList) => [...prevHogList, newHogEntry]);
		setNewHog({
			name: "",
			specialty: "",
			weight: "",
			greased: false,
			image: "",
			highestMedal: "",
		});
	};

	const filteredHogs = showGreasedOnly ? hogList.filter((hog) => hog.greased) : hogs;
	const visibleHogs = filteredHogs.filter((hog) => !hiddenHogs.includes(hog.name));
    const sortedHogs = [...visibleHogs].sort((a, b) => {
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
			<form onSubmit={handleAddHog} className="add-hog-form">
				<h2>Add a New Hog</h2>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={newHog.name}
					onChange={handleInputChange}
					required
				/>
				<input
					type="text"
					name="specialty"
					placeholder="Specialty"
					value={newHog.specialty}
					onChange={handleInputChange}
					required
				/>
				<input
					type="number"
					name="weight"
					placeholder="Weight"
					value={newHog.weight}
					onChange={handleInputChange}
					required
				/>
				<label>
					Greased:
					<input
						type="checkbox"
						name="greased"
						checked={newHog.greased}
						onChange={handleInputChange}
					/>
				</label>
				<input
					type="text"
					name="image"
					placeholder="Image URL"
					value={newHog.image}
					onChange={handleInputChange}
					required
				/>
				<input
					type="text"
					name="highestMedal"
					placeholder="Highest Medal Achieved"
					value={newHog.highestMedal}
					onChange={handleInputChange}
					required
				/>
				<button type="submit">Add Hog</button>
			</form>

			<div className="hog-container">
			{sortedHogs.map((hog) => (
					<div className="hog-tile" key={hog.name} onClick={() => handleHogClick(hog)}>
						<h3>{hog.name}</h3>
						<img src={hog.image} alt={hog.name} />
						<button onClick={(e) => { e.stopPropagation(); handleHideHog(hog.name); }}>
							Hide
						</button>
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
