import React, { useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./ExportToPDF.css";
import { useCalculationStorage } from "../../context/StorageContext";


const ExportToPDF = ({
  dates,
  showPdf,
  pdfType,
  pdfIndex,
  setShowPdf,
  setPdfType,
  setPdfIndex,
}) => {
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
    calculationData,
  } = useCalculationStorage();
  const index = pdfIndex;
  const printRef = useRef();

  useEffect(() => {
    if (showPdf === true) {
      handlePrint();
    }
  }, [showPdf]);

  const handlePrint = () => {
    const input = printRef.current;
    const originalDisplay = input.style.display;
    input.style.display = "block";
    html2canvas(input, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("download.pdf");
      input.style.display = originalDisplay;
      setShowPdf(false);
      setPdfType("");
      setPdfIndex("");
    });
  };

  const renderValue = (value) => {
    if (value)
      return (
        value !== undefined && value !== null && value !== "" && value !== "N/A"
      );
  };

  return (
    <div>
      <div ref={printRef} style={{display:"none"}}>
        <div className="pdf-container">
          <div className="header">
            <div className="title-block">
              <h1>
                {getCalculationDataValue("scenario-name")[index] ||
                  "Investment Account Fee Estimate 1"}
              </h1>
              <p>As of Date: {dates[index] ? dates[index] : ""}</p>
            </div>
            <div className="actions">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/16a0bf8ee9915a3c1274ab46ee5f5cd31e6b2e149ae5785312a1e6ed4b606161?apiKey=f95b5ca361ef4526b1cb461f7b2405ea&"
                className="logoImage"
              />
            </div>
          </div>
          <div className="fee-details">
            {pdfType === "comparison" ? (
              <div className="comparison-pdf">
                <div className="table-wrapper">
                  <div className="field-container rate-doller">
                    <div className="field-name"></div>
                    {calculationData["scenario-name"] &&
                      calculationData["scenario-name"].map((scenario, idx) =>
                        calculationData["scenario-name"][idx] !== "" ? (
                          <div key={idx} className="header-labels">
                            <div className="header-label">Rate (%)</div>
                            <div className="header-label">Price ($)</div>
                          </div>
                        ) : null
                      )}
                  </div>
                  <div className="field-container black-section">
                    <div className="field-name">Scenario Name</div>

                    <div key={index} className="header-labels">
                      {calculationData["scenario-name"] &&
                        calculationData["scenario-name"].map((name, idx) =>
                          renderValue(calculationData["scenario-name"][idx]) ? (
                            <div
                              key={idx}
                              className="header-label three-column"
                            >
                              {calculationData["scenario-name"][idx]}
                            </div>
                          ) : null
                        )}
                    </div>
                  </div>

                  <div className="field-container">
                    <div className="field-name">Financial Professional Fee</div>
                    {fpValues.length > 0 && (
                      <div key={index} className="header-labels">
                        {fpValues.map(
                          (value, idx) =>
                            value.rate !== "" &&
                            value.price !== "" && (
                              <React.Fragment key={idx}>
                                <div className="input-values">
                                  {renderValue(value.rate)
                                    ? `$${value.rate}`
                                    : "N/A"}
                                </div>
                                <div className="input-values">
                                  {renderValue(value.price)
                                    ? `${value.price}%`
                                    : "N/A"}
                                </div>
                              </React.Fragment>
                            )
                        )}
                      </div>
                    )}
                  </div>

                  <div className="field-container">
                    <div className="field-name">Program Fee</div>
                    <div className="header-labels">
                      {programFeeValues &&
                        programFeeValues.map(
                          (value, idx) =>
                            value.rate !== "" &&
                            value.price !== "" && (
                              <React.Fragment key={idx}>
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
                    </div>
                    <div className="header-labels">
                      {strategistFeeValues &&
                        strategistFeeValues.map((value, idx) => (
                          <React.Fragment key={idx}>
                            <div className="input-values">
                              {value && value.rate && value.rate !== "N/A"
                                ? `${value.rate}%`
                                : "N/A"}
                            </div>
                            <div className="input-values">
                              {value && value.price && value.price !== "N/A"
                                ? `$${value.price}`
                                : "N/A"}
                            </div>
                          </React.Fragment>
                        ))}
                    </div>
                  </div>

                  <div className="field-container">
                    <div className="field-name">
                      Total Account Fee (annualized)
                    </div>
                    <div className="header-labels">
                      {totalAccountFeeValues &&
                        totalAccountFeeValues.map((value, idx) => (
                          <React.Fragment key={idx}>
                            <div className="input-values">
                              {value && value.rate && value.rate !== "N/A"
                                ? `${value.rate}%`
                                : "N/A"}
                            </div>
                            <div className="input-values">
                              {value && value.price && value.price !== "N/A"
                                ? `$${value.price}`
                                : "N/A"}
                            </div>
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field-name">Fund Expenses**</div>
                    <div className="header-labels">
                      {fundExpenses &&
                        fundExpenses.map(
                          (data, idx) =>
                            data?.rate !== "" &&
                            data?.price !== "" && (
                              <React.Fragment key={idx}>
                                <div className="input-values">
                                  {renderValue(data?.rate)
                                    ? `${data.rate}%`
                                    : "N/A"}
                                </div>
                                <div className="input-values">
                                  {renderValue(data?.price)
                                    ? `$${data.price}`
                                    : "N/A"}
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
                    <div className="header-labels">
                      {totalClientFeeValues &&
                        totalClientFeeValues.map(
                          (data, idx) =>
                            data?.rate !== "" &&
                            data?.price !== "" && (
                              <React.Fragment key={idx}>
                                <div className="input-values">
                                  {renderValue(data?.rate)
                                    ? `${data.rate}%`
                                    : "N/A"}
                                </div>
                                <div className="input-values">
                                  {renderValue(data?.price)
                                    ? `$${data.price}`
                                    : "N/A"}
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
                    <div className="header-labels">
                      {grossAnnualFeeValues &&
                        grossAnnualFeeValues.map(
                          (data, idx) =>
                            data?.rate !== "" &&
                            data?.price !== "" && (
                              <React.Fragment key={idx}>
                                <div className="input-values">
                                  {renderValue(data?.rate)
                                    ? `${data.rate}%`
                                    : "N/A"}
                                </div>
                                <div className="input-values">
                                  {renderValue(data?.price)
                                    ? `$${data.price}`
                                    : "N/A"}
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
                    <div className="header-labels">
                      {fundExpenses &&
                        fundExpenses.map(
                          (data, idx) =>
                            data?.rate !== "" &&
                            data?.price !== "" && (
                              <React.Fragment key={idx}>
                                <div className="input-values">
                                  {renderValue(data?.rate)
                                    ? `${data.rate}%`
                                    : "N/A"}
                                </div>
                                <div className="input-values">
                                  {renderValue(data?.price)
                                    ? `$${data.price}`
                                    : "N/A"}
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
                    <div className="header-labels">
                      {houseHoldValue &&
                        houseHoldValue.map(
                          (data, idx) =>
                            data?.rate !== "" &&
                            data?.price !== "" && (
                              <React.Fragment key={idx}>
                                <div className="input-values">
                                  {renderValue(data?.rate)
                                    ? `${data.rate}%`
                                    : "N/A"}
                                </div>
                                <div className="input-values">
                                  {renderValue(data?.price)
                                    ? `$${data.price}`
                                    : "N/A"}
                                </div>
                              </React.Fragment>
                            )
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="left-section-heading">
                  <div className="section-title">Fee Type </div>
                  <div className="section-title-icons">
                    <span className="section-title icons">Rate (%)</span>
                    <span className="section-title icons">Price ($)</span>
                  </div>
                </div>
                <div className="results-divider sub"></div>
                <div className="row">
                  <div className="label">
                    Financial Professional Fee
                    <span>
                      Amount charged by your Financial Professional for
                      investment advisory services
                    </span>
                  </div>
                  <div className="value-container">
                    <div className="value">
                      {fpValues[index]?.rate
                        ? `${fpValues[index]?.rate}%`
                        : "N/A"}
                    </div>
                    <div className="value">
                      {fpValues[index]?.price
                        ? `$${Number(fpValues[index]?.price).toLocaleString()}`
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label">
                    Program Fee
                    <span>
                      Covers operating and administrative costs associated with
                      investment program
                    </span>
                  </div>

                  <div className="value-container">
                    <div className="value">
                      {programFeeValues[index]?.rate
                        ? `${Number(
                            programFeeValues[index]?.rate
                          ).toLocaleString()}%`
                        : "N/A"}
                    </div>
                    <div className="value">
                      {programFeeValues[index]?.price
                        ? `$${Number(
                            programFeeValues[index]?.price
                          ).toLocaleString()}`
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label">
                    Strategist Fee (if applicable)
                    <span>
                      A fee that may be charged by the Strategist for asset
                      allocation
                    </span>
                  </div>

                  <div className="value-container">
                    <div className="value">
                      {strategistFeeValues[index]?.rate &&
                      strategistFeeValues[index]?.rate !== "N/A"
                        ? `${Number(
                            strategistFeeValues[index]?.rate
                          ).toLocaleString()}%`
                        : "N/A"}
                    </div>
                    <div className="value">
                      {strategistFeeValues[index]?.price &&
                      strategistFeeValues[index]?.price !== "N/A"
                        ? `$${Number(
                            strategistFeeValues[index]?.price
                          ).toLocaleString()}`
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label">
                    Total Account Fee (annualized)
                    <span>
                      A fee that may be charged by the Strategist for asset
                      allocation
                    </span>
                  </div>

                  <div className="value-container">
                    <div className="value">
                      {totalAccountFeeValues[index]?.rate &&
                      totalAccountFeeValues[index]?.rate !== "N/A"
                        ? `${Number(
                            totalAccountFeeValues[index]?.rate
                          ).toLocaleString()}%`
                        : "N/A"}
                    </div>
                    <div className="value">
                      {totalAccountFeeValues[index]?.price &&
                      totalAccountFeeValues[index]?.price !== "N/A"
                        ? `$${Number(
                            totalAccountFeeValues[index]?.price
                          ).toLocaleString()}`
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label">
                    Fund Expenses***
                    <span>
                      Annual sum of the Financial Professional Fee, Program Fee,
                      and Strategist Fee debited from your account
                    </span>
                  </div>
                  <div className="value-container">
                    <div className="value">
                      {fundExpenses[index]?.rate
                        ? `${Number(
                            fundExpenses[index]?.rate
                          ).toLocaleString()}%`
                        : "N/A"}
                    </div>
                    <div className="value">N/A</div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label total_client_fee">
                    *Total Client Fees
                  </div>

                  <div className="value-container ">
                    <div className="value total_client_fee">
                      {totalClientFeeValues[index]?.rate &&
                      !isNaN(totalClientFeeValues[index]?.rate) &&
                      totalClientFeeValues[index]?.rate !== ""
                        ? `${Number(
                            totalClientFeeValues[index]?.rate
                          ).toLocaleString()}%`
                        : "N/A"}
                    </div>
                    <div className="value total_client_fee">
                      {totalClientFeeValues[index]?.rate &&
                      !isNaN(totalClientFeeValues[index]?.rate) &&
                      totalClientFeeValues[index]?.rate !== ""
                        ? `$${Number(
                            totalClientFeeValues[index]?.price
                          ).toLocaleString()}`
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
              </>
            )}

            {pdfType === "internal" && (
              <>
                <div className="left-section-heading optional">
                  <div className="section-title">
                    Financial Professional Payout
                  </div>
                  <div className="section-title-icons">
                    <span className="section-title icons">Rate (%)</span>
                    <span className="section-title icons">Price ($)</span>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label">
                    Gross Annual Fee to Financial Professional
                  </div>
                  <div className="value-container">
                    <div className="value second-table">
                      {grossAnnualFeeValues[index]?.rate &&
                      !isNaN(grossAnnualFeeValues[index]?.rate) &&
                      grossAnnualFeeValues[index]?.rate !== ""
                        ? `${Number(
                            grossAnnualFeeValues[index]?.rate
                          ).toLocaleString()}%`
                        : "N/A"}
                    </div>
                    <div className="value second-table">
                      {grossAnnualFeeValues[index]?.price &&
                      !isNaN(grossAnnualFeeValues[index]?.price) &&
                      grossAnnualFeeValues[index]?.price !== ""
                        ? `$${Number(
                            grossAnnualFeeValues[index]?.price
                          ).toLocaleString()}`
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label second-table">
                    Net - Program fee paid by client was selected
                  </div>
                  <div className="value-container">
                    <div className="value second-table">
                      {netAnnualFeeValues[index]?.rate &&
                      netAnnualFeeValues[index]?.rate !== "N/A"
                        ? `${Number(
                            netAnnualFeeValues[index]?.rate
                          ).toLocaleString()}%`
                        : "N/A"}
                    </div>
                    <div className="value second-table">
                      {netAnnualFeeValues[index]?.price &&
                      netAnnualFeeValues[index]?.price !== "N/A"
                        ? `$${Number(
                            netAnnualFeeValues[index]?.price
                          ).toLocaleString()}`
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="results-divider"></div>

            <div className="pdf-bottom-section-parent">
              <div className="pdf-bottom-left">
                <span className="bottom-section-heading">
                  Scenario Assumptions
                </span>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label pdf-bottom-section">Account Value</div>
                  <div className="value-container">
                    <div className="value">
                      {accountValue[index]?.price
                        ? `$${Number(
                            accountValue[index]?.price
                          ).toLocaleString()}`
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label pdf-bottom-section">
                    WealthPort Household value
                  </div>
                  <div className="value-container">
                    <div className="value">
                      {houseHoldValue[index]?.rate
                        ? `${Number(
                            houseHoldValue[index]?.rate
                          ).toLocaleString()}%`
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label pdf-bottom-section">
                    Financial Professional Fee Type
                  </div>
                  <div className="value-container types">
                    <div className="value">{feeType[index] || "N/A"}</div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label pdf-bottom-section">
                    Program Selected
                  </div>
                  <div className="value-container">
                    <div className="value">
                      {calculationData["paymentOption"] &&
                      calculationData["paymentOption"][index]
                        ? calculationData["paymentOption"][index]
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label pdf-bottom-section">
                    Financial Professional AUA discount applied
                  </div>
                  <div className="value-container">
                    <div className="value">
                      {calculationData["AdditionalDetails"][index] &&
                      calculationData["AdditionalDetails"][index]?.auaDiscount
                        ? calculationData["AdditionalDetails"][index]
                            ?.auaDiscount
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
              </div>
              <div className="pdf-bottom-right">
                <span className="bottom-section-heading">
                  Program Fee Schedule (UMA/SMA)
                </span>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label pdf-bottom-section">Account Value</div>
                  <div className="value-container">
                    <div className="value">
                      {accountValue[index]?.price
                        ? `$${Number(
                            accountValue[index]?.price
                          ).toLocaleString()}`
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label pdf-bottom-section">
                    WealthPort Household value
                  </div>
                  <div className="value-container">
                    <div className="value">
                      {houseHoldValue[index]?.rate
                        ? `${Number(
                            houseHoldValue[index]?.rate
                          ).toLocaleString()}%`
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label pdf-bottom-section">
                    Financial Professional Fee Type
                  </div>
                  <div className="value-container types">
                    <div className="value">{feeType[index] || "N/A"}</div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label pdf-bottom-section">
                    Program Selected
                  </div>
                  <div className="value-container">
                    <div className="value">
                      {calculationData["paymentOption"] &&
                      calculationData["paymentOption"][index]
                        ? calculationData["paymentOption"][index]
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
                <div className="row">
                  <div className="label pdf-bottom-section">
                    Financial Professional AUA discount applied
                  </div>
                  <div className="value-container">
                    <div className="value">
                      {calculationData["AdditionalDetails"][index] &&
                      calculationData["AdditionalDetails"][index]?.auaDiscount
                        ? calculationData["AdditionalDetails"][index]
                            ?.auaDiscount
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="results-divider"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportToPDF;
