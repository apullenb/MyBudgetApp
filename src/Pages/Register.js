import React, { useState } from "react";
import config from "../config";

function Register(props) {
  const [inputs, setInputs] = useState({
    first_name: "",
    user_name: "",
    password: "",
  });

  const { first_name, user_name, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { first_name, user_name, password };
      if (!user_name || !password || !first_name) {
        alert("All Fields Must Be Completed");
      }
      const response = await fetch(
        `${config.API_ENDPOINT}/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        props.setAuth(true);
      } else {
        props.setAuth(false);
        alert(parseRes.error);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="login">
      <h2>Register</h2>
      <form>
        <label>
          {" "}
          Your First Name:
          <p>
            <input
              type="text"
              name="first_name"
              value={first_name}
              required
              onChange={(e) => onChange(e)}
            />
          </p>{" "}
        </label>
        <label>
          {" "}
          Choose a User Name:
          <p>
            <input
              type="text"
              name="user_name"
              value={user_name}
              required
              onChange={(e) => onChange(e)}
            />
          </p>{" "}
        </label>
        <label>
          {" "}
          Create Password:
          <p>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </p>{" "}
        </label>
        <button onClick={onSubmit}>Create Account</button>
      </form>
    </div>
  );
}
export default Register;
