import React, { useState } from "react";
import config from "../../config";

function Bill(props) {
  const bill = props.bill;
  const [hide, setHide] = useState("hidden");
  const [show, setShow] = useState("");
  const [paid, setPaid] = useState(bill.amt_paid);

  const expand = () => {
    show === "" ? setShow("hidden") : setShow("");
    hide === "hidden" ? setHide("expand") : setHide("hidden");
  };

  const amountRemaining = () => {
    return (bill.bill_amt - bill.amt_paid).toLocaleString();
  };

  async function handleEdit(e) {
    const body = { amt_paid: paid.replace(/,/g, '') };
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${config.API_ENDPOINT}/api/bills/${bill.id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json", token: `${token}` },
        body: JSON.stringify(body),
      }
    );
    const parseRes = await response;
    if (parseRes.error) {
      console.error(parseRes.error);
    } else {
      expand();
      props.submit(paid);
      props.getAll();
    }
  }

  async function handleDelete(e) {
    try {
      const response = await fetch(
        `${config.API_ENDPOINT}/api/bills/${bill.id}`,
        {
          method: "DELETE",
          headers: { token: localStorage.token },
        }
      );
      props.getAll();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <tr>
      <button onClick={(e) => handleDelete(e)}>x</button>
      <td>{bill.bill_name}</td>
      <td>${bill.bill_amt.toLocaleString()}</td>
      <td>
        <p className={show} onClick={expand}>
          ${bill.amt_paid.toLocaleString()}
        </p>
        <p className={hide}>
          $
          <input
            type="text"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
          />{" "}
          <button onClick={(e) => handleEdit(e)}> + </button>
        </p>
      </td>
      <td>${amountRemaining()}</td>
    </tr>
  );
}

export default Bill;
