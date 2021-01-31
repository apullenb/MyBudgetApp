import React, { useState, useEffect } from "react";
import config from "../../config";
import AddDebt from "./AddDebt";
import Debt from "./Debt";

function DebtList(props) {
  const [debt, setDebt] = useState("");
  const [display, setDisplay] = useState("hidden");
  
  function addNew() {
    display === "hidden" ? setDisplay("expand") : setDisplay("hidden");
  }
  async function getallDebt() {
    try {
      const response = await fetch(`${config.API_ENDPOINT}/api/debt`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setDebt(parseRes);
      console.log(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  useEffect(() => {
    getallDebt();
  }, []);

  const handleSubmit = (value) => {
    console.log("submitted!" + value);
  };

  function totalMin() {
    let total = 0;
    for (let i = 0; i < debt.length; i++) {
      total = parseInt(debt[i].monthly_min) + total;
    }

    return total;
  }

  function totalCurrent() {
    let total = 0;
    for (let i = 0; i < debt.length; i++) {
      total = parseInt(debt[i].curr_bal) + total;
    }
    return total;
  }

  function totalPaid() {
    let total = 0;
    for (let i = 0; i < debt.length; i++) {
      total = parseInt(debt[i].amt_paid) + total;
    }
    return total;
  }
  return (
    <div className="bills">
      <h3>Long Term Debt</h3>
    {debt.length === 0 ? ( <div style={{textAlign:'center', fontWeight:'600', color:'red'}}>Add New Debt</div> ) : (<div></div> )}
      <table>
        <tr>
          <th> </th>
          <th className="head">Name</th>
          <th className="head">Starting Balance</th>
          <th className="head">Current Balance</th>
          <th className="head">Monthly Min</th>
          <th className="head">Payment Amount</th>
        </tr>
      
         {debt.length ? ( debt.map((source) => {
            return (
              <Debt
                key={source.id}
                debt={source}
                submit={handleSubmit}
                getAll={getallDebt}
              />
            )})
          ) : ( <div></div>) }
        <tr>
          <th> </th>
          <th className='head'>
            {display === "hidden" && (
              <button onClick={addNew}>+ Add</button>
            )}
          </th>
          <th> </th> <th className='head'> ${totalCurrent().toLocaleString()} </th>
          <th className='head'>${totalMin().toLocaleString()} </th>
          <th className='head'> ${totalPaid().toLocaleString()} </th>
        </tr>
      </table>
      <section className={display}>
        
        <AddDebt month={props.month} getAll={getallDebt} close={addNew} />
        <button onClick={addNew}>Cancel</button>
      </section>
    </div>
  );
}

export default DebtList;
