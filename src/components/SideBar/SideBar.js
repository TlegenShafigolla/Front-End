import React from "react";
import Button from "@material-ui/core/Button";
import {Drawer, Typography} from "@material-ui/core";
import {useStyle} from "./Style";
import {NavLink} from "react-router-dom";
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import s from './SideBar.module.css'

const SideBar = (props) => {
    const infoColor = ["#00acc1", "#26c6da", "#00acc1", "#00d3ee"];
    const classes = useStyle();
    return (
        <Drawer
            open={props.open}
            variant='persistent'
            className={classes.drawer}
            anchor="left"
            classes={{
                paper: classes.drawerPaper
            }}

        >

            <div className={s.buttongroup}>
                <NavLink to="/admin/profile">
                    <Button color='primary'
                            startIcon={<PermIdentityOutlinedIcon/>}
                    >Profile</Button>
                </NavLink>
                <NavLink to="/admin/tests">
                    <Button color='primary'
                            startIcon={<PermIdentityOutlinedIcon/>}
                    >
                        My Quizzes
                    </Button>
                </NavLink>
            </div>

        </Drawer>

    );
}


export default SideBar;
