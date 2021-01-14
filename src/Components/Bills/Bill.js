import React from 'react'

function Bill({bill}) {
    return (
        <div className='list li'>
           <tr>
               {bill.name}  {bill.amount}  {bill.amtPaid}
           </tr>
        </div>
    )
}

export default Bill
