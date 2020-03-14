import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className={s.header}>
      Logo
      <NavLink to="/login">
        <button>SignIn</button>
      </NavLink>
    </header>
  );
};
export default Header;
