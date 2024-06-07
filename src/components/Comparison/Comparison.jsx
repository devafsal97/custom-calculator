import React from "react";
import { useCalculationStorage } from "../../context/StorageContext";
import comparison from "./comparison.css";
import Button from "../../components/button/Button";

const Comparison = () => {
  const {
    fpValues,
    accountValue,
    fundExpenses,
    fpPayout,
    houseHoldValue,
    feeType,
    programFee,
    programFeeValues,
    strategistFeeValues,
    totalAccountFeeValues,
    totalClientFeeValues,
    grossAnnualFeeValues,
    netAnnualFeeValues,
    getCalculationDataValue,
    index,
    setIndex,
    originalIndex,
    setOriginalIndex,
    handleEdit,
    handleDelete,
    calculationData,
  } = useCalculationStorage();
  console.log(calculationData["paymentOption"],"sdfsdf",calculationData["FPfeeType"]);
  return (
    <div className="main-container">
      <div>
        <div className="header">
          <div className="title-block">
            <h1>
              {getCalculationDataValue("scenario-name") ||
                "Investment Account Fee Estimate 1"}
            </h1>
            <p>As of Date: 01-21-2024</p>
          </div>
          <div className="actions">
            <Button
              onClick={() => handleEdit(index)}
              text={"Edit"}
              configuresStyles={"result-button action-button"}
            ></Button>
            <Button
              onClick={() => handleDelete(index)}
              text={"Delete"}
              configuresStyles={"result-button action-button"}
            ></Button>
            <Button
              text={"Share"}
              configuresStyles={"result-button action-button"}
            ></Button>
            <Button
              text={"Export ▼"}
              configuresStyles={"result-button action-button"}
            ></Button>
          </div>
        </div>
        <div className="table-wrapper">
          <div className="field-container rate-doller">
            <div className="field-name"></div>
            <div className="header-labels">
              <div className="header-label">Rate (%)</div>
              <div className="header-label">Price ($)</div>
              <div className="header-label">Rate (%)</div>
              <div className="header-label">Price ($)</div>
              <div className="header-label">Rate (%)</div>
              <div className="header-label">Price ($)</div>
            </div>
          </div>
          <div className="field-container black-section">
            <div className="field-name">
              Fee Details and Scenario Assumptions
            </div>
            {calculationData["scenario-name"] &&
              calculationData["scenario-name"].map((data, index) => {
                return (
                  <div key={index} className="header-labels">
                    <div className="header-label three-column">
                      {data[0] || "Scenario 1"}
                    </div>
                    <div className="header-label three-column">
                      {data[1] || "Scenario 2"}
                    </div>
                    <div className="header-label three-column">
                      {data[2] || "Scenario 3"}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="field-container">
            <div className="field-name">Account Value</div>
            {calculationData["account-value"] &&
              calculationData["account-value"].map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="header-label three-column">
                    {data[0] ? `$${data[0]}` : "N/A"}
                  </div>
                  <div className="header-label three-column">
                    {data[1] ? `$${data[0]}` : "N/A"}
                  </div>
                  <div className="header-label three-column">
                    {data[2] ? `$${data[0]}` : "N/A"}
                  </div>
                </div>
              ))}
          </div>
          <div className="field-container">
            <div className="field-name">
              Financial Professional Fee
              <span>
                Amount charged by your Financial Professional for investment
                advisory services
              </span>
            </div>
            {fpValues &&
              fpValues.map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="input-values">
                    {data[0]?.rate ? `%${data[0].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[0].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[1]?.rate ? `%${data[1].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[1].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[2]?.rate ? `%${data[2].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[3].price}` : "N/A"}
                  </div>
                </div>
              ))}
          </div>

          <div className="field-container">
            <div className="field-name">
              Program Fee
              <span>
                Covers operating and administrative costs associated with
                investment program
              </span>
            </div>
            {programFeeValues &&
              programFeeValues.map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="input-values">
                    {data[0]?.rate ? `%${data[0].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[0].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[1]?.rate ? `%${data[1].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[1].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[2]?.rate ? `%${data[2].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[3].price}` : "N/A"}
                  </div>
                </div>
              ))}
          </div>
          <div className="field-container">
            <div className="field-name">
              Strategist Fee (if applicable)
              <span>
                A fee that may be charged by the Strategist for asset allocation
              </span>
            </div>
            {strategistFeeValues &&
              strategistFeeValues.map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="input-values">
                    {data[0]?.rate ? `%${data[0].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[0].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[1]?.rate ? `%${data[1].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[1].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[2]?.rate ? `%${data[2].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[3].price}` : "N/A"}
                  </div>
                </div>
              ))}
          </div>
          <div className="field-container">
            <div className="field-name">
              Total Account Fee (annualized)
              <span>
                A fee that may be charged by the Strategist for asset allocation
              </span>
            </div>
            {fpValues &&
              fpValues.map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="input-values">
                    {data[0]?.rate ? `%${data[0].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[0].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[1]?.rate ? `%${data[1].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[1].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[2]?.rate ? `%${data[2].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[3].price}` : "N/A"}
                  </div>
                </div>
              ))}
          </div>
          <div className="field-container">
            <div className="field-name">
              Total Account Fee (annualized)
              <span>
                A fee that may be charged by the Strategist for asset allocation
              </span>
            </div>
            {totalAccountFeeValues &&
              totalAccountFeeValues.map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="input-values">
                    {data[0]?.rate ? `%${data[0].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[0].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[1]?.rate ? `%${data[1].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[1].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[2]?.rate ? `%${data[2].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[3].price}` : "N/A"}
                  </div>
                </div>
              ))}
          </div>
          <div className="field-container">
            <div className="field-name">
              Fund Expenses**
              <span>
                Annual sum of the Financial Professional Fee, Program Fee, and
                Strategist Fee debited from your account
              </span>
            </div>
            {fundExpenses &&
              fundExpenses.map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="input-values">
                    {data[0]?.rate ? `%${data[0].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[0].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[1]?.rate ? `%${data[1].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[1].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[2]?.rate ? `%${data[2].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[3].price}` : "N/A"}
                  </div>
                </div>
              ))}
          </div>
          <div className="field-container">
            <div className="field-name">
              Total Client Fees (including Fund Expenses)
              <span></span>
            </div>
            {totalClientFeeValues &&
              totalClientFeeValues.map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="input-values">
                    {data[0]?.rate ? `%${data[0].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[0].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[1]?.rate ? `%${data[1].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[1].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[2]?.rate ? `%${data[2].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[3].price}` : "N/A"}
                  </div>
                </div>
              ))}
          </div>
          <div className="field-container">
            <div className="field-name">
              Gross Annual Fee to Financial Professional
              <span></span>
            </div>
            {grossAnnualFeeValues &&
              grossAnnualFeeValues.map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="input-values">
                    {data[0]?.rate ? `%${data[0].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[0].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[1]?.rate ? `%${data[1].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[1].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[2]?.rate ? `%${data[2].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[3].price}` : "N/A"}
                  </div>
                </div>
              ))}
          </div>
          <div className="field-container">
            <div className="field-name">
              Fund Expenses
              <span></span>
            </div>
            {fundExpenses &&
              fundExpenses.map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="input-values">
                    {data[0]?.rate ? `%${data[0].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[0].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[1]?.rate ? `%${data[1].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[1].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[2]?.rate ? `%${data[2].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[3].price}` : "N/A"}
                  </div>
                </div>
              ))}
          </div>

          <div className="field-container">
            <div className="field-name">
              Household Value
              <span></span>
            </div>
            {houseHoldValue &&
              houseHoldValue.map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="input-values">
                    {data[0]?.rate ? `%${data[0].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[0]?.price ? `%${data[0].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[1]?.rate ? `%${data[1].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[1]?.price ? `%${data[1].price}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[2]?.rate ? `%${data[2].rate}` : "N/A"}
                  </div>
                  <div className="input-values">
                    {data[2]?.price ? `%${data[2].price}` : "N/A"}
                  </div>
                </div>
              ))}
          </div>
          <div className="field-container">
            <div className="field-name">Financial Professional Fee Type</div>
            {calculationData["FPfeeType"] &&
              calculationData["FPfeeType"].map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="header-label three-column">
                    {data[0] ? `$${data[0]}` : "N/A"}
                  </div>
                  <div className="header-label three-column">
                    {data[1] ? `$${data[0]}` : "N/A"}
                  </div>
                  <div className="header-label three-column">
                    {data[2] ? `$${data[0]}` : "N/A"}
                  </div>
                </div>
              ))}
          </div>
          {/* <div className="field-container">
            <div className="field-name">Program Selected</div>
            {calculationData["paymentOption"] &&
              calculationData["paymentOption"].map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="header-label three-column">
                    {data[0] ? `$${data[0]}` : "N/A"}
                  </div>
                  <div className="header-label three-column">
                    {data ? `$${data}` : "N/A"}
                  </div>
                  <div className="header-label three-column">
                    {data ? `$${data}` : "N/A"}
                  </div>
                </div>
              ))}
          </div> */}
<div className="field-container">
  <div className="field-name">Program Selected</div>
  {calculationData["paymentOption"] && calculationData["paymentOption"].map((data, index) => (
    <div key={index} className="header-labels">
      <div className="header-label three-column">
        {calculationData["paymentOption"][0] ? `$${calculationData["paymentOption"][0]}` : "N/A"}
      </div>
      <div className="header-label three-column">
        {calculationData["paymentOption"][1] ? `$${calculationData["paymentOption"][1]}` : "N/A"}
      </div>
      <div className="header-label three-column">
        {calculationData["paymentOption"][2] ? `$${calculationData["paymentOption"][2]}` : "N/A"}
      </div>
    </div>
  ))}
</div>

          <div className="field-container">
            <div className="field-name">
              Financial Professional AUA discount applied
              </div>
            {calculationData["AdditionalDetails"] &&
              calculationData["AdditionalDetails"].map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="header-label three-column">
                    {data[0]?.auaDiscount ? `$${data[0]?.auaDiscount}` : "N/A"}
                  </div>
                  <div className="header-label three-column">
                    {data[1]?.auaDiscount ? `$${data[0]?.auaDiscount}` : "N/A"}
                  </div>
                  <div className="header-label three-column">
                    {data[2]?.auaDiscount ? `$${data[0]?.auaDiscount}` : "N/A"}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
