import React from "react";
import Button from "@material-ui/core/Button";
import {Drawer} from "@material-ui/core";
import {useStyle} from "./Style";
import {NavLink} from "react-router-dom";
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import s from './SideBar.module.css'

const SideBar = (props) => {

    const classes = useStyle();
    return (
        <Drawer
            open={props.open}
            variant='persistent'
            className={classes.drawer}
            anchor='left'
            classes={{
                paper: classes.drawerPaper
            }}

        >

            <div className={s.buttongroup}>
                <NavLink to="/admin/profile">
                    <Button color='primary'
                            className={s.main}
                            startIcon={<PermIdentityOutlinedIcon/>}>
                        Profile
                    </Button>
                </NavLink>
                <NavLink to='/admin/quizzes'>
                    <Button color='primary'
                            className={s.main}
                            startIcon={<PermIdentityOutlinedIcon/>}>
                        My Quizzes
                    </Button>
                </NavLink>
                <NavLink to='/admin/invitations'>
                    <Button color='primary'
                            className={s.secondary}
                            startIcon={<PermIdentityOutlinedIcon/>}
                    >
                        Invitations
                    </Button>
                </NavLink>
                <NavLink to='/admin/reports'>
                    <Button color='primary'
                            className={s.secondary}
                            startIcon={<PermIdentityOutlinedIcon/>}>
                        Reports
                    </Button>
                </NavLink>
                <Button color='primary'
                        className={s.main}
                        startIcon={<PermIdentityOutlinedIcon/>}
                        disabled={true}>
                    Survey
                </Button>
                <Button color='primary'
                        disabled={true}
                    className={s.secondary}
                    startIcon={<PermIdentityOutlinedIcon/>}
                    >
                    Invitations
                </Button>
                <Button color='primary'
                        disabled={true}
                    className={s.secondary}
                    startIcon={<PermIdentityOutlinedIcon/>}>
                    Reports
                </Button>
            </div>

        </Drawer>

    );
}


export default SideBar;
