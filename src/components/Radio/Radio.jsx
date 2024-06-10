import React from "react";
import "./Radio.css";

const CustomRadioInput = ({ selectedValue, value, onchange, name }) => {    
  const handleClick = () => {
    onchange({ target: { name, value } });
  };

  return (
    <div className={`radio ${selectedValue === value ? 'checked' : ''}`} onClick={handleClick}>
      <div className="radio-button"></div>
    </div>
  );
};

export default CustomRadioInput;
