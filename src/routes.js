import React from 'react';
import admin from './components/admin';
import users from './components/user';
import { Route, Switch } from "react-router-dom";
import Login from './components/login';
export const routes=(
    <Switch>
    <Route path="/login" component={Login}/>
    <Route path="/admin" component={admin} />
    <Route path="/user" component={users} />
    </Switch>
    )