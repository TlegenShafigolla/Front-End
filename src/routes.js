import React from "react";
import admin from "./pages/admin";
import users from "./pages/user";
import Login from "./pages/login";
import { Route, Switch } from "react-router-dom";
import { PrivateAdminRoute, PrivateUserRoute } from "./function/PrivateRoute";
import home from "./pages/home";
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={home} />

      <Route path="/login" component={Login} />
      <Route  path="/admin" component={admin} />
      <Route  path="/user" component={users} />
    </Switch>
  );
};

export default Routes;
