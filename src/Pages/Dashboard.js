import React, { useState, useEffect } from "react";
import config from '../config'
import BillsList from "../Components/Bills/BillsList";
import DebtList from "../Components/Debt/DebtList";
import IncomeList from "../Components/Income/IncomeList";
import moment from "moment";
import Remainder from "../Components/Remainder";

function Dashboard(props) {
  async function getUserInfo() {
    try {
        const token = localStorage.getItem('token')
      const response = await fetch(`${config.API_ENDPOINT}/api/users/`, {
        method: "GET",
        headers: { "content-type": "application/json", token: `${token}` },
      });
      const parseRes = await response.json();
      console.log(parseRes)
      setUser(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getUserInfo()
  }, []);

  function logOut() {
      localStorage.removeItem('token')
      props.setAuth(false)
  }

  const [incTotal, setIncTotal] = useState("");
  const [billTotal, setBillTotal] = useState("");
  const [user, setUser] = useState("");
  console.log(user)
  let newDate = new Date();
  let dateToday = moment(newDate).format("LL");
  let month = moment(newDate).format("MMMM");
  
  

  function getIncTotal(value) {
    setIncTotal(value);
  }
  function getBillsTotal(value) {
    setBillTotal(value);
  }

  return (
    <div className="dashboard">
         <h1 style={{margin:' 1px 25px', paddingLeft:'25px', color:'white', backgroundColor:'#95bd31'}}>My Dashboard <button style={{float:'right', padding:'6px 9px', fontSize:'15px'}} onClick={logOut}>LOG OUT</button></h1>
         
      <section className="headline">
        <h2>Hello, {user.first_name}!</h2>
        <h4 style={{color:'#96bddc'}}>Today Is: {dateToday}  </h4>
        
      </section>
      <h2 className="headline">Current Budget Month: {month}</h2>

      <section className="grid">
        <div>
          <IncomeList month={month} total={getIncTotal} />
        </div>
        <div>
          <Remainder month={month} income={incTotal} billsDue={billTotal} />
        </div>
        <div>
          <BillsList month={month} total={getBillsTotal} />
        </div>
        <div>
          <DebtList month={month} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
