import React from 'react'
import config from '../../config'

function Income(props) {
    const income = props.income
    // const [hide, setHide] = useState('hidden')
    // const [show, setShow] = useState('')
   
    
    // const expand = () => {
    //     show === '' ? setShow('hidden') : setShow('')
    //     hide === 'hidden' ? setHide('expand') : setHide('hidden')
    // }
    // const handleEdit = (e) => {
    //     expand()
    //     props.submit(paid)
    // }
    async function handleDelete(e) {
        try {
          const response = await fetch(
            `${config.API_ENDPOINT}/api/income/${income.id}`,
            {
              method: "DELETE",
              headers: { token: localStorage.token },
            }
          );
          await response;
         props.getAll()
        } catch (error) {
          console.error(error.message);
        }
      }

    


    return (
        <tr><button id='x' onClick={(e)=> handleDelete(e)}>x</button><td id='i'>{income.source}</td><td>${income.amount}
            {/* <p className={show}  onClick={expand}>${income.amount}</p> <p className={hide}>$<input type='text' value={paid} onChange={(e)=>setPaid(e.target.value)}/> <button onClick={(e)=>handleEdit(e)}> + </button></p>  */}
            </td></tr>
    )
}
    


export default Income
