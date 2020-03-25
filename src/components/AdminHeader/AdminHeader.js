import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {Typography, IconButton, MenuItem} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {useStyles} from "./Style";
import AccountCircle from '@material-ui/icons/AccountCircle'
import Toolbar from '@material-ui/core/Toolbar';
import Menu from "@material-ui/core/Menu";
import clsx from "clsx";

const AdminHeader = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl)
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <div className={classes.grow}>

            <AppBar position="fixed" style={{background: "#f3f3f3"}}
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: props.OpenSideBar,
                    })}
            >
                <Toolbar>
                    <IconButton className={classes.menuButton} onClick={props.OpenButton} color="primary">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} noWrap color="primary">
                        E-COURSES
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="primary"
                            onClick={handleMenu}
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={props.Logout}>LogOut</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>


            </AppBar>
        </div>
    )
        ;
};

export default AdminHeader;
