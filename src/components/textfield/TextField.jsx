import Styles from "./textfield.module.css";

const TextField = ({ type, onChange, value, onBlur }) => {
  return (
    <>
      <input
        className={Styles.inputField}
        inputMode="numeric"
        type={type}
        onChange={onChange}
        value={value}
        pattern="\d*"
        onBlur={onBlur}
      ></input>
    </>
  );
};
export default TextField;
