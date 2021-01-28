import React from 'react'

function Remainder(props) {
   const total = props.income - props.billsDue
    return (
        <div className='bills'>
            <h3>{props.month} Totals:</h3>
            <table>
                <th className='head'>Income</th> <th className='head'>Bills</th>
                <tr> <td>${props.income}</td> <td>${props.billsDue}</td>
                </tr><tr><th className='head'>Remaining Funds</th><th className='head'>${total}</th></tr>
                </table>
        </div>
    )
}

export default Remainder
