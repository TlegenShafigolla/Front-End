import Question from "./Questions";
import {Dialog} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import {postQuizAnswer} from "../../services/API/userAPI/Quiz/answers";
import {postTakeQuestion} from "../../services/API/userAPI/Quiz/questions";
import s from './Quiz.module.css'
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import {NavLink} from "react-router-dom";
import Grid from "@material-ui/core/Grid";


class QuizPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startTestDialog: localStorage.getItem('start_test') === null,
            endTestDialog: false,
            questions: [],
            answers: [],
            corrects: undefined,
            quiz_name: '',
            description: '',
            questions_count: '',
            points: undefined,
            maxPoint: null,
            time_limit: null,
            time_left: null,
            time: null,
        }
    }


    onChangeCheck = (event, questionId, answerId, max, id, index) => {
        let answers = this.state.answers;
        if (event.target.checked) {
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].question_id === questionId) {
                    if (answers[i].answer_ids.length < max) {
                        answers[i].answer_ids.push(answerId);
                        this.setState({answers: answers});
                    }
                    return;
                }
            }
            let newQuestion = {
                "question_id": questionId,
                "answer_ids": [answerId]
            };
            answers.push(newQuestion);
            this.setState({answers: answers});
        }
        if (!event.target.checked) {
            let question = this.state.questions
            question[index].answers[id] = {
                ...question[index].answers[id],
                check: 0
            }
            this.setState({questions: question})
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].question_id === questionId) {
                    for (let j = 0; j < answers[i].answer_ids.length; j++) {
                        if (answers[i].answer_ids[j] === answerId) {
                            answers[i].answer_ids.splice(j, 1);
                        }
                    }
                    if (answers[i].answer_ids.length === 0) {
                        answers.splice(i, 1)
                    }
                    this.setState({answers: answers});
                    return;
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
                    answers.splice(i, 1)
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


    onClickSubmit = () => {
        this.setState({time_limit: null});
        const finished = 1;
        const path = window.location.pathname.split('/');
        const session_id = localStorage.getItem(`session_id${path[2]}`);
        const answers = this.state.answers;
        postQuizAnswer(path[2], session_id, finished, answers).then(val => {
            console.log(val);
            this.setState({corrects: val.corrects});
            this.setState({points: val.points});
            localStorage.removeItem(`session_id${path[2]}`);
            localStorage.removeItem('start_test');
            localStorage.removeItem('time_limit');
            this.setState({endTestDialog: true});
        })
    };


    componentDidMount() {
        let path = window.location.pathname.split('/');
        postTakeQuestion(localStorage.getItem(`session_id${path[2]}`)).then(json => {
            if (json.time_limit !== null) {
                this.setState({time_limit: json.time_limit * 60})
            }
            this.setState({
                questions: json.questions,
                quiz_name: json.quiz.quiz_name,
                questions_count: json.quiz.questions_count,
                description: json.quiz.description,
            });
            const lastTime = Number(new Date(localStorage.getItem('date')));
            if (lastTime !== 0 && lastTime !== undefined) {
                let newTime = Number(new Date());
                let time = Math.round((newTime - lastTime) / 1000);
                let time_limit = Number(localStorage.getItem('time_limit'));
                localStorage.setItem('time_limit', (time_limit + time).toString())
            }
            this.startTime()
        });
    }

    startTime = () => {
        if (this.state.time_limit !== null) {
            let timer = setInterval(() => {
                let timeLeft = Number(localStorage.getItem('time_limit')) + 1;
                if (timeLeft >= this.state.time_limit) {
                    clearInterval(timer)
                }
                localStorage.setItem('time_limit', timeLeft.toString());
                let sec = this.state.time_limit - timeLeft;
                let h = sec / 3600 ^ 0;
                let m = (sec - h * 3600) / 60 ^ 0;
                let s = sec - h * 3600 - m * 60;
                let time_left = (h < 10 ? "0" + h : h) + " h.  " + (m < 10 ? "0" + m : m) + " min. " + (s < 10 ? "0" + s : s) + " sec.";
                this.setState({time_left: time_left});
                this.setState({time: this.state.time_limit - timeLeft})
            }, 1000);
        }
    };

    render() {
        if (this.state.time_limit !== null) {
            window.onbeforeunload = function () {
                let date = new Date();
                localStorage.setItem('date', date)
            };
        }
        if (this.state.time === 0) {
            this.onClickSubmit();
            this.setState({time: null})
        }
        const Transition = React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });

        return (
            <div className={s.QuizPage}>
                <AppBar position='fixed'>
                    <Toolbar className={s.Header}>
                        <p className={s.QuizNameHeader}> {this.state.quiz_name}</p>
                        {this.state.time_left === null ? '' : "Time left: " + this.state.time_left}
                        <Button variant="outlined" size="medium" onClick={this.onClickSubmit}>End Test</Button>
                    </Toolbar>
                </AppBar>
                <div className={s.quiz}>
                    <Grid
                        container
                        direction="row"
                        justify='center'
                       >
                        <Grid
                            item
                            lg={8} md={8} sm={12} xs={12}>
                            {this.state.questions === undefined || this.state.questions === null ? ' ' :
                                this.state.questions.map((val, index) =>
                                    <Question onChangeCheck={this.onChangeCheck}
                                              onChangeAnswer={this.onChangeAnswer}
                                              key={val._id.toString()}
                                              answers={this.state.answers}
                                              index={index}
                                              value={val}/>
                                )}
                        </Grid>
                        <Grid
                            direction="column"
                            alignItems="center"
                            container
                            className={s.BoardGrid}>
                            {/*{this.state.questions === undefined || this.state.questions === null ? ' ' :*/}
                            {/*    this.state.questions.map((val, index) =>*/}
                            {/*        <div key={index}  className={s.Board}>*/}
                            {/*        <Link*/}
                            {/*            activeClass="active"*/}
                            {/*            to={index.toString()}*/}
                            {/*            spy={true}*/}
                            {/*            smooth={true}*/}
                            {/*            offset={-130}*/}
                            {/*            duration={500}>*/}
                            {/*            <Button key={index}>{index + 1}*/}

                            {/*            </Button></Link>*/}
                            {/*        </div>)}*/}
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.endTestDialog} fullScreen TransitionComponent={Transition}>
                    <Grid container
                          direction="column"
                          justify="space-between"
                          alignItems="center">
                        <Typography variant='h5'>
                            Thank you for passing the test
                            {this.state.showResults ? ' You result: ' + (this.state.corrects === undefined ? this.state.points : this.state.corrects) + ' points' : ''}
                        </Typography>

                        <NavLink className={s.button} to='/'>
                            <Button color='primary' variant='contained'>Back to home page</Button>
                        </NavLink>
                    </Grid>
                </Dialog>
            </div>
        );
    }
}

export default QuizPage;