import React from 'react'
import Bill from './Bill'

function BillsList() {
    const bills = [
        {id: 1, name: 'Car Payment', amount: '550', amtPaid: '550'},
        {id: 2, name: 'Car Insurance', amount: '240', amtPaid: '120'},   
        {id: 3, name: 'Mortgage', amount: '2550', amtPaid: '0'},         
        {id: 4, name: 'Water', amount: '120', amtPaid: '0'},
        {id: 5, name: 'Electricity', amount: '150', amtPaid: '0'},
    ]

    

    return (
        <div  className='bills'>
            <h3>Bills</h3>
            <table>
                <tr>
                    <th>Bill Name</th>  <th>Amount Due</th>  <th>Amount Paid</th>
                </tr>
            {bills.map(bill => {
             return <tr><td className='li' key ={bill.id}>{bill.name}</td><td>{bill.amount}</td><td>{bill.amtPaid}</td></tr>
            })}
             </table>
        </div>
    )
}

export default BillsList
