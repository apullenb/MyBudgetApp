import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
  return (
    <div className="home">
      <h1 style={{ color: "#96bddc" }}>
        <FontAwesomeIcon
          icon="coins"
          style={{ fontSize: "75px", paddingLeft: "35px", color: "#1f3564" }}
        />
        Welcome to Divvy!!
      </h1>
      <section className="bills">
        <h4>
          Divvy is the Quick and Easy Way to Manage Your Personal Finances!
        </h4>
        <p style={{ color: "white", fontSize: "18px", margin: "2px" }}>
          - Quickly calculate your expenses for the month
        </p>
        <p style={{ color: "white", fontSize: "18px", margin: "2px" }}>
          - See how much you have left over{" "}
        </p>
        <p style={{ color: "white", fontSize: "18px", margin: "2px" }}>
          - Plan towards paying down your long term debt
        </p>
      </section>
      <h3>Log In or Create an Account to Get Started</h3>
      <Link to={{ pathname: "/login" }}>
        {" "}
        <button>Account Login</button>
      </Link>{" "}
      <Link to={{ pathname: "/register" }}>
        {" "}
        <button>Create Account</button>
      </Link>
    </div>
  );
}

export default Home;
