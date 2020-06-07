import React from "react";
import { Redirect, Route } from "react-router-dom";
export const PrivateAdminRoute = ({ render: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (localStorage.getItem('access_token')) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
  );
