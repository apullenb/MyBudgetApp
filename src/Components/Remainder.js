import React from 'react'

function Remainder(props) {
   const total = props.income - props.billsDue
    return (
        <div className='bills'>
            <h3>Remaining Funds </h3>
            <p>(Before Debt Payments)</p>
                <td>${total}</td> 
                
        </div>
    )
}

export default Remainder
