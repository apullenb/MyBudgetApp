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
        <div className='dashboard'>
            <section className='headline'><h1>My Dashboard</h1>
            <h4>Today Is: {dateToday} </h4>
            </section>
            <h2>Current Month: {month}</h2>
           
            <section className='grid'>
             <div><IncomeList month={month} total={getIncTotal} /></div>
             <div><Remainder month={month} income={incTotal} billsDue= {billTotal} /></div>
            <div><BillsList month={month} total={getBillsTotal} /></div>
            <div><DebtList month={month} /></div>
            </section>
        </div>
    )
}

export default Dashboard
