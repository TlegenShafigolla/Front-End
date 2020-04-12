import React from "react";
import Button from "@material-ui/core/Button";
import {Drawer, Typography} from "@material-ui/core";
import {useStyle} from "./Style";
import {NavLink} from "react-router-dom";
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import InsertInvitationSharpIcon from '@material-ui/icons/InsertInvitation';
import AssessmentSharpIcon from '@material-ui/icons/Assessment';
import AssignmentSharpIcon from '@material-ui/icons/AssignmentSharp';
import s from './SideBar.module.css'
import logo from './192x192.png'

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
            <div className={s.header}>
                <img className={s.logo} src={logo} alt="Logo"/>
                <Typography className={s.name} variant="h5" noWrap color="primary">
                    QUIZZES
                </Typography>
            </div>
            <div className={s.buttongroup}>
                <NavLink to="/admin/profile">
                    <Button color='primary'
                            className={s.main}
                            startIcon={<AccountBoxSharpIcon/>}
                            onClick={() => props.onClickSideBar('Profile')}>
                        Profile
                    </Button>
                </NavLink>
                <NavLink to='/admin/quizzes'>
                    <Button color='primary'
                            className={s.main}
                            startIcon={<AssignmentSharpIcon/>}
                            onClick={() => props.onClickSideBar('Quizzes')}>
                        Quizzes
                    </Button>
                </NavLink>
                <NavLink to='/admin/invitations'>
                    <Button color='primary'
                            className={s.secondary}
                            startIcon={<InsertInvitationSharpIcon/>}
                            onClick={() => props.onClickSideBar('Quiz - Invitations')}>
                        Invitations
                    </Button>
                </NavLink>
                <NavLink to='/admin/reports'>
                    <Button color='primary'
                            className={s.secondary}
                            startIcon={<AssessmentSharpIcon/>}
                            onClick={() => props.onClickSideBar('Quiz - Reports')}>
                        Reports
                    </Button>
                </NavLink>
                <Button color='primary'
                        className={s.main}
                        startIcon={<AssignmentSharpIcon/>}
                        disabled={true}
                        onClick={() => props.onClickSideBar('Surveys')}>
                    Surveys
                </Button>
                <Button color='primary'
                        disabled={true}
                        className={s.secondary}
                        startIcon={<InsertInvitationSharpIcon/>}
                        onClick={() => props.onClickSideBar('Surveys - Invitations')}>
                    Invitations
                </Button>
                <Button color='primary'
                        disabled={true}
                        className={s.secondary}
                        startIcon={<AssessmentSharpIcon/>}
                        onClick={() => props.onClickSideBar('Surveys - Reports')}>
                    Reports
                </Button>
            </div>

        </Drawer>

    );
}


export default SideBar;
