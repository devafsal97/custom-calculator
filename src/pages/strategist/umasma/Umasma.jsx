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
  } = useAppContext();

  const toggleSelection = (itemName, array, setArray) => {
    if (array.includes(itemName)) {
      setArray(array.filter((item) => item !== itemName));
    } else {
      setArray([...array, itemName]);
    }
  };

  const EquitySma = [
    {
      name: "12th Street Asset Management",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200917690-zANBYNJ7EmCmRvifL/public",
    },
    {
      name: "Aligned Investors",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
    },
    {
      name: "Aristotle Capital",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200928234-LGpBKq85pqpsXfYAS/public",
    },
    {
      name: "Aristotle Boston",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200928234-LGpBKq85pqpsXfYAS/public",
    },
    {
      name: "Atlanta Capital",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200947509-tE74KGRw3juxHbfJ3/public",
    },
    {
      name: "Berkshire Asset Management",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200953973-68QRBKE3XsNaxndHa/public",
    },
    {
      name: "Boston Advisors",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200962624-vFok3HsWgMNadMiNJ/public",
    },
    {
      name: "Capital Group",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200978950-CLJd6s6TLShos3A2K/public",
    },
    {
      name: "Dearborn Partners",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200985853-5HLxW3aZwD6JhuhgM/public",
    },
    {
      name: "Duff & Phelps",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200992659-vW6h6hWPtPugegC4G/public",
    },
    {
      name: "EDGE Asset Management Inc",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201006684-tEiwT2czRAJtySge9/public",
    },
    {
      name: "Harding Loevner",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201014305-e7EHgkK6D2CCzGu9q/public",
    },
    {
      name: "Invesco",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201026950-hw5tmNBnBZn4ARr6g/public",
    },
    {
      name: "Kayne Anderson Rudnic",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
    },
    {
      name: "Kennedy Capital Management",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
    },
    {
      name: "Lazard Asset Management",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201078407-RP8Ta8LeEkqPw67Kq/public",
    },
    {
      name: "Morningstar - Tortoise & Hare Strategies",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201090585-ZD9GtgshLy4xDhXPg/public",
    },
    {
      name: "Polen Capital Management",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201094947-83LTPh5ujSGxfJ9GR/public",
    },
    {
      name: "Principal Global Investors - US Real Estate",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201100134-FiehNNMHD5MCuwRG2/public",
    },
    {
      name: "Principal Spectrum",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201100134-FiehNNMHD5MCuwRG2/public",
    },
    {
      name: "Renaissance",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201113593-NfPPs2PXmXp4grKYz/public",
    },
    {
      name: "Schafer Cullen",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201119490-H7cXchKmPqLZNBvNQ/public",
    },
    {
      name: "Trillium",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201125344-XC2nRqLWRkAJQfnz2/public",
    },
    {
      name: "T. Rowe Price - US Blue Chip Growth & US Value Equity",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
    },
    {
      name: "Zacks",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702201140424-Mpbhk7Fwmrk8ZYSJC/public",
    },
  ];

  const MFEFT = [
    {
      name: "3EDGE Asset Management",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200491818-7xQqFr6jds5LmGLqD/public",
    },
    {
      name: "American Funds - Standard & Tax-aware",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200510992-XDHNWfQxhk4zdPWBR/public",
    },
    {
      name: "American Funds - Retirement Income",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200510992-XDHNWfQxhk4zdPWBR/public",
    },
    {
      name: "BlackRock - Long Horizon ETF",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200526890-yLgD6MRXxJTfQs2Zz/public",
    },
    {
      name: "BlackRock - Target Allocation",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200526890-yLgD6MRXxJTfQs2Zz/public",
    },
    {
      name: "Brinker Capital",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200543690-5yzhZyiJE6qtriZDd/public",
    },
    {
      name: "Fidelity Institutional Asset Management - Fixed Income",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200560321-bokT3tCLzkPjGsAaG/public",
    },
    {
      name: "Fidelity Institutional Asset Management - Index Focused",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200560321-bokT3tCLzkPjGsAaG/public",
    },
    {
      name: "First Trust",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200599653-jpgGiWewWH4GLrfoN/public",
    },
    {
      name: "Franklin Templeton - Alternative Completion",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200606354-gmyPXWReqfqFLxkct/public",
    },
    {
      name: "Franklin Templeton - Core",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200606354-gmyPXWReqfqFLxkct/public",
    },
    {
      name: "Franklin Templeton - Diversified ESG",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200606354-gmyPXWReqfqFLxkct/public",
    },
    {
      name: "Goldman Sachs",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200643696-ypQ5P8mZEQKEqncPp/public",
    },
    {
      name: "Horizon - ETF",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200653745-QCbWKFrBc8Q6uDEoq/public",
    },
    {
      name: "Horizon Investments - Hybrid",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200653745-QCbWKFrBc8Q6uDEoq/public",
    },
    {
      name: "Horizon Investments - Risk Assist",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200653745-QCbWKFrBc8Q6uDEoq/public",
    },
    {
      name: "Horizon Investments - Real Spend",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200653745-QCbWKFrBc8Q6uDEoq/public",
    },
    {
      name: "iM Global Partner - Standard, Tax-sensitive & ETF",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200696737-XaeQNYx8m5DmLeo7d/public",
    },
    {
      name: "iM Global Partner - ESG",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200696737-XaeQNYx8m5DmLeo7d/public",
    },
    {
      name: "JP Morgan",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200714651-ZMRxsmLPDGahE7ZKx/public",
    },
    {
      name: "Morningstar",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200726982-5XN75u9tZor9Zc3sL/public",
    },
    {
      name: "Morningstar Active/Passive",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200726982-5XN75u9tZor9Zc3sL/public",
    },
    {
      name: "Morningstar - ETF",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200726982-5XN75u9tZor9Zc3sL/public",
    },
    {
      name: "Nuveen - Core ESG",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200740725-eyxszZcTfAmZ8Zj7e/public",
    },
    {
      name: "Nuveen - ESG & Tax-exempt",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200740725-eyxszZcTfAmZ8Zj7e/public",
    },
    {
      name: "Ocean Park",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200756894-QnFWMLaJguwWGjcCt/public",
    },
    {
      name: "OneAscent Investment Solutions",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200762143-6J5LFnJaZZ9K4bmXn/public",
    },
    {
      name: "PIMCO - Fixed Income",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200771206-GtXk2y7kzSdLnMsZM/public",
    },
    {
      name: "PIMCO - Tax-aware Fixed Income",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200771206-GtXk2y7kzSdLnMsZM/public",
    },
    {
      name: "PMC",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200780255-uYjXAFjF2iJWjSRZC/public",
    },
    {
      name: "Principal Global Investors - Dynamic Distribution",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200786806-jg8PfdPFesqjprRfd/public",
    },
    {
      name: "Principal Global Investors - Public Growth / Public Income",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200786806-jg8PfdPFesqjprRfd/public",
    },
    {
      name: "Richard Bernstein Advisors",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
    },
    {
      name: "Russell Investments Hybrid",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200813141-S6Gir9W5rAodbYiz6/public",
    },
    {
      name: "Russell Investments - Risk Assist",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200813141-S6Gir9W5rAodbYiz6/public",
    },
    {
      name: "SEI",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200826673-SrsGSct7663FqhLP6/public",
    },
    {
      name: "State Street - ETF",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200832741-G3Ft4AQcTEnTHk3Xf/public",
    },
    {
      name: "State Street - Risk Assist",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200832741-G3Ft4AQcTEnTHk3Xf/public",
    },
    {
      name: "Symmetry Partners - Panoramic",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200832741-G3Ft4AQcTEnTHk3Xf/public",
    },
    {
      name: "Symmetry Partners - Risk Assist",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200843120-Xkcw46SX28GEvxZYv/public",
    },
    {
      name: "Symmetry Partners - Structured Bond",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200851941-xiK7nTqkLZj7i8FPN/public",
    },
    {
      name: "Vanguard",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200859314-pNBhrbAZxNFaToMBz/public",
    },
    {
      name: "Vanguard - Core",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200859314-pNBhrbAZxNFaToMBz/public",
    },
    {
      name: "T. Rowe Price - Low Duration Short Term & Short Term Plus",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
    },
    {
      name: "T. Rowe Price - Low Duration Capital Pres & Ultra-Short",
      url: "https://www.convertcalculator.com/img/image-placeholder.svg",
    },
    {
      name: "Voya Investment Management",
      url: "https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/E7qZoMCWAJg5FN2xd-1702200886594-ZMeYNzpf8NNxvN2eA/public",
    },
  ];

  return (
    <div>
      <div>
        <h3 style={{ margin: "0px", marginBottom: "10px" }}>
          Select MF/ETF Strategists
        </h3>
        <div className={Styles.imagesContainer}>
          {MFEFT.map((item) => {
            const isSelected = selectedMFEFTItems.includes(item.name);
            return (
              <div
                key={item.name}
                className={Styles.imageLabelContainer}
                onClick={() =>
                  toggleSelection(
                    item.name,
                    selectedMFEFTItems,
                    setSelectedMFEFTItems
                  )
                }
              >
                <div className={Styles.imageContainer}>
                  <img className={Styles.imgtag} src={item.url} alt="image" />
                  {isSelected && (
                    <div className={Styles.tickIcon}>
                      <CheckCircleIcon
                        sx={{ width: "18px", height: "18px", color: "#004964" }}
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
            const isSelected = selectedEquitySMAItems.includes(item.name);
            return (
              <div
                key={item.name}
                className={Styles.imageLabelContainer}
                onClick={() =>
                  toggleSelection(
                    item.name,
                    selectedEquitySMAItems,
                    setSelectedEquitySMAItems
                  )
                }
              >
                <div className={Styles.imageContainer}>
                  <img className={Styles.imgtag} src={item.url} alt="image" />
                  {isSelected && (
                    <div className={Styles.tickIcon}>
                      <CheckCircleIcon
                        sx={{ width: "18px", height: "18px", color: "#004964" }}
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
  );
};

export default Umasma;
