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
      props.close();
      setInputs({
        source: "",
        amount: "",
      });
      props.getAll();
    }
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        backgroundColor: "#d4ebfd8e",
      }}
    >
      <h3>Add New Income</h3>
      <span>
        Income Source:{" "}
        <input
          style={{ marginLeft: "1px", marginRight: "8px", padding: "0px 55px" }}
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
          style={{ marginLeft: "1px", marginRight: "8px", padding: "0px 5px" }}
          type="text"
          name="amount"
          onChange={(e) => onChange(e)}
          value={amount.replace(/,/g, "")}
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
