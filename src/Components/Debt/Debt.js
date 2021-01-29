import React, { useState } from "react";
import config from "../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Debt(props) {
  const debt = props.debt;
  const [hide, setHide] = useState("hidden");
  const [show, setShow] = useState("edit");
  const [paid, setPaid] = useState(debt.amt_paid);

  const expand = () => {
    show === "" ? setShow("hidden") : setShow("");
    hide === "hidden" ? setHide("expand") : setHide("hidden");
  };
 
 

 
  async function handleEdit(e) {
      const body = {amt_paid: paid}
        const token = localStorage.getItem("token");
        const response = await fetch(`${config.API_ENDPOINT}/api/debt/${debt.id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json", token: `${token}` },
          body: JSON.stringify(body),
        });
        const parseRes = await response
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
       await fetch(
        `${config.API_ENDPOINT}/api/debt/${debt.id}`,
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
      <td>{debt.name}</td>
      <td>${debt.start_bal.toLocaleString()}</td>
      <td>${debt.curr_bal.toLocaleString()}</td> <td>${debt.monthly_min}</td>{" "}
      <td >
        <p className={show} onClick={expand}>
          ${debt.amt_paid.toLocaleString()} <FontAwesomeIcon icon="pen" style={{fontSize:'15px', marginLeft:'15px', color:'#1f3564'}}/>
        </p>{" "}
        <p className={hide}>
          $
          <input
            type="text"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
          />{" "}
          <button onClick={(e) => handleEdit(e)}> + </button>
        </p>{" "}
      </td>
    </tr>
  );
}

export default Debt;
