import React, {useState, useEffect} from 'react'
import config from "../../config";
import Bill from './Bill'
import AddBill from './AddBill'

function BillsList(props) {
    const [bills, setBills] = useState('')
    const [display, setDisplay] = useState('hidden')

    
   function addNew() {
    display === 'hidden' ? setDisplay('expand') : setDisplay('hidden')
   }

   async function getallBills() {
    try {
        const response = await fetch(`${config.API_ENDPOINT}/api/bills`, {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const parseRes = await response.json();
        setBills(parseRes);
        console.log(parseRes)
      } catch (error) {
        console.error(error.message);
      }
    }

    useEffect(() => {
        getallBills();
      }, []);

    const handleSubmit = (value) => {
        console.log('submitted!' + value)
    }
   
    let amountDue = totalDue() - totalPaid()
    props.total(amountDue)

    function totalDue() {
        let total = 0
        for(let i=0; i < bills.length; i++){
            total = parseInt(bills[i].bill_amt) + total
        }
        return total
    }
    function totalPaid(){
        let total = 0
        for(let i=0; i < bills.length; i++){
            total = parseInt(bills[i].amt_paid) + total
        }
       
        return total
    }
    return (
        <div className='bills'>
            <h3>Bills</h3>
            <table>
                <tr>
                <th> </th>    <th className='head'>Bill Name</th>  <th className='head'>Amount Due</th>  <th className='head'>Amount Paid</th> <th className='head'>Amount Remaining </th> 
                </tr>
                {bills.length ?  (   bills.map(source => {
             return <Bill key ={source.id} bill={source} submit={handleSubmit} />
            }) ) : (<h4>Loading..Please Wait</h4> ) } 
            
            <th> </th>  <th>{display === 'hidden' && (<button onClick={addNew}>+ Add New</button> )} </th> <th>Total:  ${totalDue()}</th> <th>Total Paid: ${totalPaid()}</th> <th>Total Remaining:  ${amountDue}</th>
            </table>
            <section className={display}><AddBill month={props.month}/> <button onClick={addNew}>Cancel</button> 
             </section>
        </div>
    )
}

export default BillsList
