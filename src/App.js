import React from "react";
import { Route, Switch, Router, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Login from "./components/Login";
import admin from "./components/admin";
import USERS from "./components/user";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Header />
          <Login />
          <Footer />
        </Route>
        <Route path="/admin" component={admin} />
        <Route path="/user" component={USERS} />
      </Switch>
    );
  }
}
export default App;
