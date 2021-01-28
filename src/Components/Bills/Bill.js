import React, { useState } from "react";
import config from "../../config";

function Bill(props) {
  const bill = props.bill;
  const [hide, setHide] = useState("hidden");
  const [show, setShow] = useState("");
  const [paid, setPaid] = useState();

  const expand = () => {
    show === "" ? setShow("hidden") : setShow("");
    hide === "hidden" ? setHide("expand") : setHide("hidden");
  };

  const amountRemaining = () => {
    return bill.bill_amt - bill.amt_paid;
  };

  const handleEdit = (e) => {
    expand();
    props.submit(paid);
  };
  async function handleDelete(e) {
    try {
      const response = await fetch(
        `${config.API_ENDPOINT}/api/bills/${bill.id}`,
        {
          method: "DELETE",
          headers: { token: localStorage.token },
        }
      );
      const parseRes = await response.json();

      console.log(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <tr>
      <button onClick={(e) => handleDelete(e)}>x</button>
      <td>{bill.bill_name}</td>
      <td>${bill.bill_amt}</td>
      <td>${bill.amt_paid}</td>
      <td>${amountRemaining()}</td>
      {/* <p className={show}  onClick={expand}>${bill.amt_paid}</p>
         <p className={hide}>$<input type='text' value={paid} onChange={(e)=>setPaid(e.target.value)}/> <button onClick={(e)=>handleEdit(e)}> + </button></p> */}
    </tr>
  );
}

export default Bill;
