import Styles from "./button.module.css";

const Button = ({ text, onClick, background }) => {
  return (
    <button
      className={`${Styles.btn} ${
        background === "grey" ? Styles.special : null
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
