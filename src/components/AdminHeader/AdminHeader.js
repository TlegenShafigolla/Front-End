import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {Typography, IconButton} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {useStyles} from "./Style";
import Toolbar from '@material-ui/core/Toolbar';
import clsx from "clsx";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const AdminHeader = (props) => {
    const classes = useStyles();
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
                        <Typography className={classes.title} noWrap color="primary">
                            {props.DisplayName}
                        </Typography>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="primary"
                            onClick={props.Logout}
                        >
                            <ExitToAppIcon/>
                        </IconButton>

                    </div>
                </Toolbar>


            </AppBar>
        </div>
    )
        ;
};

export default AdminHeader;
