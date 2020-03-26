import React from "react";
import Button from "@material-ui/core/Button";
import {Drawer, Typography} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {useStyle} from "./Style";
import {NavLink} from "react-router-dom";
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';

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
            ModalProps={{
                keepMounted: true // Better open performance on mobile.
            }}
        >

            <div className={classes.button}>
                <NavLink to="/admin/profile">
                    <Button color='primary'
                            startIcon={<PermIdentityOutlinedIcon/>}
                            disabled={false}
                    >Profile</Button>
                </NavLink>
                <br/>
                <NavLink to="/admin/menu1">
                    <MenuItem>
                        Menu
                    </MenuItem>
                </NavLink>
            </div>

        </Drawer>

    );
}


export default SideBar;
