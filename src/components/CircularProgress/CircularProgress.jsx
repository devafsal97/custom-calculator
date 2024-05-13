import React from 'react';

const CircularProgress = ({ percentage }) => {
  const strokeWidth = 10;
  const radius = 50;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const circleStyle = {
    transition: 'stroke-dashoffset 0.35s',
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%',
  };

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className='circular-progress'
    >
      <circle
        stroke="#d3d3d3" // Background circle color
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#007bff" // Progress circle color
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        style={circleStyle}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="24px"
        fill="#333"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

export default CircularProgress;
