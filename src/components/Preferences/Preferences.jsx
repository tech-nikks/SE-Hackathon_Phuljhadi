import './preferences.css';

import React, { useState } from 'react';

import Button from '@mui/material/Button';

const Preferences = () => {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    // Corrected template literal syntax
    return `${year}-${month}-${day}`;
  };
  

  // State object to store form inputs
  const [preferences, setPreferences] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    dietType: "",
    mealFrequency: "",
    mealSchedule: "",
    date: getTodayDate(),
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    console.log("submit clicked");
    console.log(preferences);
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/preferences", preferences);
      console.log("Preferences Data submitted successfully:", preferences);
    } catch (error) {
      console.error("Error submitting preferences:", error);
    }
  };

  return (
    <div>
      <h2>PREFERENCES</h2>
      <form onSubmit={handleSubmit} className="container">
        <input
          type="number"
          name="age"
          value={preferences.age}
          onChange={handleChange}
          required
          className="input"
          placeholder="Age"
        />
        <br />
        <p>Gender</p>
        <select
          name="gender"
          value={preferences.gender}
          onChange={handleChange}
          required
          className="input"
          placeholder="Gender"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br />
        <input
          type="number"
          name="height"
          value={preferences.height}
          onChange={handleChange}
          required
          className="input"
          placeholder="Height (cm)"
        />
        <br />
        <input
          type="number"
          name="weight"
          value={preferences.weight}
          onChange={handleChange}
          required
          className="input"
          placeholder="Weight (kg)"
        />
        <br />
        <p>Diet type</p>
        <select
          name="dietType"
          value={preferences.dietType}
          onChange={handleChange}
          required
          className="input"
          placeholder="Diet Type"
        >
          <option value="">Select</option>
          <option value="balanced">Balanced Diet (Recommended)</option>
          <option value="low-carb">Low-Carb</option>
          <option value="low-fat">Low-Fat</option>
        </select>
        <br />
        <input
          type="number"
          name="mealFrequency"
          value={preferences.mealFrequency}
          onChange={handleChange}
          required
          className="input"
          placeholder="Number of Meals per Day"
        />
        <br />
        <p>weekly/monthly</p>
        <select
          name="mealSchedule"
          value={preferences.mealSchedule}
          onChange={handleChange}
          required
          className="input"
          placeholder="Meal Schedule"
        >
          <option value="">Select</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <br />
        <Button
  type="submit"
  variant="contained"
  color="primary"
  // Corrected onClick handler
  onClick={handleSubmit}
>
  Submit
</Button>

      </form>
    </div>
  );
};

export default Preferences;