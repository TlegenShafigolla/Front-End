import React from 'react'
import {Route} from "react-router-dom";
import Profile from '../components/Profile/Profile';
import makeStyles from "@material-ui/core/styles/makeStyles";
import QuizEditor from "../components/QuizEditor/QuizEditor";
import ReportRoute from "../components/QuizReports/ReportRoute";
import MySurveyRoute from "../components/SurveyConstructor/MySurveysRoute";
import GroupRoutes from "../components/Group/Routes";
import ReportSurveyRoute from "../components/SurveyReports/ReportRoute";
import clsx from "clsx";
import Quizzes from "../components/Quizzes/Quizzes";
import QuizzesRoute from "../components/Quizzes/QuizzesRoute";

const styles = makeStyles(theme => ({
    grow: {
        height: '100vh',
    },
    drawerHeader: {
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
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
    },
}));

export const Routes = (props) => {
    const classes = styles();
    return (
        <div className={classes.grow}>
                <div className={classes.drawerHeader}/>
                <Route path="/admin/profile" render={() => <Profile/>}/>
                <Route path="/admin/quiz/editor" render={() => <QuizEditor/>}/>
                <Route path="/admin/quizzes" render={() => <QuizzesRoute/>}/>
                <Route path="/admin/reports" render={() => <ReportRoute/>}/>
                <Route path="/admin/surveys" render={() => <MySurveyRoute/>}/>
                <Route path='/admin/group' component={GroupRoutes}/>
                <Route path='/admin/surveys/reports' render={() => <ReportSurveyRoute/>}/>
        </div>

    );

};


