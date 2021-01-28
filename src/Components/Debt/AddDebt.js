import React, {useState} from 'react'
import config from "../../config";
import { Redirect } from "react-router";

function AddDebt(props) {
    const month = props.month

    const [inputs, setInputs] = useState({
        name: '',
        start_bal: '',
        curr_bal:'',
        monthly_min:'',
        amt_paid: '',
      });
      
      const {
        name,
        start_bal,
        curr_bal,
        monthly_min,
        amt_paid
      } = inputs;
    
      const onChange = (e) =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

      const onSubmit = async (e) => {
        e.preventDefault();
        const body = {
            name,
        start_bal,
        curr_bal,
        monthly_min,
        amt_paid,
         month
        };
       console.log(body)
        if (inputs === "") {
          return alert("Please fill out all fields");
        }
        const token = localStorage.getItem("token");
        const response = await fetch(`${config.API_ENDPOINT}/api/debt`, {
          method: "POST",
          headers: { "content-type": "application/json", token: `${token}` },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        if (parseRes.error) {
          alert('Please Fill Out All Fields or Cancel!');
          console.error(parseRes.error);
        } else {
          props.close()
          setInputs({
            name: "",
            start_bal: "",
            curr_bal:'',
            monthly_min:'',
            amt_paid: '0',
          })
          props.getAll()
          
        }
      };
    
      return (
        <div>
            <span>Debt Name: <input
              type="text"
              name="name"
              onChange={(e) => onChange(e)}
              value={name}
            /></span>
          
          <span> Starting Balance: $<input
              type="text"
              name="start_bal"
              onChange={(e) => onChange(e)}
              value={start_bal.replace(/,/g, '')}
              required
            /></span>
             
            <span> Current Balance:
              <input
              type="text"
              name="curr_bal"
              value={curr_bal.replace(/,/g, '')}
              onChange={(e)=> onChange(e)}
            /></span>
             <span> Monthly Minimum:
              <input
              type="text"
              name="monthly_min"
              value={monthly_min.replace(/,/g, '')}
              onChange={(e)=> onChange(e)}
            /></span>
             <span> Amount Paid:
              <input
              type="text"
              name="amt_paid"
              value={amt_paid.replace(/,/g, '')}
              onChange={(e)=> onChange(e)}
            /></span>
             {' '}
            <span> <button onClick={onSubmit}> Submit</button></span>

     </div>
    )
}

export default AddDebt
