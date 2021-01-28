import React, {useState, useEffect} from 'react'
import BillsList from '../Components/Bills/BillsList'
import DebtList from '../Components/Debt/DebtList'
import IncomeList from '../Components/Income/IncomeList'
import moment from "moment";
import Remainder from '../Components/Remainder';

function Dashboard() {
        const [incTotal, setIncTotal] = useState('')
        const [billTotal, setBillTotal] = useState('')

    let newDate = new Date()
    let dateToday = moment(newDate).format("LL")
    let month = moment(newDate).format('MMMM')

    function getIncTotal(value) {
        setIncTotal(value)
    }
    function getBillsTotal(value){
        setBillTotal(value)
    }
    
    return (
        <div>
            <h2>My Dashboard</h2>
            <h4>Today Is: {dateToday} </h4>
            <h2>Current Month: {month}</h2>
            {incTotal}, {billTotal}
            <section className='dashboard'>
             <div><IncomeList month={month} total={getIncTotal} /></div>
             <div><Remainder month={month} income={incTotal} billsDue= {billTotal} /></div>
            <div><BillsList month={month} total={getBillsTotal} /></div>
            <div><DebtList month={month} /></div>
            </section>
        </div>
    )
}

export default Dashboard
