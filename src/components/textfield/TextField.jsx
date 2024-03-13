import Styles from "./textfield.module.css";

const TextField = ({ type, onChange, value, onBlur, error, onFocus }) => {
  return (
    <>
      <input
        className={`${Styles.inputField} ${error ? Styles.error : ""}`}
        inputMode="numeric"
        type={type}
        onChange={onChange}
        value={value}
        pattern="\d*"
        onBlur={onBlur}
        onFocus={onFocus}
      ></input>
    </>
  );
};
export default TextField;
