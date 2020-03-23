import React from "react";
import s from "../../css/AdminHeader.module.css";
import { SideBarCall } from "../../function/DasnbordButton";
import AppBar from "@material-ui/core/AppBar";
import { Typography, IconButton, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "./style";
import AccountCircle from '@material-ui/icons/AccountCircle'
const AdminHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="relative" style={{ background: "#f3f3f3" }}>
        <IconButton className={classes.menuButton} onClick={SideBarCall}>
          <MenuIcon color="primary" />
        </IconButton>
        {/* <Typography variant="h6" className={classes.title} noWrap>
          E-COURSES
        </Typography> */}
        <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="primary"
                className={classes.avaButton}
              >
                <AccountCircle />
              </IconButton>

      </AppBar>
    </div>
  );
};

export default AdminHeader;
