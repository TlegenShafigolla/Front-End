import React from "react";
import Admin from "./pages/admin";
import Login from "./pages/loginContainer";
import {Route, Switch} from "react-router-dom";
import {PrivateAdminRoute} from "./function/PrivateRoute";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import Survey from "./pages/survey";
import RegistrationContainer from "./pages/RegistrationContainer";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" render={() => <Home/>}/>
            <Route path="/login" render={() => <Login/>}/>
            <Route path='/registration' render={() => <RegistrationContainer/>}/>
            <Route path='/quiz/:link' render={() => <Quiz/>}/>
            <Route path='/survey/:link' render={() => <Survey/>}/>
            <PrivateAdminRoute path="/admin/" render={() => <Admin/>}/>
            </Switch>
    );
};


export default Routes;
