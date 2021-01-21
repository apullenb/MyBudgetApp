import React from 'react'
import Income from './Income'

function IncomeList() {
    const handleSubmit = (value) => {
        console.log('submitted!' + value)
    }
    const income = [
        {id: 1, name: 'Salary', amount: '1550'},
        {id: 2, name: 'Side Hustle', amount: '1820'},           
    ]

    function totalIncome() {
        let total = 0
        for(let i=0; i < income.length; i++){
            total = parseInt(income[i].amount) + total
        }
        return total
    }
   
    
    return (
        <div className='bills'>
            <h3>Income</h3>
            <table>
                <tr>
                <th> </th> <th className='head'>Source</th>  <th className='head'>Amount</th> 
                </tr>
            {income.map(source => {
             return <Income key ={source.id} income={source} submit={handleSubmit} />
            })}
            <tr>
            <th> </th>  <th> </th> <th>Total: {' '} ${totalIncome()}</th> 
            </tr>
             </table>
             </div>
    )
}

export default IncomeList
