import Styles from "./button.module.css";

const Button = ({ text, onClick }) => {
  return (
    <button className={Styles.btn} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
