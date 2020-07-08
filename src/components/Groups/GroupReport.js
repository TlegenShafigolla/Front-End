import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Questions from "./Questions";
import $ from 'jquery'
import MoreIcon from '@material-ui/icons/More';
import s from './GroupReport.module.css'
import Typography from "@material-ui/core/Typography";
import QuestionInfo from "./QuestionInfo";
import Preloader from "../common/Preloader";

class GroupReport extends React.Component {
    state = {
        index: 0,
        question: false,
        question_number: 0
    }

    componentDidMount() {
        this.props.requestReportGroup(this.props.match.params.id)
    }

    onClickIcon = () => {
        $('.' + s.EmailSideBar).toggleClass(s.active)
    }
    onClickQuestionSideBar = () => {
        $('.' + s.QuestionSideBar).toggleClass(s.Active)
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
        $('.' + s.Questions).find('.' + s.Question).on('click', function () {
            const _this = $(this);
            _this
                .parent()
                .children()
                .removeClass(s.focus);
            _this.addClass(s.focus);
        });
        $('.' + s.Emails).find('.' + s.Email).on('click', function () {
            const _this = $(this);
            _this
                .parent()
                .children()
                .removeClass(s.focus);
            _this.addClass(s.focus);
        });
        return (
            <Grid container
                  alignItems="flex-start"
                  justify="space-between"
                  spacing={3}
            >
                <Grid item lg={3} md={3} sm={2} container justify={"center"} alignItems={"flex-start"}>
                    {this.props.report.questions[0].session!==undefined?<div className={s.QuestionSideBar}>
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
                    </div>:null}
                </Grid>
                <Grid item lg={6} md={6} sm={8} xs={12}>
                    <Grid
                        container
                        direction="column"
                        spacing={1}
                    >
                        <Paper square elevation={3} className={s.Quiz}>
                            <Typography>{this.props.report.quiz_used.quiz_name}</Typography>
                            <Typography>{this.props.report.quiz_used.description}</Typography>
                        </Paper>{this.state.question ?
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

export default GroupReport;