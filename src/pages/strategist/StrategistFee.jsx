import TabComponent from "../../components/tab/Tab";
import Button from "../../components/button/Button";
import Styles from "./strategist.module.css";
import TeamDirected from "./teamdirected/TeamDirected";
import StrategistCaap from "./strategistcaap/StrategistCaap";
import CaapSas from "./caapsas/CaapSas";
import Umasma from "./umasma/Umasma";
import { useAppContext } from "../../context/AppContext";

const Strategist = ({ onNavigate }) => {
  const { fpFee, setFpFee } = useAppContext();

  const onBackClickHandler = () => {
    onNavigate("ProgramFee");
  };

  const onClickHandler = () => {
    onNavigate("UmaSma");
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
