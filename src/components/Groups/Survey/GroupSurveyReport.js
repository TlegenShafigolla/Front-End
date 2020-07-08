import React from "react";
import Grid from "@material-ui/core/Grid";
import s from "../GroupReport.module.css";
import MoreIcon from "@material-ui/icons/More";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import QuestionInfo from "./QuestionInfo";
import Questions from "./Questions";
import Preloader from "../../common/Preloader";

class GroupSurveyReport extends React.Component {
    state = {
        index: 0,
        question: false,
        question_number: 0
    }

    componentDidMount() {
        this.props.requestSurveyReportGroup(this.props.match.params.id)
    }

    onClickQuestion = event => {
        this.setState({
            question: true,
            question_number: Number(event.target.id)
        })
    }
    render() {
        if (this.props.report === null) {
            return <Preloader/>;
        }
        return (
            <Grid container
                  alignItems="flex-start"
                  justify="space-between"
                  spacing={3}
            >
                <Grid item lg={3} md={3} sm={2} container justify={"center"} alignItems={"flex-start"}>
                    {this.props.report.sessions[0] !== undefined ? <div className={s.QuestionSideBar}>
                        <div className={s.IconQuestion} onClick={this.onClickQuestionSideBar}><MoreIcon/></div>
                        <Paper elevation={3}
                               square className={s.Questions}>
                            <ol type='1'>{this.props.report.questions.map((val, index) =>
                                <li className={s.Question} onClick={this.onClickQuestion} id={index} key={val._id}
                                >
                                    {val.question}
                                </li>
                            )
                            }</ol>
                        </Paper>
                    </div> : null}
                </Grid>
                <Grid item lg={6} md={6} sm={8} xs={12}>
                    <Grid
                        container
                        direction="column"
                        spacing={1}
                    >
                        <Paper square elevation={3} className={s.Quiz}>
                            <Typography>{this.props.report.survey_used.survey_name}</Typography>
                            <Typography>{this.props.report.survey_used.description}</Typography>
                        </Paper>
                        {this.state.question ?
                            <QuestionInfo question_number={this.state.question_number} report={this.props.report}/> :
                            this.props.report.questions.map((val, index) => <Questions
                                report={this.props.report}
                                index={this.state.index}
                                question_number={index}
                                key={val._id} val={val}/>)}
                    </Grid>
                </Grid>
                <Grid item lg={3} md={3} sm={2} container justify={"center"} alignItems={"flex-start"}>
                    <div className={s.EmailSideBar}>
                        <div className={s.Icon} onClick={this.onClickIcon}><MoreIcon/></div>
                        <Paper elevation={3}
                               square className={s.Emails}>
                            {this.props.report.sessions.map((val, index) => <div className={s.Email}
                                                                                 key={val._id} id={index}
                                                                                 onClick={(e) => this.setState({
                                                                                     index: e.target.id,
                                                                                     question: false
                                                                                 })}>{val.email}</div>)}
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        );
    }

}

export default GroupSurveyReport;