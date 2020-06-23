import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {Typography, IconButton} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {useStyles} from "./Style";
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const AdminHeader = (props) => {
    const classes = useStyles();

    const routes = [
        {
            path: '/admin/profile',
            name: 'Profile'
        },
        {
            path: '/admin/quizzes',
            name: 'Quizzes'
        },
        {
            path: '/admin/quiz/editor',
            name: 'Quiz Editor'
        },
        {
            path: '/admin/reports',
            name: 'QuizContainer - Reports'
        },
        {
            path: '/admin/surveys',
            name: 'Surveys'
        },
        {
            path: '/admin/survey/editor',
            name: 'Survey Editor'
        },
        {
            path: '/admin/group',
            name: 'Groups'
        },
    ];

    const PageName = () => {
        let name = '';
        routes.map(obj => {
            if(window.location.href.indexOf(obj.path) !== -1){
                name = obj.name;
            }
            return null;
        });
        return name;
    };

    return (
        <div className={classes.grow}>

            <AppBar position="fixed" style={{background: "#f3f3f3"}}>
                <Toolbar>
                    <IconButton className={classes.menuButton} onClick={props.OpenButton} color="primary">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6"   noWrap color="primary">
                        {PageName()}
                    </Typography>
                    <div className={classes.grow}/>
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

                </Toolbar>
            </AppBar>
        </div>
    )
        ;
};

export default AdminHeader;
