import React, {useState, useEffect} from 'react'
import config from "../../config";
import AddIncome from './AddIncome';
import Income from './Income'

function IncomeList(props) {
   const [income, setIncome] = useState('')
   const [display, setDisplay] = useState('hidden')

   
   function addNew() {
    display === 'hidden' ? setDisplay('expand') : setDisplay('hidden')
    
   }

  async function getallIncome() {
    try {
        const response = await fetch(`${config.API_ENDPOINT}/api/income`, {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const parseRes = await response.json();
        setIncome(parseRes);
      } catch (error) {
        console.error(error.message);
      }
    }

    useEffect(() => {
        getallIncome();
        props.total(income)
      }, []);
   
    const handleSubmit = (value) => {
        console.log('submitted!' + value)
    }
  
    function totalIncome(){ 
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
                {income.length ?  (   income.map(source => {
             return <Income key ={source.id} income={source} submit={handleSubmit} />
            }) ) : (<h4>Loading..Please Wait</h4> ) } 
            <tr>
            <th> </th>  <th>{display === 'hidden' && (<button onClick={addNew}>+ Add New</button> )} </th> <th>Total: {' '} ${totalIncome()}</th> 
            </tr>
            <tr className={display}> <AddIncome month={props.month}/> <button onClick={addNew}>Cancel</button> </tr>
             </table>  
             </div>
    )
}

export default IncomeList
