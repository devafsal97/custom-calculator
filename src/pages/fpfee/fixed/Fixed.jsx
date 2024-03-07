import TextField from "../../../components/textfield/TextField";
const Fixed = ({ onFixedValueChange, fixedValue, onFixedBlur }) => {
  return (
    <div>
      <h2>Enter Fixed Fee ($)</h2>
      <p>
        Maximum Financial Professional Fee for Advisor-directed and
        Team-directed is 2.25%; CAAP and UMA is 2.15%.
      </p>
      <p>A fixed annual dollar amount; billed monthly or quarterly.</p>
      <TextField
        type="text"
        value={fixedValue}
        onBlur={onFixedBlur}
        onChange={onFixedValueChange}
      ></TextField>
    </div>
  );
};
export default Fixed;
