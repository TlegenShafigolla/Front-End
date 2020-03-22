import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
const Header = props => {
  let page = props.page;
  if (page === "home") {
    return (
      <header className={s.header}>
        Logo
        <NavLink to="/login">
          <Button variant="contained" color="primary">
            SignIn
          </Button>
        </NavLink>
      </header>
    );
  } else if (page === "login") {
    return (
      <header className={s.header}> 
        Logo
        <Button variant="contained" color="primary">
          SignUp
        </Button>
      </header>
    );
  }
};
export default Header;
