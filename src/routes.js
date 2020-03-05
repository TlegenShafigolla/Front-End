import React from "react";
import admin from "./pages/admin";
import users from "./pages/user";
import Login from "./pages/login";
import home from "./pages/home";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { PrivateAdminRoute } from "./function/PrivateRoute";
import { checklogin } from "./services/checkLogin";
class routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={home} />
          <Route path="/login" component={Login} />
          <Route exact path="/admin" component={admin}onEnter={checklogin} />
          <Route exact path="/user" component={users} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default routes;
