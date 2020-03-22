import React from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import s from "./SideBar.module.css";
class SideBar extends React.Component {
  render() {
    return (
      <nav className="dashbord">
        <div className={s.SideBar}>
          <NavLink to="/admin/menu">
            

            <Button variant="contained" size='large' color="primary" className={s.btn}>
              menu1
            </Button>
            
          </NavLink>
          <NavLink to="/admin/menu1">
            <Button variant="contained" size='large' color="primary" className={s.btn}>
              menu2
            </Button>
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default SideBar;
