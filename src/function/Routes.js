import React from 'react'
import {Route} from "react-router-dom";
import Profile from '../components/Profile/Profile';
import makeStyles from "@material-ui/core/styles/makeStyles";
import MyQuizRoute from "../components/MyQuizzes/MyQuizRoute";
import Invitations from "../components/Invitations/Invitations";
import ReportRoute from "../components/QuizReports/ReportRoute";
import MySurveyRoute from "../components/MySurveys/MySurveysRoute";
import GroupRoutes from "../components/Group/Routes";
import ReportSurveyRoute from "../components/SurveyReports/ReportRoute";

const styles = makeStyles(theme => ({
    drawerHeader: {
            ...theme.mixins.toolbar,
    },

}));

export const Routes = (props) => {
    const classes = styles();
    return (
        <div>
                <div className={classes.drawerHeader}/>
                <Route path="/admin/profile" render={() => <Profile/>}/>
                <Route path="/admin/quizzes" render={() => <MyQuizRoute/>}/>
                <Route path="/admin/invitations" render={() => <Invitations/>}/>
                <Route path="/admin/reports" render={() => <ReportRoute/>}/>
                <Route path="/admin/surveys" render={() => <MySurveyRoute/>}/>
                <Route path='/admin/group' component={GroupRoutes}/>
                <Route path='/admin/surveys/reports' render={()=><ReportSurveyRoute/>}/>
        </div>
    );

};


