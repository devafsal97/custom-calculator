import Styles from "./umasma.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
const Umasma = () => {
  const {
    selectedMFEFTItems,
    setSelectedMFEFTItems,
    selectedEquitySMAItems,
    setSelectedEquitySMAItems,
    accountValue,
  } = useAppContext();

  const numericAcountValue = accountValue.replace(/[^0-9]/g, "");

  const toggleSelection = (item, array, setArray) => {
    const { url, ...itemWithoutUrl } = item; // Destructure to exclude the url from the item
    const exists = array.some(
      (existingItem) => existingItem.name === item.name
    );

    if (exists) {
      setArray(array.filter((existingItem) => existingItem.name !== item.name));
    } else {
      setArray([...array, itemWithoutUrl]);
    }
  };

  const EquitySma = [
    {
      name: "12th Street Asset Management",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200917690-zANBYNJ7EmCmRvifL/public",
      allocationValue: 100000,
      value: 0.65,
    },
    {
      name: "Aligned Investors",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
      allocationValue: 100000,
      value: 0.42,
    },
    {
      name: "Aristotle Capital",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200928234-LGpBKq85pqpsXfYAS/public",
      allocationValue: 100000,
      value: 0.4,
    },
    {
      name: "Aristotle Boston",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200928234-LGpBKq85pqpsXfYAS/public",
      allocationValue: 100000,
      value: 0.45,
    },
    {
      name: "Atlanta Capital",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200947509-tE74KGRw3juxHbfJ3/public",
      allocationValue: 100000,
      value: 0.4,
    },
    {
      name: "Berkshire Asset Management",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200953973-68QRBKE3XsNaxndHa/public",
      allocationValue: 100000,
      value: 0.3,
    },
    {
      name: "Boston Advisors",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200962624-vFok3HsWgMNadMiNJ/public",
      allocationValue: 100000,
      value: 0.35,
    },
    {
      name: "Capital Group",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200978950-CLJd6s6TLShos3A2K/public",
      allocationValue: 100000,
      value: 0.37,
    },
    {
      name: "Dearborn Partners",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200985853-5HLxW3aZwD6JhuhgM/public",
      allocationValue: 100000,
      value: 0.5,
    },
    {
      name: "Duff & Phelps",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200992659-vW6h6hWPtPugegC4G/public",
      allocationValue: 100000,
      value: 0.4,
    },
    {
      name: "EDGE Asset Management Inc",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201006684-tEiwT2czRAJtySge9/public",
      allocationValue: 100000,
      value: 0.45,
    },
    {
      name: "Harding Loevner",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201014305-e7EHgkK6D2CCzGu9q/public",
      allocationValue: 100000,
      value: 0.45,
    },
    {
      name: "Invesco",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201026950-hw5tmNBnBZn4ARr6g/public",
      allocationValue: 100000,
      value: 0.4,
    },
    {
      name: "Kayne Anderson Rudnic",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
      allocationValue: 100000,
      value: 0.4,
    },
    {
      name: "Kennedy Capital Management",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
      allocationValue: 100000,
      value: 0.4,
    },
    {
      name: "Lazard Asset Management",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201078407-RP8Ta8LeEkqPw67Kq/public",
      allocationValue: 100000,
      value: 0.45,
    },
    {
      name: "Morningstar - Tortoise & Hare Strategies",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201090585-ZD9GtgshLy4xDhXPg/public",
      allocationValue: 100000,
      value: 0.4,
    },
    {
      name: "Polen Capital Management",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201094947-83LTPh5ujSGxfJ9GR/public",
      allocationValue: 100000,
      value: 0.5,
    },
    {
      name: "Principal Global Investors - US Real Estate",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201100134-FiehNNMHD5MCuwRG2/public",
      allocationValue: 100000,
      value: 0.4,
    },
    {
      name: "Principal Spectrum",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201100134-FiehNNMHD5MCuwRG2/public",
      allocationValue: 100000,
      value: 0.35,
    },
    {
      name: "Renaissance",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201113593-NfPPs2PXmXp4grKYz/public",
      allocationValue: 100000,
      value: 0.5,
    },
    {
      name: "Schafer Cullen",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201119490-H7cXchKmPqLZNBvNQ/public",
      allocationValue: 100000,
      value: 0.35,
    },
    {
      name: "Trillium",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201125344-XC2nRqLWRkAJQfnz2/public",
      allocationValue: 100000,
      value: 0.4,
    },
    {
      name: "T. Rowe Price - US Blue Chip Growth & US Value Equity",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
      allocationValue: 100000,
      value: 0.33,
    },
    {
      name: "Zacks",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201140424-Mpbhk7Fwmrk8ZYSJC/public",
      allocationValue: 100000,
      value: 0.35,
    },
  ];

  const MFEFT = [
    {
      name: "3EDGE Asset Management",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200491818-7xQqFr6jds5LmGLqD/public",
      allocationValue: 50000,
      value: 0.35,
    },
    {
      name: "American Funds - Standard & Tax-aware",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200510992-XDHNWfQxhk4zdPWBR/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "American Funds - Retirement Income",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200510992-XDHNWfQxhk4zdPWBR/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "BlackRock - Long Horizon ETF",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200526890-yLgD6MRXxJTfQs2Zz/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "BlackRock - Target Allocation",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200526890-yLgD6MRXxJTfQs2Zz/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Brinker Capital",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200543690-5yzhZyiJE6qtriZDd/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Fidelity Institutional Asset Management - Fixed Income",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200560321-bokT3tCLzkPjGsAaG/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Fidelity Institutional Asset Management - Index Focused",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200560321-bokT3tCLzkPjGsAaG/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "First Trust",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200599653-jpgGiWewWH4GLrfoN/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Franklin Templeton - Alternative Completion",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200606354-gmyPXWReqfqFLxkct/public",
      allocationValue: 50000,
      value: 0.05,
    },
    {
      name: "Franklin Templeton - Core",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200606354-gmyPXWReqfqFLxkct/public",
      allocationValue: 50000,
      value: 0.2,
    },
    {
      name: "Franklin Templeton - Diversified ESG",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200606354-gmyPXWReqfqFLxkct/public",
      allocationValue: 50000,
      value: 0.2,
    },
    {
      name: "Goldman Sachs",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200643696-ypQ5P8mZEQKEqncPp/public",
      allocationValue: 50000,
      value: 0.15,
    },
    {
      name: "Horizon - ETF",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200653745-QCbWKFrBc8Q6uDEoq/public",
      allocationValue: 50000,
      value: 0.3,
    },
    {
      name: "Horizon Investments - Hybrid",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200653745-QCbWKFrBc8Q6uDEoq/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Horizon Investments - Risk Assist",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200653745-QCbWKFrBc8Q6uDEoq/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Horizon Investments - Real Spend",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200653745-QCbWKFrBc8Q6uDEoq/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "iM Global Partner - Standard, Tax-sensitive & ETF",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200696737-XaeQNYx8m5DmLeo7d/public",
      allocationValue: 50000,
      value: 0.1,
    },
    {
      name: "iM Global Partner - ESG",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200696737-XaeQNYx8m5DmLeo7d/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "JP Morgan",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200714651-ZMRxsmLPDGahE7ZKx/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Morningstar",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200726982-5XN75u9tZor9Zc3sL/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Morningstar Active/Passive",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200726982-5XN75u9tZor9Zc3sL/public",
      allocationValue: 50000,
      value: 0.1,
    },
    {
      name: "Morningstar - ETF",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200726982-5XN75u9tZor9Zc3sL/public",
      allocationValue: 50000,
      value: 0.17,
    },
    {
      name: "Nuveen - Core ESG",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200740725-eyxszZcTfAmZ8Zj7e/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Nuveen - ESG & Tax-exempt",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200740725-eyxszZcTfAmZ8Zj7e/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Ocean Park",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200756894-QnFWMLaJguwWGjcCt/public",
      allocationValue: 50000,
      value: 0.05,
    },
    {
      name: "OneAscent Investment Solutions",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200762143-6J5LFnJaZZ9K4bmXn/public",
      allocationValue: 50000,
      value: 0.25,
    },
    {
      name: "PIMCO - Fixed Income",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200771206-GtXk2y7kzSdLnMsZM/public",
      allocationValue: 50000,
      value: 0.05,
    },
    {
      name: "PIMCO - Tax-aware Fixed Income",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200771206-GtXk2y7kzSdLnMsZM/public",
      allocationValue: 50000,
      value: 0.05,
    },
    {
      name: "PMC",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200780255-uYjXAFjF2iJWjSRZC/public",
      allocationValue: 50000,
      value: 0.1,
    },
    {
      name: "Principal Global Investors - Dynamic Distribution",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200786806-jg8PfdPFesqjprRfd/public",
      allocationValue: 100000,
      value: 0.2,
    },
    {
      name: "Principal Global Investors - Public Growth / Public Income",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200786806-jg8PfdPFesqjprRfd/public",
      allocationValue: 50000,
      value: 0.2,
    },
    {
      name: "Richard Bernstein Advisors",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
      allocationValue: 75000,
      value: 0.35,
    },
    {
      name: "Russell Investments Hybrid",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200813141-S6Gir9W5rAodbYiz6/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Russell Investments - Risk Assist",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200813141-S6Gir9W5rAodbYiz6/public",
      allocationValue: 50000,
      value: 0.2,
    },
    {
      name: "SEI",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200826673-SrsGSct7663FqhLP6/public",
      allocationValue: 50000,
      value: 0.15,
    },
    {
      name: "State Street - ETF",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200832741-G3Ft4AQcTEnTHk3Xf/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "State Street - Risk Assist",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200832741-G3Ft4AQcTEnTHk3Xf/public",
      allocationValue: 50000,
      value: 0.2,
    },
    {
      name: "Symmetry Partners - Panoramic",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200832741-G3Ft4AQcTEnTHk3Xf/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Symmetry Partners - Risk Assist",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200843120-Xkcw46SX28GEvxZYv/public",
      allocationValue: 50000,
      value: 0.2,
      value: 0,
    },
    {
      name: "Symmetry Partners - Structured Bond",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200851941-xiK7nTqkLZj7i8FPN/public",
      allocationValue: 50000,
      value: 0.23,
      value: 0,
    },
    {
      name: "Vanguard",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200859314-pNBhrbAZxNFaToMBz/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Vanguard - Core",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200859314-pNBhrbAZxNFaToMBz/public",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "T. Rowe Price - Low Duration Short Term & Short Term Plus",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "T. Rowe Price - Low Duration Capital Pres & Ultra-Short",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
      allocationValue: 50000,
      value: 0,
    },
    {
      name: "Voya Investment Management",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200886594-ZMeYNzpf8NNxvN2eA/public",
      allocationValue: 50000,
      value: 0.25,
    },
  ];

  return (
    <div>
      {numericAcountValue > 10000 ? (
        <div>
          <div>
            <h3 style={{ margin: "0px", marginBottom: "10px" }}>
              Select MF/ETF Strategists
            </h3>
            <div className={Styles.imagesContainer}>
              {MFEFT.map((item) => {
                const isSelected = selectedMFEFTItems.some(
                  (selectedItem) => selectedItem.name === item.name
                );
                return (
                  <div
                    key={item.name}
                    className={Styles.imageLabelContainer}
                    onClick={() =>
                      toggleSelection(
                        item,
                        selectedMFEFTItems,
                        setSelectedMFEFTItems
                      )
                    }
                  >
                    <div className={Styles.imageContainer}>
                      <img
                        className={Styles.imgtag}
                        src={item.url}
                        alt="image"
                      />
                      {isSelected && (
                        <div className={Styles.tickIcon}>
                          <CheckCircleIcon
                            sx={{
                              width: "18px",
                              height: "18px",
                              color: "#004964",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <p className={Styles.imageTitle}>{item.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={Styles.esContainer}>
            <h3 style={{ margin: "0px", marginBottom: "10px" }}>
              Select Equity SMA Strategists
            </h3>
            <div className={Styles.imagesContainer}>
              {EquitySma.map((item) => {
                const isSelected = selectedEquitySMAItems.some(
                  (selectedItem) => selectedItem.name === item.name
                );
                return (
                  <div
                    key={item.name}
                    className={Styles.imageLabelContainer}
                    onClick={() =>
                      toggleSelection(
                        item,
                        selectedEquitySMAItems,
                        setSelectedEquitySMAItems
                      )
                    }
                  >
                    <div className={Styles.imageContainer}>
                      <img
                        className={Styles.imgtag}
                        src={item.url}
                        alt="image"
                      />
                      {isSelected && (
                        <div className={Styles.tickIcon}>
                          <CheckCircleIcon
                            sx={{
                              width: "18px",
                              height: "18px",
                              color: "#004964",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <p className={Styles.imageTitle}>{item.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
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

export default Umasma;
