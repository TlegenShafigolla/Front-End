import React from "react";
import { Redirect, Route } from "react-router-dom";
export const PrivateAdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (localStorage.getItem('status')==='admin') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
  );
    export const PrivateUserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
     (localStorage.getItem('status')==='user') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
