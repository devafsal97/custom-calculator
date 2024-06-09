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
  const renderValue = (value) => {
    if (value)
      return (
        value !== undefined && value !== null && value !== "" && value !== "N/A"
      );
  };
  return (
    <div className="main-container">
      <div>
        <div className="header">
          <div className="title-block">
            <h1>
              {/* {getCalculationDataValue("scenario-name") ||
                "Investment Account Fee Estimate 1"} */}
              Investment Account Fee Estimate
            </h1>
            <p>
              As of Date:{" "}
              {getCalculationDataValue("currentDate")[index]
                ? getCalculationDataValue("currentDate")[index]
                : ""}
            </p>
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
            {/* <div className="header-labels">
              <div className="header-label">Rate (%)</div>
              <div className="header-label">Price ($)</div>
              <div className="header-label">Rate (%)</div>
              <div className="header-label">Price ($)</div>
              <div className="header-label">Rate (%)</div>
              <div className="header-label">Price ($)</div>
            </div> */}
            {calculationData["scenario-name"] &&
              calculationData["scenario-name"].map((scenario, index) =>
                calculationData["scenario-name"][index] !== "" ? (
                  <div key={index} className="header-labels">
                    <div className="header-label">Rate (%)</div>
                    <div className="header-label">Price ($)</div>
                  </div>
                ) : null
              )}
          </div>
          <div className="field-container black-section">
            <div className="field-name">
              Fee Details and Scenario Assumptions
            </div>

            <div key={index} className="header-labels">
              {/* <div className="header-label three-column">
                {renderValue(calculationData["scenario-name"][0])
                  ? calculationData["scenario-name"][0]
                  : "Scenario 1"}
              </div>
              <div className="header-label three-column">
                {renderValue(calculationData["scenario-name"][1])
                  ? calculationData["scenario-name"][1]
                  : "Scenario 1"}
              </div>
              <div className="header-label three-column">
                {renderValue(calculationData["scenario-name"][2])
                  ? calculationData["scenario-name"][0]
                  : "Scenario 1"}
              </div> */}
              {calculationData["scenario-name"] &&
                calculationData["scenario-name"].map((name, idx) =>
                  renderValue(calculationData["scenario-name"][idx]) ? (
                    <div key={idx} className="header-label three-column">
                      {calculationData["scenario-name"][idx]}
                    </div>
                  ) : null
                )}
            </div>
          </div>
          <div className="field-container">
            <div className="field-name">Account Value</div>

            <div key={index} className="header-labels">
              {calculationData["account-value"] &&
                calculationData["account-value"].map((value, idx) =>
                  renderValue(value) ? (
                    <div key={idx} className="header-label three-column">
                      {`$${value}`}
                    </div>
                  ) : null
                )}

              {/* <div className="header-label three-column">
                {renderValue(calculationData["account-value"][0])
                  ? `$${calculationData["account-value"][0]}`
                  : "N/A"}
              </div>
              <div className="header-label three-column">
                {renderValue(calculationData["account-value"][1])
                  ? `$${calculationData["account-value"][1]}`
                  : "N/A"}
              </div> */}
              {/* <div className="header-label three-column">
                {renderValue(calculationData["account-value"][2])
                  ? `$${calculationData["account-value"][2]}`
                  : "N/A"}
              </div> */}
            </div>
          </div>
          <div className="field-container">
            <div className="field-name">
              Financial Professional Fee
              <span>
                Amount charged by your Financial Professional for investment
                advisory services
              </span>
            </div>

            {/* <div key={index} className="header-labels">
              <div className="input-values">
                {fpValues[0]
                  ? renderValue(fpValues[0].rate)
                    ? `${fpValues[0].rate}%`
                    : "N/A"
                  : "N/A"}
              </div>
              <div className="input-values">
                {fpValues[0]
                  ? renderValue(fpValues[0].price)
                    ? `$${fpValues[0].price}`
                    : "N/A"
                  : "N/A"}
              </div>
              <div className="input-values">
                {fpValues[1]
                  ? renderValue(fpValues[1].rate)
                    ? `$${fpValues[1].rate}`
                    : "N/A"
                  : "N/A"}
              </div>
              <div className="input-values">
                {fpValues[1]
                  ? renderValue(fpValues[1].price)
                    ? `${fpValues[1].price}%`
                    : "N/A"
                  : "N/A"}
              </div>
              <div className="input-values">
                {fpValues[2]
                  ? renderValue(fpValues[2].rate)
                    ? `$${fpValues[2].rate}`
                    : "N/A"
                  : "N/A"}
              </div>
              <div className="input-values">
                {fpValues[2]
                  ? renderValue(fpValues[2].price)
                    ? `${fpValues[2].price}%`
                    : "N/A"
                  : "N/A"}
              </div>
            </div> */}
            {fpValues.length > 0 && (
              <div key={index} className="header-labels">
                {fpValues.map(
                  (value, idx) =>
                    value.rate !== "" &&
                    value.price !== "" && (
                      <React.Fragment key={idx}>
                        <div className="input-values">
                          {renderValue(value.rate) ? `$${value.rate}` : "N/A"}
                        </div>
                        <div className="input-values">
                          {renderValue(value.price) ? `${value.price}%` : "N/A"}
                        </div>
                      </React.Fragment>
                    )
                )}
              </div>
            )}
          </div>

          <div className="field-container">
            <div className="field-name">
              Program Fee
              <span>
                Covers operating and administrative costs associated with
                investment program
              </span>
            </div>
            {/* <div className="header-labels">
              <div className="input-values">
                {programFeeValues && renderValue(programFeeValues[0]?.rate)
                  ? `${programFeeValues[0].rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {programFeeValues && renderValue(programFeeValues[0]?.price)
                  ? `$${programFeeValues[0].price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {programFeeValues && renderValue(programFeeValues[1]?.rate)
                  ? `${programFeeValues[1].rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {programFeeValues && renderValue(programFeeValues[1]?.price)
                  ? `$${programFeeValues[1].price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {programFeeValues && renderValue(programFeeValues[2]?.rate)
                  ? `${programFeeValues[2].rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {programFeeValues && renderValue(programFeeValues[2]?.price)
                  ? `$${programFeeValues[2].price}`
                  : "N/A"}
              </div>
            </div> */}
            <div className="header-labels">
              {programFeeValues &&
                programFeeValues.map(
                  (value, index) =>
                    value.rate !== "" &&
                    value.price !== "" && (
                      <React.Fragment key={index}>
                        <div className="input-values">
                          {value && renderValue(value.rate)
                            ? `${value.rate}%`
                            : "N/A"}
                        </div>
                        <div className="input-values">
                          {value && renderValue(value.price)
                            ? `$${value.price}`
                            : "N/A"}
                        </div>
                      </React.Fragment>
                    )
                )}
            </div>
          </div>
          <div className="field-container">
            <div className="field-name">
              Strategist Fee (if applicable)
              <span>
                A fee that may be charged by the Strategist for asset allocation
              </span>
            </div>
            {/* <div className="header-labels">
              <div className="input-values">
                {renderValue(
                  strategistFeeValues && strategistFeeValues[0]?.rate
                )
                  ? `${strategistFeeValues[0]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  strategistFeeValues && strategistFeeValues[0]?.price
                )
                  ? `$${strategistFeeValues[0]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  strategistFeeValues && strategistFeeValues[1]?.rate
                )
                  ? `${strategistFeeValues[1]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  strategistFeeValues && strategistFeeValues[1]?.price
                )
                  ? `$${strategistFeeValues[1]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  strategistFeeValues && strategistFeeValues[2]?.rate
                )
                  ? `${strategistFeeValues[2]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  strategistFeeValues && strategistFeeValues[2]?.price
                )
                  ? `$${strategistFeeValues[2]?.price}`
                  : "N/A"}
              </div>
            </div> */}
            <div className="header-labels">
              {strategistFeeValues &&
                strategistFeeValues.map(
                  (value, index) =>
                    value.rate !== "" &&
                    value.price !== "" && (
                      <React.Fragment key={index}>
                        <div className="input-values">
                          {value && renderValue(value.rate)
                            ? `${value.rate}%`
                            : "N/A"}
                        </div>
                        <div className="input-values">
                          {value && renderValue(value.price)
                            ? `$${value.price}`
                            : "N/A"}
                        </div>
                      </React.Fragment>
                    )
                )}
            </div>
          </div>

          <div className="field-container">
            <div className="field-name">
              Total Account Fee (annualized)
              <span>
                A fee that may be charged by the Strategist for asset allocation
              </span>
            </div>
            {/* <div className="header-labels">
              <div className="input-values">
                {renderValue(
                  totalAccountFeeValues && totalAccountFeeValues[0]?.rate
                )
                  ? `${totalAccountFeeValues[0]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  totalAccountFeeValues && totalAccountFeeValues[0]?.price
                )
                  ? `$${totalAccountFeeValues[0]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  totalAccountFeeValues && totalAccountFeeValues[1]?.rate
                )
                  ? `${totalAccountFeeValues[1]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  totalAccountFeeValues && totalAccountFeeValues[1]?.price
                )
                  ? `$${totalAccountFeeValues[1]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  totalAccountFeeValues && totalAccountFeeValues[2]?.rate
                )
                  ? `${totalAccountFeeValues[2]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  totalAccountFeeValues && totalAccountFeeValues[2]?.price
                )
                  ? `$${totalAccountFeeValues[2]?.price}`
                  : "N/A"}
              </div>
            </div> */}
            <div className="header-labels">
              {totalAccountFeeValues &&
                totalAccountFeeValues.map(
                  (value, index) =>
                    value?.rate !== "" &&
                    value?.price !== "" && (
                      <React.Fragment key={index}>
                        <div className="input-values">
                          {renderValue(value?.rate) ? `${value?.rate}%` : "N/A"}
                        </div>
                        <div className="input-values">
                          {renderValue(value?.price)
                            ? `$${value?.price}`
                            : "N/A"}
                        </div>
                      </React.Fragment>
                    )
                )}
            </div>
          </div>
          <div className="field-container">
            <div className="field-name">
              Fund Expenses**
              <span>
                Annual sum of the Financial Professional Fee, Program Fee, and
                Strategist Fee debited from your account
              </span>
            </div>
            {/* <div className="header-labels">
              <div className="input-values">
                {renderValue(fundExpenses && fundExpenses[0]?.rate)
                  ? `${fundExpenses[0]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(fundExpenses && fundExpenses[0]?.price)
                  ? `$${fundExpenses[0]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(fundExpenses && fundExpenses[1]?.rate)
                  ? `${fundExpenses[1]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(fundExpenses && fundExpenses[1]?.price)
                  ? `$${fundExpenses[1]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(fundExpenses && fundExpenses[2]?.rate)
                  ? `${fundExpenses[2]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(fundExpenses && fundExpenses[2]?.price)
                  ? `$${fundExpenses[2]?.price}`
                  : "N/A"}
              </div>
            </div> */}
            <div className="header-labels">
              {fundExpenses &&
                fundExpenses.map(
                  (data, index) =>
                    data?.rate !== "" &&
                    data?.price !== "" && (
                      <React.Fragment key={index}>
                        <div className="input-values">
                          {renderValue(data?.rate) ? `${data.rate}%` : "N/A"}
                        </div>
                        <div className="input-values">
                          {renderValue(data?.price) ? `$${data.price}` : "N/A"}
                        </div>
                      </React.Fragment>
                    )
                )}
            </div>
          </div>
          <div className="field-container">
            <div className="field-name">
              Total Client Fees (including Fund Expenses)
              <span></span>
            </div>
            {/* <div className="header-labels">
              <div className="input-values">
                {renderValue(
                  totalClientFeeValues && totalClientFeeValues[0]?.rate
                )
                  ? `${totalClientFeeValues[0]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  totalClientFeeValues && totalClientFeeValues[0]?.price
                )
                  ? `$${totalClientFeeValues[0]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  totalClientFeeValues && totalClientFeeValues[1]?.rate
                )
                  ? `${totalClientFeeValues[1]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  totalClientFeeValues && totalClientFeeValues[1]?.price
                )
                  ? `$${totalClientFeeValues[1]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  totalClientFeeValues && totalClientFeeValues[2]?.rate
                )
                  ? `${totalClientFeeValues[2]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  totalClientFeeValues && totalClientFeeValues[2]?.price
                )
                  ? `$${totalClientFeeValues[2]?.price}`
                  : "N/A"}
              </div>
            </div> */}
            <div className="header-labels">
              {totalClientFeeValues &&
                totalClientFeeValues.map(
                  (data, index) =>
                    data?.rate !== "" &&
                    data?.price !== "" && (
                      <React.Fragment key={index}>
                        <div className="input-values">
                          {renderValue(data?.rate) ? `${data.rate}%` : "N/A"}
                        </div>
                        <div className="input-values">
                          {renderValue(data?.price) ? `$${data.price}` : "N/A"}
                        </div>
                      </React.Fragment>
                    )
                )}
            </div>
          </div>
          <div className="field-container">
            <div className="field-name">
              Gross Annual Fee to Financial Professional
              <span></span>
            </div>
            {/* <div className="header-labels">
              <div className="input-values">
                {renderValue(
                  grossAnnualFeeValues && grossAnnualFeeValues[0]?.rate
                )
                  ? `${grossAnnualFeeValues[0]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  grossAnnualFeeValues && grossAnnualFeeValues[0]?.price
                )
                  ? `$${grossAnnualFeeValues[0]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  grossAnnualFeeValues && grossAnnualFeeValues[1]?.rate
                )
                  ? `${grossAnnualFeeValues[1]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  grossAnnualFeeValues && grossAnnualFeeValues[1]?.price
                )
                  ? `$${grossAnnualFeeValues[1]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  grossAnnualFeeValues && grossAnnualFeeValues[2]?.rate
                )
                  ? `${grossAnnualFeeValues[2]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(
                  grossAnnualFeeValues && grossAnnualFeeValues[2]?.price
                )
                  ? `$${grossAnnualFeeValues[2]?.price}`
                  : "N/A"}
              </div>
            </div> */}
            <div className="header-labels">
              {grossAnnualFeeValues &&
                grossAnnualFeeValues.map(
                  (data, index) =>
                    data?.rate !== "" &&
                    data?.price !== "" && (
                      <React.Fragment key={index}>
                        <div className="input-values">
                          {renderValue(data?.rate) ? `${data.rate}%` : "N/A"}
                        </div>
                        <div className="input-values">
                          {renderValue(data?.price) ? `$${data.price}` : "N/A"}
                        </div>
                      </React.Fragment>
                    )
                )}
            </div>
          </div>
          <div className="field-container">
            <div className="field-name">
              Fund Expenses
              <span></span>
            </div>
            {/* <div className="header-labels">
              <div className="input-values">
                {renderValue(fundExpenses && fundExpenses[0]?.rate)
                  ? `${fundExpenses[0]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(fundExpenses && fundExpenses[0]?.price)
                  ? `$${fundExpenses[0]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(fundExpenses && fundExpenses[1]?.rate)
                  ? `${fundExpenses[1]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(fundExpenses && fundExpenses[1]?.price)
                  ? `$${fundExpenses[1]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(fundExpenses && fundExpenses[2]?.rate)
                  ? `${fundExpenses[2]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(fundExpenses && fundExpenses[2]?.price)
                  ? `$${fundExpenses[2]?.price}`
                  : "N/A"}
              </div>
            </div> */}
            <div className="header-labels">
              {fundExpenses &&
                fundExpenses.map(
                  (data, index) =>
                    data?.rate !== "" &&
                    data?.price !== "" && (
                      <React.Fragment key={index}>
                        <div className="input-values">
                          {renderValue(data?.rate) ? `${data.rate}%` : "N/A"}
                        </div>
                        <div className="input-values">
                          {renderValue(data?.price) ? `$${data.price}` : "N/A"}
                        </div>
                      </React.Fragment>
                    )
                )}
            </div>
          </div>

          <div className="field-container">
            <div className="field-name">
              Household Value
              <span></span>
            </div>
            {/* <div className="header-labels">
              <div className="input-values">
                {renderValue(houseHoldValue && houseHoldValue[0]?.rate)
                  ? `${houseHoldValue[0]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(houseHoldValue && houseHoldValue[0]?.price)
                  ? `$${houseHoldValue[0]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(houseHoldValue && houseHoldValue[1]?.rate)
                  ? `${houseHoldValue[1]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(houseHoldValue && houseHoldValue[1]?.price)
                  ? `$${houseHoldValue[1]?.price}`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(houseHoldValue && houseHoldValue[2]?.rate)
                  ? `${houseHoldValue[2]?.rate}%`
                  : "N/A"}
              </div>
              <div className="input-values">
                {renderValue(houseHoldValue && houseHoldValue[2]?.price)
                  ? `$${houseHoldValue[2]?.price}`
                  : "N/A"}
              </div>
            </div> */}
            <div className="header-labels">
              {houseHoldValue &&
                houseHoldValue.map(
                  (data, index) =>
                    data?.rate !== "" &&
                    data?.price !== "" && (
                      <React.Fragment key={index}>
                        <div className="input-values">
                          {renderValue(data?.rate) ? `${data.rate}%` : "N/A"}
                        </div>
                        <div className="input-values">
                          {renderValue(data?.price) ? `$${data.price}` : "N/A"}
                        </div>
                      </React.Fragment>
                    )
                )}
            </div>
          </div>
          <div className="field-container">
            <div className="field-name">Financial Professional Fee Type</div>

            {/* <div key={index} className="header-labels">
              <div className="header-label three-column">
                {calculationData["FPfeeType"][0]
                  ? `${calculationData["FPfeeType"][0]}`
                  : "N/A"}
              </div>
              <div className="header-label three-column">
                {calculationData["FPfeeType"][1]
                  ? `${calculationData["FPfeeType"][1]}`
                  : "N/A"}
              </div>
              <div className="header-label three-column">
                {calculationData["FPfeeType"][2]
                  ? `${calculationData["FPfeeType"][2]}`
                  : "N/A"}
              </div>
            </div> */}
            <div className="header-labels">
              {calculationData["FPfeeType"] &&
                calculationData["FPfeeType"].map((feeType, index) =>
                  feeType !== "" ? (
                    <div key={index} className="header-label three-column">
                      {feeType}
                    </div>
                  ) : null
                )}
            </div>
          </div>
          <div className="field-container">
            <div className="field-name">Program Selected</div>
            {/* {calculationData["paymentOption"] &&
              calculationData["paymentOption"].map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="header-label three-column">
                    {data ? `${data}` : "N/A"}
                  </div>
                </div>
              ))} */}
            <div className="header-labels">
              {calculationData["paymentOption"] &&
                calculationData["paymentOption"].map((data, index) =>
                  data !== "" ? (
                    <div key={index} className="header-label three-column">
                      {data}
                    </div>
                  ) : null
                )}
            </div>
          </div>

          <div className="field-container">
            <div className="field-name">
              Financial Professional AUA discount applied
            </div>
            {/* {calculationData["AdditionalDetails"] &&
              calculationData["AdditionalDetails"].map((data, index) => (
                <div key={index} className="header-labels">
                  <div className="header-label three-column">
                    {data?.auaDiscount ? `${data?.auaDiscount}` : "N/A"}
                  </div>
                </div>
              ))} */}
            {calculationData["AdditionalDetails"] &&
              calculationData["AdditionalDetails"].map((data, index) =>
                data?.auaDiscount && calculationData["scenario-name"][index] ? (
                  <div key={index} className="header-labels">
                    <div className="header-label three-column">
                      {data.auaDiscount}
                    </div>
                  </div>
                ) : null
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
