import React, { useEffect, useState } from "react";
import estimatedResults from "./EstimatedResults.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import StepFooter from "../../components/StepFooter/StepFooter";
import { useCalculationStorage } from "../../context/StorageContext";
import Comparison from "../../components/Comparison/Comparison"
const EstimatedResults = () => {
  const navigate = useNavigate();

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
    handleEdit,handleDelete
  } = useCalculationStorage();

  // useEffect(() => {
  //   setIndex(originalIndex);
  //   setOriginalIndex(null);
  // }, []);

  const numberToArray = (index) => {
    return Array.from({ length: index + 1 }, (_, i) => i);
  };

  const tableArray = numberToArray(index);
  const handleRedirect = () => {
    navigate("/");
  };

  // const handleEdit = (index) => {
  //   setOriginalIndex(index);
  //   setIndex(index);
  //   navigate("/");
  // };

  console.log(tableArray);
  return (
    <div className="estimated-results">
      <div className="headerContainer">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/16a0bf8ee9915a3c1274ab46ee5f5cd31e6b2e149ae5785312a1e6ed4b606161?apiKey=f95b5ca361ef4526b1cb461f7b2405ea&"
          className="logoImage"
        />
      </div>
      <div className="results-section">
        <div className="section-container">
          <div className="left-subSection">
            <div className="breadcrumb">
              <span className="breadcrumb-item">WealthPort</span>
              <span className="breadcrumb-separator">{">"}</span>
              <span className="breadcrumb-item" onClick={handleRedirect}>
                WealthPort Calculator
              </span>
              <span className="breadcrumb-separator">{">"}</span>
              <span className="breadcrumb-item active">Estimated Results</span>
            </div>
            <div className="heading-section">
              <p>Estimated Results</p>
              <div className="heading-buttons">
                <Button
                  text={"Create New Estimate"}
                  configuresStyles={"result-button"}
                ></Button>
                <Button
                  text={"View Comparison"}
                  configuresStyles={"result-button"}
                ></Button>
              </div>
            </div>
            {tableArray.map((table, index) => (
              <div key={table} className="investment-container">
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
                <div className="fee-details">
                  <div className="left-section-heading">
                    <div className="section-title">
                      Financial Professional Payout
                    </div>
                    <div className="section-title-icons">
                      <span className="section-title icons">Rate (%)</span>
                      <span className="section-title icons">Price ($)</span>
                    </div>
                  </div>

                  <div className="results-divider sub"></div>
                  <div className="row">
                    <div className="label">Financial Professional Fee</div>
                    <div className="value-container">
                      <div className="value">
                        {fpValues[index]?.rate || "N/A"}
                      </div>
                      <div className="value">
                        {fpValues[index]?.price || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="results-divider"></div>
                  <div className="row">
                    <div className="label">Program Fee</div>
                    <div className="value-container">
                      <div className="value">
                        {programFeeValues[index]?.rate || "N/A"}
                      </div>
                      <div className="value">
                        {programFeeValues[index]?.price || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="results-divider"></div>
                  <div className="row">
                    <div className="label">Strategist Fee (if applicable)</div>
                    <div className="value-container">
                      <div className="value">
                        {strategistFeeValues[index]?.rate || "N/A"}
                      </div>
                      <div className="value">
                        {strategistFeeValues[index]?.price || "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="results-divider"></div>
                  <div className="row">
                    <div className="label">Total Account Fee (annualized)</div>
                    <div className="value-container">
                      <div className="value">
                        {totalAccountFeeValues[index]?.rate || "N/A"}
                      </div>
                      <div className="value">
                        {totalAccountFeeValues[index]?.price || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="results-divider"></div>
                  <div className="row">
                    <div className="label">
                      Total Client Fees (including Fund Expenses)
                    </div>
                    <div className="value-container">
                      <div className="value">
                        {totalClientFeeValues[index]?.rate || "N/A"}
                      </div>
                      <div className="value">
                        {totalClientFeeValues[index]?.price || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="results-divider"></div>
                  <div className="row">
                    <div className="label">
                      Gross Annual Fee to Financial Professional
                    </div>
                    <div className="value-container">
                      <div className="value">
                        {" "}
                        {grossAnnualFeeValues[index]?.rate || "N/A"}
                      </div>
                      <div className="value">
                        {" "}
                        {grossAnnualFeeValues[index]?.price || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="results-divider"></div>
                  <div className="row">
                    <div className="label">
                      Net Annual Fee to Financial Professional
                    </div>
                    <div className="value-container">
                      <div className="value">
                        {netAnnualFeeValues[index]?.rate || "N/A"}
                      </div>
                      <div className="value">
                        {netAnnualFeeValues[index]?.price || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="results-divider"></div>
                  <div className="row">
                    <div className="label">Account Value</div>
                    <div className="value-container">
                      <div className="value">
                        {accountValue[index]?.rate || "N/A"}
                      </div>
                      <div className="value">
                        {accountValue[index]?.price || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="results-divider"></div>
                  <div className="row">
                    <div className="label">Fund Expenses</div>
                    <div className="value-container">
                      <div className="value">
                        {fundExpenses[index]?.rate || "N/A"}
                      </div>
                      <div className="value">N/A</div>
                    </div>
                  </div>
                  <div className="results-divider"></div>
                  <div className="row">
                    <div className="label">Financial Professional Payout</div>
                    <div className="value-container">
                      <div className="value">
                        {fpPayout[index]?.rate || "N/A"}
                      </div>
                      <div className="value">N/A</div>
                    </div>
                  </div>
                  <div className="results-divider"></div>
                  <div className="row">
                    <div className="label">Household Value</div>
                    <div className="value-container">
                      <div className="value">
                        {houseHoldValue[index]?.rate || "N/A"}
                      </div>
                      <div className="value">N/A</div>
                    </div>
                  </div>
                  <div className="results-divider"></div>
                  <div className="row">
                    <div className="label">Fee Type</div>
                    <div className="value-container types">
                      <div className="value">{feeType || "N/A"}</div>
                    </div>
                  </div>
                  <div className="results-divider"></div>
                  <div className="row">
                    <div className="label">Program Fee</div>
                    <div className="value-container types">
                      <div className="value">{programFee || "N/A"}</div>
                    </div>
                  </div>
                  <div className="results-divider"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="right-sub-section">
            <div className="sub-section">
              <p className="get-started-heading">Ready to get started?</p>
              <p className="get-started-paragraph">
                WealthPort gives the financial professional the ability to serve
                their clients according to their unique business model while
                choosing from, and using, multiple management styles based on
                their investing clients preference. WealthPort also provides a
                suite of technology solutions to support these choices.
              </p>
              <p className="get-started-paragraph tail-end">
                Questions? Contact the Advisory Solutions Team
                (mailto:advisory.solutions@cir2.com) at 800-777-6080.
              </p>

              <button className="get-started-button">Contact Us</button>
            </div>
          </div>
        </div>
        <div className="bottom-section">
          <Comparison />
        </div>
      </div>
      <StepFooter from={"estimated-results"}></StepFooter>
    </div>
  );
};

export default EstimatedResults;
