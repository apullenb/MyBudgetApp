import React, {useState} from 'react'

function Bill(props) {
    const bill = props.bill
    const [hide, setHide] = useState('hidden')
    const [show, setShow] = useState('')
    const [paid, setPaid] = useState(bill.amtPaid)
    
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
        <tr><button onClick={(e)=> handleDelete(e)}>x</button><td>{bill.name}</td><td>${bill.amount}</td><td><p className={show}  onClick={expand}>${bill.amtPaid}</p> <p className={hide}>$<input type='text' value={paid} onChange={(e)=>setPaid(e.target.value)}/> <button onClick={(e)=>handleEdit(e)}> + </button></p> </td></tr>
    )
}

export default Bill
