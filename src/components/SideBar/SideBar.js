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
import {Element} from "../../hoc/SideBar/SideBarElement";

const SideBar = (props) => {
    const firstLayer = '/admin/'
    const SideBar = [
        {Link: `${firstLayer}profile`, Name: 'Profile', icon: <AccountBoxSharpIcon/>},
        {Link: `${firstLayer}group`, Name: 'Groups', icon: <GroupIcon/>},
        {Link: `${firstLayer}quiz/editor`, Name: 'Quiz Editor', icon: <AssignmentSharpIcon/>},
        {Link: `${firstLayer}quizzes`, Name: 'Quizzes', icon: <InsertInvitationSharpIcon/>},
        {Link: `${firstLayer}survey/editor`, Name: 'Survey Editor', icon: <AssessmentSharpIcon/>},
        {Link: `${firstLayer}surveys`, Name: 'Surveys', icon: <InsertInvitationSharpIcon/>},
    ]
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
            <div className={s.SideBar}>
                    {SideBar.map((val, index) =>
                        <Element key={index} icon={val.icon} to={val.Link} children={val.Name}/>)}
            </div>
        </Drawer>

    );
};
export default SideBar;
