// HogList.jsx
import React from "react";
import HogTile from "./HogTile";

function HogList({ hogs, onHogClick, onHideHog }) {
	return (
		<div className="hog-container">
			{hogs.map((hog) => (
				<HogTile key={hog.name} hog={hog} onHogClick={onHogClick} onHideHog={onHideHog} />
			))}
		</div>
	);
}

export default HogList;
