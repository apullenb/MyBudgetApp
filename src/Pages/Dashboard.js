import React from 'react'
import BillsList from '../Components/Bills/BillsList'
import DebtList from '../Components/Debt/DebtList'

function Dashboard() {
    return (
        <div>
            <h2>My Dashboard</h2>
            <section className='dashboard'>
            <div><BillsList /></div>
            <div><DebtList /></div>
            </section>
        </div>
    )
}

export default Dashboard
