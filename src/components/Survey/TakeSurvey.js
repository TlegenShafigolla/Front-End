import React from "react";
import s from "./TakeSurvey.module.css";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-scroll";
import Questions from "./Questions";
import {Dialog} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import {NavLink} from "react-router-dom";
import Slide from "@material-ui/core/Slide/Slide";
import {getQuestion} from "../../services/API/userAPI/Survey/questions";
import {postAnswer} from "../../services/API/userAPI/Survey/answers";
import Grid from "@material-ui/core/Grid";

class TakeSurvey extends React.Component{
    constructor(props) {
        super(props);
        const path = window.location.pathname.split('/');
        this.state = {
            link: path[2],
            survey_name: '',
            questions_count: 0,
            description: '',
            questions: [],
            answers: [],
            endTestDialog: false,
        };
    }

    onClickSubmit = () => {
        const finished = 1;
        const session_id = localStorage.getItem(`session_id${this.state.link}`);
        postAnswer(this.state.link, session_id, finished, this.state.answers).then(val => {
            console.log(val);
            localStorage.removeItem(`session_id${this.state.link}`);
            localStorage.removeItem(`survey_started${this.state.link}`);
            this.setState({endTestDialog: true});
        })
    };

    onChangeCheck = (event) => {
        let answers = this.state.answers;
        if (event.target.checked) {
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].question_id === Number(event.target.id)) {
                    answers[i].answer_ids.push(Number(event.target.value));
                    this.setState({answers: answers});
                    return;
                }
            }
            let newAnswer = {
                "question_id": event.target.id,
                "answer_ids": [event.target.value]
            };
            answers.push(newAnswer);
            this.setState({answers: answers});
        } else if (!event.target.checked) {
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].question_id === Number(event.target.id)) {
                    for (let j = 0; j < answers[i].answer_ids.length; j++) {
                        if (answers[i].answer_ids[j] === Number(event.target.value)) {
                            answers[i].answer_ids.splice(j, 1);
                        }
                    }
                    if (answers[i].answer_ids.length === 0) {
                        answers.splice(i, 1)
                    }
                    this.setState({answers: answers});
                    break;
                }
            }
        }
    };

    onChangeAnswer = (event) => {
        let answers = this.state.answers;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].question_id === event.target.id) {
                answers[i].answer = event.target.value;
                if (answers[i].answer === null || answers[i].answer === '') {
                    answers.splice(i, 1);
                }
                this.setState({answers: answers});
                return;
            }
        }
        let newQuestion = {
            "question_id": event.target.id,
            "answer": event.target.value
        };
        answers.push(newQuestion);
        this.setState({answers: answers});
    };

    componentDidMount() {
        getQuestion(localStorage.getItem(`session_id${this.state.link}`)).then(json => {
            console.log(json);
            this.setState({
                questions: json.questions,
                survey_name: json.survey.survey_name,
                questions_count: json.survey.questions_count,
                description: json.survey.description,
            });
        });
    }

    render() {
        const Transition = React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });

        return (
            <div className={s.SurveyPage}>
                <AppBar>
                    <Toolbar className={s.Header}>
                        <p>{this.state.survey_name}</p>
                        <Button variant="outlined" size="medium" onClick={this.onClickSubmit}>End Test</Button>
                    </Toolbar>
                </AppBar>
                <div className={s.Survey}>
                    <Grid
                        container
                        direction="row"
                        alignItems="flex-start"
                        justify="center">
                        <Grid
                            direction="column"
                            lg={8} md={8} sm={12} xs={12}>
                            {this.state.questions === undefined || this.state.questions === null ? ' ' :
                                this.state.questions.map((val, index) => <Questions
                                    onChangeCheck={this.onChangeCheck}
                                    onChangeAnswer={this.onChangeAnswer}
                                    key={val._id.toString()}
                                    index={index}
                                    value={val}
                                />)}
                        </Grid>
                    </Grid>
                </div>
                {/*    {this.state.questions === undefined || this.state.questions === null ? ' ' :*/}
                {/*        this.state.questions.map((val, index) =>*/}
                {/*            <Link*/}
                {/*                key={index}*/}
                {/*                activeClass="active"*/}
                {/*                to={index.toString()}*/}
                {/*                spy={true}*/}
                {/*                smooth={true}*/}
                {/*                offset={-130}*/}
                {/*                duration={500}>*/}
                {/*                <Button key={index}>{index + 1}</Button>*/}
                {/*            </Link>)}*/}
                {/*</div>*/}


        <Dialog open={this.state.endTestDialog} fullScreen TransitionComponent={Transition}>
            <DialogContent>
                <Typography variant='h5'>
                    Thank you for passing the survey
                </Typography>
            </DialogContent>

            <DialogActions>
                <NavLink className={s.Button} to='/'>
                    <Button color='primary' variant='contained'>Back to home page</Button>
                </NavLink>
            </DialogActions>
        </Dialog>
    </div>
    );
    }
    }

    export default TakeSurvey;