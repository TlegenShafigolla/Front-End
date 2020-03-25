import React from "react";
import {NavLink} from "react-router-dom";
import "../../css/App.css";
import Button from "@material-ui/core/Button";
import {Drawer, Typography} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {useStyle} from "./Style";

const SideBar = (props) => {
    const classes = useStyle();
    const [setAnchorEl] = React.useState(null);
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <Drawer
            open={props.open}
            variant='persistent'
            className={classes.drawer}
            anchor="left"
            classes={{
                paper: classes.drawerPaper
            }}
            onClose={handleClose}

        >

            <div>
                <Button onClick={props.open}>open</Button>
                <MenuItem>menu</MenuItem>
                <NavLink to="/admin/menu">
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
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
