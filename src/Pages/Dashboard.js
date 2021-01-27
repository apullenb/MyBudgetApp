import React, {useState} from 'react'
import BillsList from '../Components/Bills/BillsList'
import DebtList from '../Components/Debt/DebtList'
import IncomeList from '../Components/Income/IncomeList'
import moment from "moment";

function Dashboard() {
        const [incTotal, setIncTotal] =useState('')

    let newDate = new Date()
    let dateToday = moment(newDate).format("LLLL")
    let month = moment(newDate).format('MMMM')

    function getTotal(value) {
        setIncTotal(value)
       console.log(value.amount)
    }

    return (
        <div>
            <h2>My Dashboard</h2>
            <h4>Today Is: {dateToday} </h4>
            <h2>Current Month: {month}</h2>
            <section className='dashboard'>
             <div><IncomeList month={month} total={getTotal} /></div>
            <div><BillsList /></div>
            <div><DebtList /></div>
            </section>
        </div>
    )
}

export default Dashboard
