import { useState } from "react";
import CustomSelect from "../../../components/select/Select";
const CaapSas = () => {
  const [selectValue, setSelectValue] = useState("");

  const onChange = (event) => {
    setSelectValue(event.target.value);
  };
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

  return (
    <div>
      <h3>Strategist CAAP SAS</h3>
      <CustomSelect
        options={optionsArray}
        onChange={onChange}
        value={selectValue}
      ></CustomSelect>
    </div>
  );
};
export default CaapSas;
