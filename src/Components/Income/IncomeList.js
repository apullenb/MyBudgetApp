import React, { useState, useEffect } from "react";
import config from "../../config";
import AddIncome from "./AddIncome";
import Income from "./Income";

function IncomeList(props) {
  const [income, setIncome] = useState("");
  const [display, setDisplay] = useState("hidden");

  function addNew() {
    display === "hidden" ? setDisplay("expand") : setDisplay("hidden");
  }

  async function getallIncome() {
    try {
      const response = await fetch(`${config.API_ENDPOINT}/api/income`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setIncome(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getallIncome();
  }, []);

  const handleSubmit = (value) => {
    
  };

  function totalIncome() {
    let total = 0;
    for (let i = 0; i < income.length; i++) {
      total = parseInt(income[i].amount) + total;
    }
    props.total(total);
    return total;
  }

  return (
    <div className="bills">
      <h3>Income</h3>
      {income.length === 0 ? (
        <h4 style={{ textAlign: "center", fontWeight: "600", color: "red" }}>
          no income added yet
        </h4>
      ) : (
        <div></div>
      )}
      <table>
        <tr>
          <th> </th> <th className="head">Source</th>{" "}
          <th className="head">Amount</th>
        </tr>
        {income.length ? (
          income.map((source) => {
            return (
              <Income
                key={source.id}
                income={source}
                submit={handleSubmit}
                getAll={getallIncome}
              />
            );
          })
        ) : (
          <div></div>
        )}
        <tr>
          <th> </th>{" "}
          <th>
            {display === "hidden" && <button onClick={addNew}>+ Add</button>}{" "}
          </th>{" "}
          <th className="head">Total: ${totalIncome().toLocaleString()}</th>
        </tr>{" "}
      </table>
      <section className={display}>
        {" "}
        <AddIncome
          month={props.month}
          getAll={getallIncome}
          close={addNew}
        />{" "}
        <button onClick={addNew}>Cancel</button>{" "}
      </section>
    </div>
  );
}

export default IncomeList;
