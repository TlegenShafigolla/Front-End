import React from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
import $ from "jquery";
// import s from "./SideBar.module.css";
class SideBar extends React.Component {
  render() {
    return (
      <nav className="dashbord">
        <NavLink to="/admin/menu">
          <button id="1">Menu1</button>
        </NavLink>
        <NavLink to="/admin/menu1">
          <button id="2">Menu2</button>
        </NavLink>
      </nav>
    );
  }
}

export default SideBar;
