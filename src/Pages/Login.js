import React, { useState } from "react";
import config from "../config";
import { Link } from "react-router-dom";

function LoginForm({ setAuth }) {
  const [formHandleUser, setformHandleUser] = useState("");
  const [formHandlePass, setformHandlePass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newLogin = { user_name: formHandleUser, password: formHandlePass };
      const loginRequest = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newLogin),
      };
      const response = await fetch(
        `${config.API_ENDPOINT}/api/users/login`,
        loginRequest
      );

      const parseRes = await response.json();
      
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      } else {
        setAuth(false);
        alert(parseRes.error);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="login">
      <h2>Login</h2>
      <form>
        <label>
          {" "}
          Username:
          <p>
            <input
              type="text"
              name="user"
              value={formHandleUser}
              onChange={(e) => setformHandleUser(e.target.value)}
            />
          </p>{" "}
        </label>
        <label>
          {" "}
          Password:
          <p>
            <input
              type="password"
              name="pass"
              value={formHandlePass}
              onChange={(e) => setformHandlePass(e.target.value)}
            />
          </p>{" "}
        </label>
        <button onClick={handleSubmit}>Login</button>
      </form>{" "}
      <p> Need to Create an Account? </p>
      <Link to={{ pathname: "/register" }}>
        {" "}
        <button>Create Account</button>
      </Link>{" "}
    </div>
  );
}

export default LoginForm;
