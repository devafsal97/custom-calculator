// import React, { useState } from "react";
// import Styles from "./tab.module.css";
// import BasicTable from "../table/table";
// import { useAppContext } from "../../context/AppContext";

// function TabComponent() {
//   // State variable to store the selected tab
//   const [selectedTab, setSelectedTab] = useState(1);

//   // Function to handle tab selection
//   const handleTabClick = (tabNumber) => {
//     setSelectedTab(tabNumber);
//   };
//   const { rows, columns, additionalDetailsRows } = useAppContext();

//   return (
//     <div>
//       <div className={Styles.tabContainer}>
//         <div
//           className={`${Styles.tab} ${Styles.firstTab} ${
//             selectedTab === 1 ? Styles.active : ""
//           }`}
//           onClick={() => handleTabClick(1)}
//         >
//           Total Account Fees
//         </div>
//         <div
//           className={`${Styles.tab} ${selectedTab === 2 ? Styles.active : ""}`}
//           onClick={() => handleTabClick(2)}
//         >
//           Additional Details
//         </div>
//         <div
//           className={`${Styles.tab} ${Styles.lastTab} ${
//             selectedTab === 3 ? Styles.active : ""
//           }`}
//           onClick={() => handleTabClick(3)}
//         >
//           Summary
//         </div>
//       </div>
//       {/* Content area based on selected tab */}
//       <div className="tab-content">
//         {selectedTab === 1 && (
//           <BasicTable data={rows} columns={columns}></BasicTable>
//         )}
//         {selectedTab === 2 && (
//           <BasicTable
//             data={additionalDetailsRows}
//             columns={columns}
//           ></BasicTable>
//         )}
//         {selectedTab === 3 && (
//           <BasicTable data={rows} columns={columns}></BasicTable>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TabComponent;
