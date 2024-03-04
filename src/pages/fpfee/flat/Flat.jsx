import TextField from "../../../components/textfield/TextField";

const Flat = () => {
  return (
    <div>
      <h2>Enter Flat Fee (%)</h2>
      <p>
        Maximum Financial Professional Fee for Advisor-directed and
        Team-directed is 2.25%; CAAP and UMA is 2.15%.
      </p>
      <p>
        A flat annual percentage fee based on the total account value; billed
        monthly or quarterly.
      </p>
      <TextField type="text"></TextField>
    </div>
  );
};
export default Flat;
