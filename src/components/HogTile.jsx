// HogTile.jsx
import React from "react";

function HogTile({ hog, onHogClick, onHideHog }) {
	return (
		<div className="hog-tile" onClick={() => onHogClick(hog)}>
			<h3>{hog.name}</h3>
			<img src={hog.image} alt={hog.name} />
			<button onClick={(e) => { e.stopPropagation(); onHideHog(hog.name); }}>Hide</button>
		</div>
	);
}

export default HogTile;
