import React, { useState } from "react";
import config from "../../config";

function AddDebt(props) {
  const month = props.month;

  const [inputs, setInputs] = useState({
    name: "",
    start_bal: "",
    curr_bal: "",
    monthly_min: "",
    amt_paid: 0,
  });

  const { name, start_bal, curr_bal, monthly_min, amt_paid } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name,
      start_bal,
      curr_bal,
      monthly_min,
      amt_paid,
      month,
    };

    if (inputs === "") {
      return alert("Please fill out all fields");
    }
    const token = localStorage.getItem("token");
    const response = await fetch(`${config.API_ENDPOINT}/api/debt`, {
      method: "POST",
      headers: { "content-type": "application/json", token: `${token}` },
      body: JSON.stringify(body),
    });
    const parseRes = await response.json();
    if (parseRes.error) {
      alert("Please Fill Out All Fields or Cancel!");
      console.error(parseRes.error);
    } else {
      props.close();
      setInputs({
        name: "",
        start_bal: "",
        curr_bal: "",
        monthly_min: "",
        amt_paid: "0",
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
      <h3>Add New Debt</h3>
      <span>
        Debt Name:{" "}
        <input
          style={{ marginLeft: "1px", marginRight: "8px", padding: "0px 55px" }}
          type="text"
          name="name"
          onChange={(e) => onChange(e)}
          value={name}
        />
      </span>
      <span>
        {" "}
        Starting Balance: $
        <input
          style={{ marginLeft: "1px", marginRight: "8px", padding: "0px 5px" }}
          type="text"
          name="start_bal"
          onChange={(e) => onChange(e)}
          value={start_bal.replace(/,/g, "")}
          required
        />
      </span>
      <span>
        {" "}
        Current Balance: $
        <input
          style={{ marginLeft: "1px", marginRight: "8px", padding: "0px 5px" }}
          type="text"
          name="curr_bal"
          value={curr_bal.replace(/,/g, "")}
          onChange={(e) => onChange(e)}
        />
      </span>
      <span>
        {" "}
        Monthly Min: $
        <input
          style={{ marginLeft: "1px", marginRight: "8px", padding: "0px 5px" }}
          type="text"
          name="monthly_min"
          value={monthly_min.replace(/,/g, "")}
          onChange={(e) => onChange(e)}
        />
      </span>
      {/* <span> Amount Paid:
              <input
              type="text"
              name="amt_paid"
              value={amt_paid.replace(/,/g, '')}
              onChange={(e)=> onChange(e)}
            /></span> */}{" "}
      <span>
        {" "}
        <button onClick={onSubmit}> Submit</button>
      </span>
    </div>
  );
}

export default AddDebt;
