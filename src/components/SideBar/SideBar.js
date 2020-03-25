import React from "react";
import {NavLink} from "react-router-dom";
import "../../App.css";
import Button from "@material-ui/core/Button";
import s from "./SideBar.module.css";
import {Drawer, Typography} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import {SideBarCall} from "../../function/DasnbordButton";
import {useStyle} from "./style";

const SideBar = (props) => {
    const classes = useStyle();
    return (
        <Drawer
            open={props.open}
            variant='persistent'
            className={classes.drawer}

        >

            <div className={classes.sidebar}>
                <Button onClick={props.open}>open</Button>
                <MenuItem>menu</MenuItem>
                <NavLink to="/admin/menu">
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={s.btn}
                    >
                        menu1
                    </Button>
                </NavLink>
                <br/>
                <NavLink to="/admin/menu1">
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={s.btn}
                    >
                        <Typography variant="h6" noWrap>
                            Menu
                        </Typography>
                    </Button>
                </NavLink>
            </div>

        </Drawer>

    );
}


export default SideBar;
