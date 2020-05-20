import React from "react";
import Button from "@material-ui/core/Button";
import {Drawer, Typography} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import InsertInvitationSharpIcon from '@material-ui/icons/InsertInvitation';
import AssessmentSharpIcon from '@material-ui/icons/Assessment';
import AssignmentSharpIcon from '@material-ui/icons/AssignmentSharp';
import s from './SideBar.module.css'
import logo from '../../images/192x192logoGray.png'
import GroupIcon from '@material-ui/icons/Group';

const SideBar = (props) => {
    return (
        <Drawer
            open={props.open}
            className={s.drawer}
            onBackdropClick={props.close}
            anchor='left'
            classes={{
                paper: s.drawerPaper
            }}

        >

            <div className={s.Header}>
                <img className={s.logo} src={logo} alt="Logo"/>
                <Typography className={s.name} variant="h5" noWrap color="primary">
                    QUIZZES
                </Typography>
            </div>
            <div className={s.sidebar}>
                <div className={s.buttongroup}>
                    <NavLink to="/admin/profile">
                        <Button color='primary'
                                className={s.main}
                                startIcon={<AccountBoxSharpIcon/>}>
                            Profile
                        </Button>
                    </NavLink>
                    <NavLink to='/admin/group'>
                        <Button color='primary'
                                className={s.main}
                                startIcon={<GroupIcon/>}>
                            Groups
                        </Button>
                    </NavLink>
                    <NavLink to='/admin/quiz/editor'>
                        <Button color='primary'
                                className={s.main}
                                startIcon={<AssignmentSharpIcon/>}>
                            Quiz Editor
                        </Button>
                    </NavLink>
                    <NavLink to='/admin/quizzes'>
                        <Button color='primary'
                                className={s.secondary}
                                startIcon={<InsertInvitationSharpIcon/>}>
                            Quizzes
                        </Button>
                    </NavLink>
                    <NavLink to='/admin/reports'>
                        <Button color='primary'
                                className={s.secondary}
                                startIcon={<AssessmentSharpIcon/>}>
                            Reports
                        </Button>
                    </NavLink>
                    <NavLink to='/admin/survey/editor'>
                        <Button color='primary'
                                className={s.main}
                                startIcon={<AssignmentSharpIcon/>}>
                            Survey Editor
                        </Button>
                    </NavLink>
                    <NavLink to='/admin/surveys'>
                        <Button color='primary'
                                className={s.secondary}
                                startIcon={<InsertInvitationSharpIcon/>}>
                            Surveys
                        </Button>
                    </NavLink>
                    <NavLink to='/admin/surveys/reports'>
                        <Button color='primary'
                                className={s.secondary}
                                startIcon={<AssessmentSharpIcon/>}>
                            Reports
                        </Button>
                    </NavLink>
                </div>
            </div>
        </Drawer>

    );
};


export default SideBar;
