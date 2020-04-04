import React from "react";
import admin from "./pages/admin";
import users from "./pages/user";
import Login from "./pages/login";
import {Route, Switch} from "react-router-dom";
import {PrivateAdminRoute, PrivateUserRoute} from "./function/PrivateRoute";
import home from "./pages/home";
import Test from "./pages/test";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={home}/>
            <Route path="/login" component={Login}/>
            <Route path='/test/:id' component={Test}/>
            <PrivateAdminRoute  path="/admin/" component={admin}/>
            <PrivateUserRoute path="/user" component={users}/>
        </Switch>
    );
};


export default Routes;
