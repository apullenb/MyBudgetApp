import React, { useState, useEffect } from "react";
import config from "../../config";
import Bill from "./Bill";
import AddBill from "./AddBill";

function BillsList(props) {
  const [bills, setBills] = useState("");
  const [display, setDisplay] = useState("hidden");

  function addNew() {
    display === "hidden" ? setDisplay("expand") : setDisplay("hidden");
  }

  async function getAllBills() {
    try {
      const response = await fetch(`${config.API_ENDPOINT}/api/bills`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setBills(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getAllBills();
  }, []);

  const handleSubmit = (value) => {
  };

  let amountDue = totalDue() - totalPaid();

  props.total(amountDue);

  function totalDue() {
    let total = 0;
    for (let i = 0; i < bills.length; i++) {
      total = parseInt(bills[i].bill_amt) + total;
    }
    return total;
  }
  function totalPaid() {
    let total = 0;
    for (let i = 0; i < bills.length; i++) {
      total = parseInt(bills[i].amt_paid) + total;
    }

    return total;
  }
  return (
    <div className="bills">
      <h3>Bills</h3>
      {bills.length === 0 ? (
        <h4 style={{ textAlign: "center", fontWeight: "600", color: "red" }}>
          No bills Added yet
        </h4>
      ) : (
        <div></div>
      )}
      <table>
        <tr>
          <th> </th>
          <th className="head">Bill Name</th>
          <th className="head">Amount Due</th>
          <th className="head">Amount Paid</th>
          <th className="head">Balance Due </th>
        </tr>
        {bills.length ? (
          bills.map((source) => {
            return (
              <Bill
                key={source.id}
                bill={source}
                submit={handleSubmit}
                getAll={getAllBills}
              />
            );
          })
        ) : (
          <div></div>
        )}
        <th> </th>
        <th>
          {display === "hidden" && <button onClick={addNew}>+ Add</button>}
        </th>
        <th className="head">Total: ${totalDue()}</th>{" "}
        <th className="head">Total Paid: ${totalPaid()}</th>
        <th className="head">Total Due: ${amountDue.toLocaleString()}</th>
      </table>
      <section className={display}>
        <AddBill month={props.month} getAll={getAllBills} close={addNew} />
        <button onClick={addNew}>Cancel</button>
      </section>
    </div>
  );
}

export default BillsList;
