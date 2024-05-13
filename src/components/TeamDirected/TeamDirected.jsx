import React from 'react';
const TeamDirected = () => {
  return (


    <div className="fee-container">
    <div className="header-title">Strategist Fee</div>
    <div className="fee-type">Team-directed</div>
    <div className="fee-info">Maximum Team-directed fee is 3%</div>
    <div className="fee-input-label">Enter Flat Fee (%)</div>
      <input type="number" placeholder="%" className="scenario-input" />
  </div>
  );
};

export default TeamDirected;
