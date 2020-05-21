import React from "react";
import s from "./Surveys.module.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import {NavLink} from "react-router-dom";
import getUsedSurvey from "../../services/API/adminAPI/Survey/usedSurveys";

class Surveys extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            surveys: []
        };
    }

    componentDidMount() {
        getUsedSurvey().then(json => {
            console.log(json);
            this.setState({surveys: json});
        });
    }

    render() {
        return(
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  className={s.Root}>
                <Grid item lg={2} md={2} sm={1} xs={1}>
                </Grid>
                <Grid item lg={8} md={8} sm={10} xs={12}>
                    <Grid container
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-start"
                          spacing={1}
                          className={s.Body}>
                        {this.state.surveys.map((val, index) =>
                            <Grid key={index} item lg={3} md={3} sm={4} xs={12}>
                                <SurveyCard survey_name={val.survey_name} _id={val._id}/>
                            </Grid>)}
                    </Grid>
                </Grid>
                <Grid item lg={2} md={2} sm={1} xs={1}>
                </Grid>
            </Grid>
        );
    }
}

const SurveyCard = (props) => {
    return(
        <Paper square elevation={3} className={s.SurveyCard}>
            <NavLink to={`/admin/surveys/${props._id}`}>
                {props.survey_name}
            </NavLink>
        </Paper>
    );
};

export default Surveys;