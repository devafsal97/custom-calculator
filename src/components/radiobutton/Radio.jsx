import Styles from "./radiobutton.module.css";

const Radio = ({ items, value, onChange }) => {
  return (
    <div>
      {items.map((item, index) => (
        <label key={index} className={Styles.container}>
          {item.label}
          <input
            type="radio"
            name="radio"
            checked={value === item.value}
            onChange={() => onChange(item.value)}
          />
          <span className={Styles.checkmark}></span>
        </label>
      ))}
    </div>
  );
};
export default Radio;
