import React, { useState } from "react";
import Styles from "./tab.module.css";
import BasicTable from "../table/table";

function TabComponent() {
  // State variable to store the selected tab
  const [selectedTab, setSelectedTab] = useState(1);

  // Function to handle tab selection
  const handleTabClick = (tabNumber) => {
    setSelectedTab(tabNumber);
  };

  const columns = ["", "%", "$"];

  const rows = [
    {
      name: "Financial Professional Fee",
      fee: "N/A",
      ammount: "N/A",
    },
    {
      name: "Program Fee",
      fee: "0.99%",
      ammount: "$987",
    },
    {
      name: "Strategist Fee (if applicable)",
      fee: "N/A",
      ammount: "N/A",
    },
    {
      name: "Total Account Fee (annualized)",
      fee: "N/A",
      ammount: "N/A",
    },
    {
      name: "Total Client Fees (including Fund Expenses)",
      fee: "N/A",
      ammount: "N/A",
    },
  ];

  return (
    <div>
      <div className={Styles.tabContainer}>
        <div
          className={`${Styles.tab} ${Styles.firstTab} ${
            selectedTab === 1 ? Styles.active : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Total Account Fees
        </div>
        <div
          className={`${Styles.tab} ${selectedTab === 2 ? Styles.active : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Additional Details
        </div>
        <div
          className={`${Styles.tab} ${Styles.lastTab} ${
            selectedTab === 3 ? Styles.active : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Summary
        </div>
      </div>
      {/* Content area based on selected tab */}
      <div className="tab-content">
        {selectedTab === 1 && (
          <BasicTable data={rows} columns={columns}></BasicTable>
        )}
        {selectedTab === 2 && (
          <BasicTable data={rows} columns={columns}></BasicTable>
        )}
        {selectedTab === 3 && (
          <BasicTable data={rows} columns={columns}></BasicTable>
        )}
      </div>
    </div>
  );
}

export default TabComponent;
