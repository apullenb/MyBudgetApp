import React from 'react'
import Bill from './Bill'

function BillsList() {

    const handleSubmit = (value) => {
        console.log('submitted!' + value)
    }
    const bills = [
        {id: 1, name: 'Car Payment', amount: '550', amtPaid: '550'},
        {id: 2, name: 'Car Insurance', amount: '240', amtPaid: '120'},   
        {id: 3, name: 'Mortgage', amount: '2550', amtPaid: '0'},         
        {id: 4, name: 'Water', amount: '120', amtPaid: '0'},
        {id: 5, name: 'Electricity', amount: '150', amtPaid: '0'},
    ]

    function totalDue() {
        let total = 0
        for(let i=0; i < bills.length; i++){
            total = parseInt(bills[i].amount) + total
        }
        return total
    }
    function totalPaid(){
        let total = 0
        for(let i=0; i < bills.length; i++){
            total = parseInt(bills[i].amtPaid) + total
        }
        return total
    }
    return (
        <div className='bills'>
            <h3>Bills</h3>
            <table>
                <tr>
                <th> </th>    <th className='head'>Bill Name</th>  <th className='head'>Amount Due</th>  <th className='head'>Amount Paid</th> 
                </tr>
            {bills.map(bill => {
             return <Bill key ={bill.id} bill={bill} submit={handleSubmit} />
            })}
            <tr>
            <th> </th>  <th> </th> <th>Total: {' '} ${totalDue()}</th> <th>Total Paid: {' '} ${totalPaid()}</th>
            </tr>
             </table>
        </div>
    )
}

export default BillsList
