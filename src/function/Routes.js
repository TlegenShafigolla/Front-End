import React from 'react'
import {Route, Redirect} from "react-router-dom";
import Profile from '../components/Profile/Profile';
import MyQuizzes from '../components/MyQuizzes/MyQuizzes';
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Switch} from "@material-ui/core";

const drawerWidth = 240;
const styles = makeStyles(theme => ({
    grow: {
        width: '100wh',
        height: '100vh'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {

        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

}))

export const Routes = (props) => {
    const classes = styles();
    return (

        <div className={classes.grow}>
            <main className={clsx(classes.content, {
                [classes.contentShift]: props.open,
            })}>
                <div className={classes.drawerHeader}/>
                <Route  path="/admin/profile" component={Profile}/>
                <Route  path="/admin/tests" component={MyQuizzes}/>
            </main>
        </div>

    );

};


