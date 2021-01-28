import React, { useState } from "react";
import config from "../../config";

function AddIncome(props) {
  const month = props.month;

  const [inputs, setInputs] = useState({
    source: "",
    amount: "",
  });

  const { source, amount } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      source,
      amount,
      month,
    };
    console.log(body);
    if (inputs === "") {
      return alert("Please fill out all fields");
    }
    const token = localStorage.getItem("token");
    const response = await fetch(`${config.API_ENDPOINT}/api/income`, {
      method: "POST",
      headers: { "content-type": "application/json", token: `${token}` },
      body: JSON.stringify(body),
    });
    const parseRes = await response.json();
    if (parseRes.error) {
      alert(parseRes.error);
      console.error(parseRes.error);
    } else {
      alert("Success! Your Entry Has Been Posted!");
      props.history.push("/Dashboard");
    }
  };

  return (
    <div>
      <span>
        Income Source:{" "}
        <input
          type="text"
          name="source"
          onChange={(e) => onChange(e)}
          value={source}
        />
      </span>
      <span>
        {" "}
        Income Amount: $
        <input
          type="text"
          name="amount"
          onChange={(e) => onChange(e)}
          value={amount}
          required
        />
      </span>{" "}
      <span>
        {" "}
        <button onClick={onSubmit}> Submit</button>
      </span>
    </div>
  );
}

export default AddIncome;
