import React, {useState} from 'react'

function Debt(props) {
    const bill = props.bill
    const [hide, setHide] = useState('hidden')
    const [show, setShow] = useState('')
    const [paid, setPaid] = useState(bill.amt_paid)
    
    const expand = () => {
        show === '' ? setShow('hidden') : setShow('')
        hide === 'hidden' ? setHide('expand') : setHide('hidden')
    }
    const handleEdit = (e) => {
        expand()
        props.submit(paid)
    }
    const handleDelete = (e) => {
        console.log(paid)
    }


    return (
        <tr><button onClick={(e)=> handleDelete(e)}>x</button><td>{bill.name}</td><td>${bill.curr_bal}</td> <td>${bill.monthly_min}</td> <td><p className={show}  onClick={expand}>${bill.amt_paid}</p> <p className={hide}>$<input type='text' value={paid} onChange={(e)=>setPaid(e.target.value)}/> <button onClick={(e)=>handleEdit(e)}> + </button></p> </td></tr>
    )
}

export default Debt
