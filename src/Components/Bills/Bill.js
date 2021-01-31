import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../../config";

function Bill(props) {
  const bill = props.bill;
  const [hide, setHide] = useState("hidden");
  const [show, setShow] = useState("edit");
  const [paid, setPaid] = useState(bill.amt_paid);

  const expand = () => {
    show === "edit" ? setShow("hidden") : setShow("edit");
    hide === "hidden" ? setHide("expand") : setHide("hidden");
  };

  const amountRemaining = () => {
    return (bill.bill_amt - bill.amt_paid).toLocaleString();
  };

  async function handleEdit(e) {
    const body = { amt_paid: paid };
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
    const response = await fetch(
      `${config.API_ENDPOINT}/api/bills/${bill.id}`,
      {
        method: "DELETE",
        headers: { token: localStorage.token },
      }
    );
    const parseRes = await response;
    if (parseRes.error) {
      console.error(parseRes.error);
    } else {
      props.getAll();
    }
  }

  return (
    <tr>
      <button id="x" onClick={(e) => handleDelete(e)}>
        x
      </button>
      <td>{bill.bill_name}</td>
      <td>${bill.bill_amt.toLocaleString()}</td>
      <td>
        <p className={show} onClick={expand}>
          ${bill.amt_paid}{" "}
          <FontAwesomeIcon
            icon="pen"
            style={{ fontSize: "15px", marginLeft: "5px", color: "#1f3564" }}
          />
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
