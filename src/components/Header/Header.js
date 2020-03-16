import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
const Header = (props) => {
    let page=props.page;
    if(page==='home'){
  return (
    <header className={s.header}>
      Logo
      <NavLink to="/login">
        <button>SignIn</button>
      </NavLink>
    </header>
  );
    }
    else if(page==='login'){
        return (
            <header className={s.header}>
              Logo
              
                <button>SignUp</button>
              
            </header>
          );
    }
};
export default Header;
