import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./ExportToPDF.css";
import { useCalculationStorage } from "../../context/StorageContext";
const ExportToPDF = ({ dates }) => {
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
  } = useCalculationStorage();
  const printRef = useRef();
  const index = 1;
  //   const handlePrint = () => {
  //     const input = printRef.current;
  //     html2canvas(input, { scale: 1 }).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("p", "mm", "a4");
  //       const imgWidth = 210; // A4 width in mm
  //       const pageHeight = 295; // A4 height in mm
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       let heightLeft = imgHeight;
  //       let position = 0;

  //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;

  //       while (heightLeft >= 0) {
  //         position = heightLeft - imgHeight;
  //         pdf.addPage();
  //         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight;
  //       }

  //       pdf.save("download.pdf");
  //     });
  //   };

  return (
    <div>
      <div ref={printRef}>
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
                  Amount charged by your Financial Professional for investment
                  advisory services
                </span>
              </div>
              <div className="value-container">
                <div className="value">
                  {fpValues[index]?.rate ? `${fpValues[index]?.rate}%` : "N/A"}
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
                  Annual sum of the Financial Professional Fee, Program Fee, and
                  Strategist Fee debited from your account
                </span>
              </div>
              <div className="value-container">
                <div className="value">
                  {fundExpenses[index]?.rate
                    ? `${Number(fundExpenses[index]?.rate).toLocaleString()}%`
                    : "N/A"}
                </div>
                <div className="value">N/A</div>
              </div>
            </div>
            <div className="results-divider"></div>
            <div className="row">
              <div className="label total_client_fee">*Total Client Fees</div>

              <div className="value-container ">
                <div className="value total_client_fee">
                  {/* {totalClientFeeValues[index]?.rate */}
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
            {/* <div className="results-divider"></div>
          <div className="row">
            <div className="label">
              Gross Annual Fee to Financial Professional
            </div>
            <div className="value-container">
              <div className="value">
                {grossAnnualFeeValues[index]?.rate &&
                !isNaN(grossAnnualFeeValues[index]?.rate) &&
                grossAnnualFeeValues[index]?.rate !== ""
                  ? `${Number(
                      grossAnnualFeeValues[index]?.rate
                    ).toLocaleString()}%`
                  : "N/A"}
              </div>
              <div className="value">
                {grossAnnualFeeValues[index]?.price &&
                !isNaN(grossAnnualFeeValues[index]?.price) &&
                grossAnnualFeeValues[index]?.price !== ""
                  ? `$${Number(
                      grossAnnualFeeValues[index]?.price
                    ).toLocaleString()}`
                  : "N/A"}
              </div>
            </div>
          </div> */}
            {/* <div className="results-divider"></div>
          <div className="row">
            <div className="label">
              Net Annual Fee to Financial Professional
            </div>
            <div className="value-container">
              <div className="value">
                {netAnnualFeeValues[index]?.rate &&
                netAnnualFeeValues[index]?.rate !== "N/A"
                  ? `${Number(
                      netAnnualFeeValues[index]?.rate
                    ).toLocaleString()}%`
                  : "N/A"}
              </div>
              <div className="value">
                {netAnnualFeeValues[index]?.price &&
                netAnnualFeeValues[index]?.price !== "N/A"
                  ? `$${Number(
                      netAnnualFeeValues[index]?.price
                    ).toLocaleString()}`
                  : "N/A"}
              </div>
            </div>
          </div> */}

            <p>
              *************************************************************************************************
            </p>

            <div className="left-section-heading">
              <div className="section-title">Financial Professional Payout</div>
              <div className="section-title-icons">
                <span className="section-title icons">Rate (%)</span>
                <span className="section-title icons">Price ($)</span>
              </div>
            </div>
            <div className="results-divider"></div>
            <div className="row">
              <div className="label">Account Value</div>
              <div className="value-container">
                <div className="value">
                  {accountValue[index]?.rate
                    ? `${Number(accountValue[index]?.rate).toLocaleString()}%`
                    : "N/A"}
                </div>
                <div className="value">
                  {accountValue[index]?.price
                    ? `$${Number(accountValue[index]?.price).toLocaleString()}`
                    : "N/A"}
                </div>
              </div>
            </div>

            <div className="results-divider"></div>
            <div className="row">
              <div className="label">Financial Professional Payout</div>
              <div className="value-container">
                <div className="value">
                  {fpPayout[index]?.rate
                    ? `${Number(fpPayout[index]?.rate).toLocaleString()}%`
                    : "N/A"}
                </div>
                <div className="value">N/A</div>
              </div>
            </div>
            <div className="results-divider"></div>
            <div className="row">
              <div className="label">Household Value</div>
              <div className="value-container">
                <div className="value">
                  {houseHoldValue[index]?.rate
                    ? `${Number(houseHoldValue[index]?.rate).toLocaleString()}%`
                    : "N/A"}
                </div>
                <div className="value">N/A</div>
              </div>
            </div>
            <div className="results-divider"></div>
            <div className="row">
              <div className="label">Fee Type</div>
              <div className="value-container types">
                <div className="value">{feeType[index] || "N/A"}</div>
              </div>
            </div>
            <div className="results-divider"></div>
          </div>
        </div>
      </div>
      {/* <button onClick={handlePrint}>Export as PDF</button> */}
    </div>
  );
};

export default ExportToPDF;
