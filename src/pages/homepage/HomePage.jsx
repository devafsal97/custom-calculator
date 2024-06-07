// import React from "react";
// import Styles from "./homepage.module.css";
// import TextField from "../../components/textfield/TextField";
// import Button from "../../components/button/Button";
// import { useState } from "react";
// import { useAppContext } from "../../context/AppContext";

// const HomePage = ({ onNavigate }) => {
//   const { accountValue, setAccountValue } = useAppContext(); // Use context here
//   const [inputError, setInputError] = useState(false);

//   const handleChange = (event) => {
//     let numericValue = event.target.value.replace(/[^0-9]/g, "");
//     if (numericValue) {
//       const formattedValue = numberWithCommas(numericValue);
//       setAccountValue("$ " + formattedValue); // Update using context
//       setInputError(false);
//     } else {
//       setAccountValue(""); // Update using context
//     }
//     // Reset validation state when user starts typing
//   };

//   const onClickHandler = () => {
//     if (!accountValue) {
//       setInputError(true); // Set error state if accountValue is empty
//       return; // Prevent navigation
//     }
//     onNavigate("FpFee");
//   };

//   const numberWithCommas = (x) => {
//     return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };
//   return (
//     <div>
//       <div className={Styles.container}>
//         <div className={Styles.leftContainer}>
//           <div className={Styles.titleContainer}>
//             <h1 className={Styles.title}>
//               Welcome to the WealthPort® Calculator!
//             </h1>
//           </div>
//           <div className={Styles.descriptionContainer}>
//             <p className={Styles.description}>
//               Use this tool to calculate the estimated account fees for any
//               WealthPort program fee type or to compare investment options.
//             </p>
//           </div>
//           <div className={Styles.instructionContainer}>
//             <button className={Styles.instructionButton}>
//               Access the Original WealthPort Calculator in Excel Spreadsheet
//             </button>
//           </div>
//         </div>
//         <div className={Styles.rightContainer}>
//           <div className={Styles.leftContainerContent}>
//             <div className={Styles.labelContainer}>
//               <h3
//                 className={`${Styles.inputLabe} ${
//                   inputError ? Styles.errorlabel : ""
//                 }`}
//               >
//                 Enter Account Value*
//               </h3>
//             </div>
//             <div>
//               <TextField
//                 type="text"
//                 onChange={handleChange}
//                 value={accountValue}
//                 error={inputError}
//               ></TextField>
//               {inputError && (
//                 <p className={Styles.errorMessage}>
//                   Please enter a number greater than 1
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={Styles.buttonSection}>
//         <div className={Styles.btnContainer}>
//           <Button text="Next →" onClick={onClickHandler}></Button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default HomePage;
