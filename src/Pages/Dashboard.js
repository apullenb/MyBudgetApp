import React from 'react'
import BillsList from '../Components/Bills/BillsList'
import DebtList from '../Components/Debt/DebtList'
import IncomeList from '../Components/Income/IncomeList'

function Dashboard() {
    return (
        <div>
            <h2>My Dashboard</h2>
            <section className='dashboard'>
            <div><IncomeList /></div>
            <div><BillsList /></div>
            <div><DebtList /></div>
            </section>
        </div>
    )
}

export default Dashboard
