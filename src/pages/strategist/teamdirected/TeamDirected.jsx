import React, { useState } from "react";
import TextField from "../../../components/textfield/TextField";
import { useAppContext } from "../../../context/AppContext";

const TeamDirected = () => {
  const { teamDirectedValue, setTeamDirectedValue } = useAppContext();
  const handleChange = (event) => {
    // Extract numbers from input and remove any non-numeric characters except the final '%'
    let inputValue = event.target.value.replace(/[^\d]/g, "");
    if (inputValue) {
      inputValue += "%"; // Append '%' if there's any number
    }
    setTeamDirectedValue(inputValue);
  };

  const handleBlur = () => {
    // Ensure '%' is removed if the input is empty on blur
    if (teamDirectedValue === "%") {
      setTeamDirectedValue("");
    }
  };

  // A method to simulate the intended behavior without directly manipulating the DOM
  const displayValue =
    teamDirectedValue.endsWith("%") && teamDirectedValue.length > 1
      ? teamDirectedValue
      : teamDirectedValue.replace("%", "");

  return (
    <div>
      <h3 style={{ margin: "0px" }}>Team-directed</h3>
      <p style={{ margin: "0px" }}>Maximum Team-directed fee is 3%</p>
      <div style={{ marginTop: "10px" }}>
        <TextField
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={displayValue}
        ></TextField>
      </div>
    </div>
  );
};

export default TeamDirected;
