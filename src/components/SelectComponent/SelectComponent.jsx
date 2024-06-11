import React from 'react';

const SelectComponent = ({ options, selectedValue, onChange }) => {
  return (
    <select  value={selectedValue} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
//     <option key={option.key} value={option.key}>
          //       {option.key}
          //     </option>
export default SelectComponent;
