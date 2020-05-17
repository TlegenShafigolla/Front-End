import Grid from "@material-ui/core/Grid";
import s from "../../css/Survey.module.css";
import logo from "../../images/logoPng.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React from "react";

const StartSurvey = (props) => {
    return (
        <div>
            <Grid container
                  spacing={3}
                  direction="column"
                  justify="space-between"
                  alignItems="center">
                <img className={s.Logo} src={logo} alt="Logo"/>
                <span className={s.QuizName}>{props.survey.survey_name}</span>
                <span className={s.SurveyCount}>{props.survey.questions_count} Questions</span>
                <div className={s.Instructions}>
                    <Typography paragraph color="primary" variant="h6">{"Description"}</Typography>
                    <div className={s.Description}>
                        <Typography color="textSecondary" variant="body1">{props.survey.description}</Typography>
                    </div>
                </div>
                <Button color='primary' onClick={props.start} variant='contained'>Start Survey</Button>
            </Grid>
        </div>
    )
};

export default StartSurvey;