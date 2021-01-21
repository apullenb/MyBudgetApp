import React from 'react'
import Debt from './Debt'

function DebtList() {
   
    const handleSubmit = (value) => {
        console.log('submitted!' + value)
    }
    const bills = [
        {id: 1, name: 'Student Loan', curr_bal: '35,550', monthly_min: '150', amt_paid: '150'},
        {id: 2, name: 'Credit Card', curr_bal: '550', monthly_min: '185', amt_paid: '0'},   
        {id: 3, name: 'Mortgage', curr_bal: '378,550', monthly_min: '2,550', amt_paid: '1250'},         
        {id: 4, name: 'Furniture', curr_bal: '2,550', monthly_min: '124', amt_paid: '0'},
        {id: 5, name: 'Truck', curr_bal: '32,550', monthly_min: '498', amt_paid: '0'},
    ]

    function totalDue() {
        let total = 0
        for(let i=0; i < bills.length; i++){
            total = parseInt(bills[i].monthly_min) + total
        }
        return total
    }
    function totalPaid(){
        let total = 0
        for(let i=0; i < bills.length; i++){
            total = parseInt(bills[i].amt_paid) + total
        }
        return total
    }
    return (
        <div className='bills'>
            <h3>Long Term Debt</h3>
            
            <table>
                <tr>
                <th> </th>    <th className='head'>Name</th>  <th className='head'>Current Balance</th>  <th className='head'>Monthly Minimum</th> <th className='head'>Amount Paid</th>
                </tr>
            {bills.map(bill => {
             return <Debt key ={bill.id} bill={bill} submit={handleSubmit} />
            })}
            <tr>
            <th> </th>  <th> </th> <th>Total: {' '} ${totalDue()}</th> <th>Total Paid: {' '} ${totalPaid()}</th>
            </tr>
             </table>
        </div>
    )
}

export default DebtList
