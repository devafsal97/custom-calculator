import { useState } from "react";
import CustomSelect from "../../../components/select/Select";
import { useAppContext } from "../../../context/AppContext";
import Styles from "./caapsas.module.css";

const CaapSas = () => {
  const { strategistCaapSas, setStrategistCaapSas, accountValue } =
    useAppContext();
  const onChange = (event) => {
    setStrategistCaapSas(event.target.value);
  };

  const numericAccountValue = accountValue.replace(/[^0-9]/g, "");

  const optionsArray = [
    {
      label: "American Funds - Standard & Tax-aware",
      value: "American Funds - Standard & Tax-aware",
    },
    {
      label: "Fidelity Institutional Asset Management - Index Focused",
      value: "Fidelity Institutional Asset Management - Index Focused",
    },
    { label: "Franklin Templeton - Core", value: "Franklin Templeton - Core" },
    { label: "Nuveen - Core ESG", value: "Nuveen - Core ESG" },
    { label: "PIMCO - Fixed Income", value: "PIMCO - Fixed Income" },
    { label: "Vanguard - Core", value: "Vanguard - Core" },
    { label: "State Street - ETF", value: "State Street - ETF" },
    {
      label: "BlackRock - Long Horizon ETF",
      value: "BlackRock - Long Horizon ETF",
    },
  ];

  console.log("account value", accountValue.replace(/[^0-9]/g, ""));
  console.log(accountValue.replace(/[^0-9]/g, "") >= 5000);
  console.log(accountValue.replace(/[^0-9]/g, "") <= 10000);

  let filteredOptions = optionsArray;
  if (numericAccountValue >= 5000 && numericAccountValue <= 10000) {
    filteredOptions = optionsArray.slice(0, -2);
    console.log("filteredOptions", filteredOptions);
  }

  return (
    <div>
      {numericAccountValue > 5000 ? (
        <div>
          <h3>Strategist CAAP SAS</h3>
          <CustomSelect
            options={filteredOptions}
            onChange={onChange}
            value={strategistCaapSas}
          ></CustomSelect>
        </div>
      ) : (
        <p className={Styles.errorMessage}>
          Account value does not meet program minimum. Please correct account
          value to continue.
        </p>
      )}
    </div>
  );
};
export default CaapSas;
