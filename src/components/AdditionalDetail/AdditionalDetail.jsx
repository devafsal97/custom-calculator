import React, { useState } from 'react';
import './AdditionalDetail.css';

const AdditionalDetail = () => {
  // State for the WealthPort AUA discount selection
  const [selectedDiscount, setSelectedDiscount] = useState('0%');

  const handleDiscountChange = (event) => {
    setSelectedDiscount(event.target.value);
  };

  return (
    <div className="additional-detail-container">
      <div className="header">Additional Detail (Optional)</div>
      <div className="description">
        Enter additional details to help capture all fees and discounts that may apply to the client account in this illustration.
      </div>
      <div className="section">
        <div className="subsection">
          <div className="subsection-header">Fund Expenses</div>
          <div className="input-group">
            <input type="number" placeholder="%" className="input-field" />
          </div>
        </div>
        <div className="subsection">
          <div className="subsection-header">Financial Professional Payout</div>
          <div className="input-group">
            <input type="number" placeholder="%" className="input-field" />
          </div>
        </div>
      </div>
      <div className="title">WealthPort AUA Discount</div>
      <div className="sub-description">Enter WealthPort AUA Discount (if applicable)</div>
      <div className="discounts">
        {['0%', '10%', '15%', '20%', '25%'].map((discount) => (
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
