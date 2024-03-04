import React, { useState } from "react";
import TextField from "../../../components/textfield/TextField";

const TeamDirected = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    // Extract numbers from input and remove any non-numeric characters except the final '%'
    let inputValue = event.target.value.replace(/[^\d]/g, "");
    if (inputValue) {
      inputValue += "%"; // Append '%' if there's any number
    }
    setValue(inputValue);
  };

  const handleBlur = () => {
    // Ensure '%' is removed if the input is empty on blur
    if (value === "%") {
      setValue("");
    }
  };

  // A method to simulate the intended behavior without directly manipulating the DOM
  const displayValue =
    value.endsWith("%") && value.length > 1 ? value : value.replace("%", "");

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
