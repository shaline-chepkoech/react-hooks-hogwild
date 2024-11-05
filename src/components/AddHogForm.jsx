
import React, { useState } from "react";

function AddHogForm({ onAddHog }) {
  // Local state to manage new hog inputs
  const [newHog, setNewHog] = useState({
    name: "",
    specialty: "",
    weight: "",
    greased: false,
    image: "",
    "highest medal achieved": ""
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewHog((prevHog) => ({
      ...prevHog,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the passed onAddHog function with new hog data
    onAddHog(newHog);
    // Reset the form
    setNewHog({
      name: "",
      specialty: "",
      weight: "",
      greased: false,
      image: "",
      "highest medal achieved": ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-hog-form">
      <h2>Add a New Hog</h2>
      <input type="text" name="name" placeholder="Name" value={newHog.name} onChange={handleInputChange} required />
      <input type="text" name="specialty" placeholder="Specialty" value={newHog.specialty} onChange={handleInputChange} required />
      <input type="number" name="weight" placeholder="Weight" value={newHog.weight} onChange={handleInputChange} required />
      <label>
        Greased:
        <input type="checkbox" name="greased" checked={newHog.greased} onChange={handleInputChange} />
      </label>
      <input type="text" name="image" placeholder="Image URL" value={newHog.image} onChange={handleInputChange} required />
      <input type="text" name="highest medal achieved" placeholder="Highest Medal Achieved" value={newHog["highest medal achieved"]} onChange={handleInputChange} required />
      <button type="submit">Add Hog</button>
    </form>
  );
}

export default AddHogForm;

