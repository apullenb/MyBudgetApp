import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faPen, faCoins } from "@fortawesome/free-solid-svg-icons";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import config from "./config";

library.add(faEdit, faPen, faCoins);

function App() {
  useEffect(() => {
    isAuthCheck();
  }, []);

  // Determines if a user is authorized or not and controls what info the user can view
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  //checks to see if the user is authorized before displaying private content
  async function isAuthCheck() {
    try {
      const response = await fetch(
        `${config.API_ENDPOINT}/api/users/isverified`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      <Router>
        <div className="App">
          <Header setAuth={setAuth} isAuth={isAuthenticated} />

          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/Dashboard" />
                )
              }
            />
            <Route
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/Dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>

          <Route exact path="/" component={Home} />

          
        </div>
      </Router>
    </div>
  );
}

export default App;
