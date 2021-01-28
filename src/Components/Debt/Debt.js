import React, {useState} from 'react';
import config from '../../config'

function Debt(props) {
    const debt = props.debt
    const [hide, setHide] = useState('hidden')
    const [show, setShow] = useState('')
    const [paid, setPaid] = useState()
    
    const expand = () => {
        show === '' ? setShow('hidden') : setShow('')
        hide === 'hidden' ? setHide('expand') : setHide('hidden')
    }
    const handleEdit = (e) => {
        expand()
        props.submit(paid)
    }
    async function handleDelete(e) {
        try {
          const response = await fetch(
            `${config.API_ENDPOINT}/api/debt/${debt.id}`,
            {
              method: "DELETE",
              headers: { token: localStorage.token },
            }
          );
          const parseRes = await response.json();
    
          console.log(parseRes);
        } catch (error) {
          console.error(error.message);
        }
      }


    return (
        <tr><button onClick={(e)=> handleDelete(e)}>x</button><td>{debt.name}</td><td>${debt.start_bal}</td><td>${debt.curr_bal}</td> <td>${debt.monthly_min}</td> <td><p className={show}  onClick={expand}>${debt.amt_paid}</p> <p className={hide}>$<input type='text' value={paid} onChange={(e)=>setPaid(e.target.value)}/> <button onClick={(e)=>handleEdit(e)}> + </button></p> </td></tr>
    )
}

export default Debt
