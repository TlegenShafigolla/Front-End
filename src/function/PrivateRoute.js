import React from "react";
import { Redirect, Route } from "react-router-dom";
export const PrivateAdminRoute = ({ render: Component, ...rest }) => (
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
    export const PrivateUserRoute = ({ render: Component, ...rest }) => (
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
