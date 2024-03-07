import TabComponent from "../../components/tab/Tab";
import Button from "../../components/button/Button";
import Styles from "./strategist.module.css";
import TeamDirected from "./teamdirected/TeamDirected";
import StrategistCaap from "./strategistcaap/StrategistCaap";
import CaapSas from "./caapsas/CaapSas";
import Umasma from "./umasma/Umasma";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import {
  StrategistCaapSassConst,
  StrategistCaapConst,
} from "../../constants/Constants";
const Strategist = ({ onNavigate }) => {
  const {
    fpFee,
    setFpFee,
    rows,
    setRows,
    teamDirectedValue,
    accountValue,
    strategistCaapSas,
    strategistCaap,
  } = useAppContext();

  useEffect(() => {
    const updatedRows = rows.map((row) => {
      if (row.name === "Strategist Fee (if applicable)") {
        let percentageValue = 0;
        let calculatedValue = 0;

        if (fpFee === "Advisor-directed") {
          return { ...row, percentage: "N/A", value: "N/A" };
        } else if (fpFee === "Team-directed") {
          percentageValue =
            parseFloat(teamDirectedValue.replace("%", "")) / 100;
        } else if (fpFee === "CAAP Small Account Solutions") {
          percentageValue = StrategistCaapSassConst[strategistCaapSas] / 100;
        } else if (fpFee === "CAAP") {
          percentageValue = StrategistCaapConst[strategistCaap] / 100;
        }

        if (
          fpFee === "Team-directed" ||
          fpFee === "CAAP Small Account Solutions" ||
          fpFee === "CAAP"
        ) {
          const numericAccountValue = parseFloat(
            accountValue.replace(/[^0-9.-]+/g, "")
          );
          calculatedValue = numericAccountValue * percentageValue;

          let percentageDisplay =
            fpFee === "Team-directed"
              ? teamDirectedValue + "%"
              : fpFee === "CAAP"
              ? StrategistCaapConst[strategistCaap] + "%"
              : StrategistCaapConst[strategistCaapSas] + "%";

          return {
            ...row,
            percentage: percentageDisplay,
            value: `$${calculatedValue.toFixed(2)}`,
          };
        }

        return row;
      }
      return row;
    });

    setRows(updatedRows);
  }, [
    fpFee,
    teamDirectedValue,
    accountValue,
    strategistCaapSas,
    strategistCaap,
  ]);

  const onBackClickHandler = () => {
    onNavigate("ProgramFee");
  };

  const onClickHandler = () => {
    if (fpFee === "UMA/SMA") {
      onNavigate("UmaSma");
    } else {
      onNavigate("AdditionalPage");
    }
  };
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.Container}>
        <div
          className={
            fpFee !== "UMA/SMA" ? Styles.leftContainer : Styles.umssmaContainer
          }
        >
          <div className={Styles.navigator}>
            <div>
              <Button
                text="Back"
                onClick={onBackClickHandler}
                background="grey"
              ></Button>
            </div>
            <div>
              <Button
                onClick={onClickHandler}
                text="Next"
                background="grey"
              ></Button>
            </div>
            <div>
              <Button text="Reset" background="grey"></Button>
            </div>
          </div>
          <div className={Styles.sfTitleAndDescription}>
            <h1 className={Styles.title}>Strategist Fee</h1>
            <p style={{ margin: "0px" }}>
              The Strategist Fee covers costs associated with asset allocation
              and model trading services. Applicable to CAAP, UMA, and
              Team-directed.
            </p>
          </div>
          <div>
            {fpFee === "Team-directed" && <TeamDirected></TeamDirected>}
            {fpFee === "CAAP" && <StrategistCaap></StrategistCaap>}
            {fpFee === "CAAP Small Account Solutions" && <CaapSas></CaapSas>}
            {fpFee === "UMA/SMA" && <Umasma></Umasma>}
          </div>
        </div>
        {fpFee !== "UMA/SMA" && (
          <div className={Styles.rightContainer}>
            <h2 className={Styles.rightTitle}>Estimated Results</h2>
            <TabComponent></TabComponent>
          </div>
        )}
      </div>
      <div className={Styles.nextBtnContainer}>
        <Button text="Next →" onClick={onClickHandler}></Button>
      </div>
    </div>
  );
};
export default Strategist;
