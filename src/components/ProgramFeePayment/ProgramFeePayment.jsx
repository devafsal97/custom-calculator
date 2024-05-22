import React, { useState } from 'react';

const ProgramFeePayment = ({handleChange}) => {
  // State for the selected payment option
  const [paymentOption, setPaymentOption] = useState("");

  // Handle the change of radio button selection
  const handlePaymentChange = (event) => {
    setPaymentOption(event.target.value);
    handleChange(event);
  };

  return (
    <div className="program-fee-container">
      <div className="header-title">Program Fee Payment</div>
      <div className="subheader-title">Select who pays program fee</div>
      <div className="options-container">
        <label className="option-client">
          <input
            type="radio"
            name="programOption"
            value="client"
            checked={paymentOption === "client"}
            onChange={handlePaymentChange}
            className="radio-input"
          />
          <div className="option-text">Paid by Client</div>
        </label>
        <label className="option-fp">
          <input
            type="radio"
            name="programOption"
            value="fp"
            checked={paymentOption === "fp"}
            onChange={handlePaymentChange}
            className="radio-input"
          />
          <div className="option-text">Paid by FP</div>
        </label>
      </div>
    </div>
  );
};

export default ProgramFeePayment;
