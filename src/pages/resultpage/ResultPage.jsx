import Styles from "./resultpage.module.css";
import Button from "../../components/button/Button";
import TabComponent from "../../components/tab/Tab";

const ResultPage = () => {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.Container}>
        <div className={Styles.leftContainer}>
          <div className={Styles.fpFeeTitleAndDescription}>
            <h1 className={Styles.title}>Your Results</h1>
            <p style={{ margin: "0px" }}>
              Your estimated client account fee are displayed below based on the
              information entered
            </p>
            <div className={Styles.flContainer}>
              <button className={Styles.featureListButton}>
                Go Back and Make Adjustments
              </button>
            </div>
          </div>
          <div>
            <TabComponent></TabComponent>
          </div>
        </div>
        <div className={Styles.rightContainer}>
          <h2 className={Styles.rightTitle}>More Tools</h2>
          <h3 className={Styles.rightTitle}>Start a new calculation</h3>
          <Button text="Start new calculation"></Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
