import React, {useState} from 'react'
import config from "../../config";
import { Redirect } from "react-router";

function AddBill(props) {
    const month = props.month

    const [inputs, setInputs] = useState({
        bill_name: "",
        bill_amt: "",
        amt_paid: '0',
      });
      
      const {
        bill_name,
        bill_amt,
        amt_paid,
      } = inputs;
    
      const onChange = (e) =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

      const onSubmit = async (e) => {
        e.preventDefault();
        const body = {
            bill_name,
            bill_amt,
            amt_paid,
            month
        };
       
        if (inputs === "") {
          return alert("Please fill out all fields");
        }
        const token = localStorage.getItem("token");
        const response = await fetch(`${config.API_ENDPOINT}/api/bills`, {
          method: "POST",
          headers: { "content-type": "application/json", token: `${token}` },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        if (parseRes.error) {
          alert(parseRes.error);
          console.error(parseRes.error);
        } else {
          props.close()
          setInputs( {bill_name: "",
          bill_amt: "",
          amt_paid: '0'})
          props.getAll()
          
        }
      };
    
      return (
        <div>
          <h3>Add A New Bill</h3>
          
            Bill Name: <input
              type="text"
              name="bill_name"
              onChange={(e) => onChange(e)}
              value={bill_name}
            />
          
           Bill Amount: $<input
              type="text"
              name="bill_amt"
              onChange={(e) => onChange(e)}
              value={bill_amt.replace(/,/g, '')}
              required
            />
             
             Amount Paid:
              <input
              type="text"
              name="amt_paid"
              value={amt_paid.replace(/,/g, '')}
              onChange={(e)=> onChange(e)}
            />
             {' '}
             <button onClick={onSubmit}> Submit</button>
     </div>
    )
}

export default AddBill
