import { useState } from "react";
import CustomSelect from "../../../components/select/Select";
import { useAppContext } from "../../../context/AppContext";

const StrategistCaap = () => {
  const { strategistCaap, setStrategistCaap } = useAppContext();

  const onChange = (event) => {
    setStrategistCaap(event.target.value);
  };
  const optionsArray = [
    { label: "3Edge Asset Management", value: "3Edge Asset Management" },
    {
      label: "American Funds - Standard & Tax-aware",
      value: "American Funds - Standard & Tax-aware",
    },
    {
      label: "American Funds - Retirement Income",
      value: "American Funds - Retirement Income",
    },
    {
      label: "BlackRock - Long Horizon ETF",
      value: "BlackRock - Long Horizon ETF",
    },
    {
      label: "BlackRock - Target Allocation",
      value: "BlackRock - Target Allocation",
    },
    { label: "Brinker Capital", value: "Brinker Capital" },
    {
      label: "Fidelity Institutional Asset Management - Fixed Income",
      value: "Fidelity Institutional Asset Management - Fixed Income",
    },
    {
      label: "Fidelity Institutional Asset Management - Index Focused",
      value: "Fidelity Institutional Asset Management - Index Focused",
    },
    { label: "First Trust", value: "First Trust" },
    {
      label: "Franklin Templeton - Alternative Completion",
      value: "Franklin Templeton - Alternative Completion",
    },
    {
      label: "Franklin Templeton - Diversified ESG",
      value: "Franklin Templeton - Diversified ESG",
    },
    { label: "Goldman Sachs", value: "Goldman Sachs" },
    {
      label: "Horizon Investments - Hybrid",
      value: "Horizon Investments - Hybrid",
    },
    {
      label: "Horizon Investments - Risk Assist",
      value: "Horizon Investments - Risk Assist",
    },
    {
      label: "Horizon Investments - Real Spend",
      value: "Horizon Investments - Real Spend",
    },
    {
      label: "iM Global Partner - Standard, Tax-sensitive & ETF",
      value: "iM Global Partner - Standard, Tax-sensitive & ETF",
    },
    { label: "iM Global Partner - ESG", value: "iM Global Partner - ESG" },
    { label: "JP Morgan", value: "JP Morgan" },
    {
      label: "Morningstar - Absolute Return & Retirement Income",
      value: "Morningstar - Absolute Return & Retirement Income",
    },
    {
      label: "Morningstar - Active/Passive",
      value: "Morningstar - Active/Passive",
    },
    { label: "Morningstar - ETF", value: "Morningstar - ETF" },
    { label: "Nuveen - ESG & Tax-exempt", value: "Nuveen - ESG & Tax-exempt" },
    { label: "Ocean Park", value: "Ocean Park" },
    {
      label: "OneAscent Investment Solutions",
      value: "OneAscent Investment Solutions",
    },
    { label: "PIMCO - Fixed Income", value: "PIMCO - Fixed Income" },
    {
      label: "PIMCO - Tax-aware Fixed Income",
      value: "PIMCO - Tax-aware Fixed Income",
    },
    { label: "PMC", value: "PMC" },
    {
      label: "Principal Global Investors - Public Growth / Public Income",
      value: "Principal Global Investors - Public Growth / Public Income",
    },
    {
      label: "Richard Bernstein Advisors",
      value: "Richard Bernstein Advisors",
    },
    {
      label: "Russell Investments - Risk Assist",
      value: "Russell Investments - Risk Assist",
    },
    {
      label: "Russell Investments - Hybrid",
      value: "Russell Investments - Hybrid",
    },
    { label: "SEI", value: "SEI" },
    { label: "State Street - ETF", value: "State Street - ETF" },
    {
      label: "State Street - Risk Assist",
      value: "State Street - Risk Assist",
    },
    {
      label: "Symmetry Partners - Panoramic",
      value: "Symmetry Partners - Panoramic",
    },
    {
      label: "Symmetry Partners - Risk Assist",
      value: "Symmetry Partners - Risk Assist",
    },
    {
      label: "Symmetry Partners - Structured Bond",
      value: "Symmetry Partners - Structured Bond",
    },
    {
      label: "T. Rowe Price - Low Duration",
      value: "T. Rowe Price - Low Duration",
    },
    { label: "Vanguard", value: "Vanguard" },
    {
      label: "Voya Investment Management",
      value: "Voya Investment Management",
    },
  ];

  return (
    <div>
      <h3>Strategist CAAP</h3>
      <CustomSelect
        options={optionsArray}
        onChange={onChange}
        value={strategistCaap}
      ></CustomSelect>
    </div>
  );
};
export default StrategistCaap;
