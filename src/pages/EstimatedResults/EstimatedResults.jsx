import React from "react";
import estimatedResults from "./EstimatedResults.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import StepFooter from "../../components/StepFooter/StepFooter";
import { useCalculationStorage } from "../../context/StorageContext";
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
    setRender,
    render,
    getCalculationDataValue,
  } = useCalculationStorage();
  const handleRedirect = () => {
    navigate("/");
  };
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
          <div className="investment-container">
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
                  text={"Edit"}
                  configuresStyles={"result-button action-button"}
                ></Button>
                <Button
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
                  <div className="value">{fpValues.rate || "N/A"}</div>
                  <div className="value">{fpValues.price || "N/A"}</div>
                </div>
              </div>
              <div className="results-divider"></div>
              <div className="row">
                <div className="label">Program Fee</div>
                <div className="value-container">
                  <div className="value">{programFeeValues.rate || "N/A"}</div>
                  <div className="value">{programFeeValues.price || "N/A"}</div>
                </div>
              </div>
              <div className="results-divider"></div>
              <div className="row">
                <div className="label">Strategist Fee (if applicable)</div>
                <div className="value-container">
                  <div className="value">
                    {strategistFeeValues.rate || "N/A"}
                  </div>
                  <div className="value">
                    {strategistFeeValues.price || "N/A"}
                  </div>
                </div>
              </div>

              <div className="results-divider"></div>
              <div className="row">
                <div className="label">Total Account Fee (annualized)</div>
                <div className="value-container">
                  <div className="value">
                    {totalAccountFeeValues.rate || "N/A"}
                  </div>
                  <div className="value">
                    {totalAccountFeeValues.price || "N/A"}
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
                    {totalClientFeeValues.rate || "N/A"}
                  </div>
                  <div className="value">
                    {totalClientFeeValues.price || "N/A"}
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
                    {grossAnnualFeeValues.rate || "N/A"}
                  </div>
                  <div className="value">
                    {" "}
                    {grossAnnualFeeValues.price || "N/A"}
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
                    {netAnnualFeeValues.rate || "N/A"}
                  </div>
                  <div className="value">
                    {netAnnualFeeValues.price || "N/A"}
                  </div>
                </div>
              </div>
              <div className="results-divider"></div>
              <div className="row">
                <div className="label">Account Value</div>
                <div className="value-container">
                  <div className="value">{accountValue.rate || "N/A"}</div>
                  <div className="value">{accountValue.price || "N/A"}</div>
                </div>
              </div>
              <div className="results-divider"></div>
              <div className="row">
                <div className="label">Fund Expenses</div>
                <div className="value-container">
                  <div className="value">{fundExpenses.rate || "N/A"}</div>
                  <div className="value">N/A</div>
                </div>
              </div>
              <div className="results-divider"></div>
              <div className="row">
                <div className="label">Financial Professional Payout</div>
                <div className="value-container">
                  <div className="value">{fpPayout.rate || "N/A"}</div>
                  <div className="value">N/A</div>
                </div>
              </div>
              <div className="results-divider"></div>
              <div className="row">
                <div className="label">Household Value</div>
                <div className="value-container">
                  <div className="value">{houseHoldValue.rate || "N/A"}</div>
                  <div className="value">N/A</div>
                </div>
              </div>
              <div className="results-divider"></div>
              <div className="row">
                <div className="label">Fee Type</div>
                <div className="value-container">
                  <div className="value">{feeType || "N/A"}</div>
                </div>
              </div>
              <div className="results-divider"></div>
              <div className="row">
                <div className="label">Program Fee</div>
                <div className="value-container">
                  <div className="value">{programFee || "N/A"}</div>
                </div>
              </div>
              <div className="results-divider"></div>
            </div>
          </div>
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
              (advisory.solutions@cir2.com) at 800-777-6080.
            </p>

            <button className="get-started-button">Contact Us</button>
          </div>
        </div>
      </div>
      <StepFooter
        from={"estimated-results"}
        setRender={setRender}
        render={render}
      ></StepFooter>
    </div>
  );
};

export default EstimatedResults;
