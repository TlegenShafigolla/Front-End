import React from "react";
import Admin from "./pages/admin";
import Users from "./pages/user";
import Login from "./pages/login";
import {Route, Switch} from "react-router-dom";
import {PrivateAdminRoute, PrivateUserRoute} from "./function/PrivateRoute";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import SignUp from "./pages/signUp";
import Survey from "./pages/survey";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" render={() => <Home/>}/>
            <Route path="/login" render={() => <Login/>}/>
            <Route path='/registration' render={() => <SignUp/>}/>
            <Route path='/quiz/:link' render={() => <Quiz/>}/>
            <Route path='/survey/:link' render={() => <Survey/>}/>
            <PrivateAdminRoute path="/admin/" render={() => <Admin/>}/>
            <PrivateUserRoute path="/user" render={() => <Users/>}/>
        </Switch>
    );
};


export default Routes;
