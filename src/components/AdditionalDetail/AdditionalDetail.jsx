import React, { useState } from "react";
import "./AdditionalDetail.css";

const AdditionalDetail = ({
  handleChange,
  getCalculationDataValue,
  setCalculationData,
  calculationData,
}) => {
  // State for the WealthPort AUA discount selection
  const [selectedDiscount, setSelectedDiscount] = useState(
    getCalculationDataValue("AdditionalDetails")?.auaDiscount || "0%"
  );
  const [fundExpenses, setFundExpenses] = useState(
    getCalculationDataValue("AdditionalDetails")?.fundExpenses
  );
  const [fpPayOut, setFpPayOut] = useState(
    getCalculationDataValue("AdditionalDetails")?.fpPayOut
  );
  const [houseHoldValue, setHouseHoldValue] = useState(
    getCalculationDataValue("AdditionalDetails")?.houseHoldValue || ''
  );

  const handleDiscountChange = (event) => {
    const { name, value } = event.target;
    // Temporary variables to hold the updated values
    let updatedSelectedDiscount = selectedDiscount;
    let updatedFundExpenses = fundExpenses;
    let updatedFpPayOut = fpPayOut;
    let updatedHouseHoldValue = houseHoldValue;

    // Update the temporary variables based on the input change
    if (name === "auaDiscount") {
      updatedSelectedDiscount = value;
      setSelectedDiscount(value);
    } else if (name === "fundExpenses") {
      updatedFundExpenses = value;
      setFundExpenses(value);
    } else if (name === "fpPayOut") {
      updatedFpPayOut = value;
      setFpPayOut(value);
    } else if (name === "houseHoldValue") {
      updatedHouseHoldValue = value;
      setHouseHoldValue(value);
    }

    // Create and send custom event object with the updated values
    const eventObject = {
      target: {
        name: "AdditionalDetails",
        value: {
          fundExpenses: updatedFundExpenses,
          fpPayOut: updatedFpPayOut,
          auaDiscount: updatedSelectedDiscount,
          houseHoldValue: updatedHouseHoldValue,
        },
      },
    };
    handleChange(eventObject);
  };

  return (
    <div className="additional-detail-container">
      <div className="header">Additional Detail (Optional)</div>
      <div className="description">
        Enter additional details to help capture all fees and discounts that may
        apply to the client account in this illustration.
      </div>
      <div className="section">
        <div className="subsection">
          <div className="subsection-header">Fund Expenses</div>
          <div className="input-group">
            <input
              onChange={handleDiscountChange}
              name="fundExpenses"
              type="number"
              placeholder="%"
              className="input-field"
              value={fundExpenses}
            />
          </div>
        </div>
        <div className="subsection">
          <div className="subsection-header">Financial Professional Payout</div>
          <div className="input-group">
            <input
              onChange={handleDiscountChange}
              name="fpPayOut"
              type="number"
              placeholder="%"
              className="input-field"
              value={fpPayOut}
            />
          </div>
        </div>
      </div>
      <div className="subsection household">
        <div className="subsection-header">Household Value</div>
        <div className="input-group">
          <input
            onChange={handleDiscountChange}
            name="houseHoldValue"
            type="number"
            placeholder="$"
            className="input-field"
            value={houseHoldValue}
          />
        </div>
      </div>
      <div className="title">WealthPort AUA Discount</div>
      <div className="sub-description">
        Enter WealthPort AUA Discount (if applicable)
      </div>
      <div className="discounts">
        {["0%", "10%", "15%", "20%", "25%"].map((discount) => (
          <label key={discount} className="discount-item">
            <input
              type="radio"
              name="auaDiscount"
              value={discount}
              checked={selectedDiscount === discount}
              onChange={handleDiscountChange}
              className="discount-radio"
            />
            <span className="discount-value">{discount}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AdditionalDetail;
