import Question from "./Questions";
import {Dialog} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import {postQuizAnswer} from "../../services/userAPI/answers";
import {postTakeQuestion} from "../../services/userAPI/questions";
import s from './Quiz.module.css'
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-scroll";
import Slide from "@material-ui/core/Slide";
import {NavLink} from "react-router-dom";
import DialogActions from "@material-ui/core/DialogActions";


class StartQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTestDialog: localStorage.getItem('start_test') === null,
            endTestDialog: false,
            showResults: false,
            questions: [],
            answers: [],
            corrects: null,
            quiz_name: '',
            description: '',
            questions_count: '',
            points: null,
            maxPoint:null,
        }
    }

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
            let newQuestion = {
                "question_id": event.target.id,
                "answer_ids": [event.target.value]
            };
            answers.push(newQuestion);
            this.setState({answers: answers});
        }

        if (!event.target.checked) {
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


    componentDidMount = async () => {
        await postTakeQuestion(localStorage.getItem('session_id')).then(async json => {
            this.setState({questions: json.questions});
            this.setState({quiz_name: json.quiz.quiz_name});
            this.setState({questions_count: json.quiz.questions_count});
            this.setState({description: json.quiz.description});
            this.setState({showResults: json.quiz.showResults});
        });
    };

    onClickSubmit = () => {
        const finished = 1;
        const path = window.location.pathname.split('/');
        const session_id = localStorage.getItem('session_id');
        const answers = this.state.answers;
        postQuizAnswer(path[2], session_id, finished, answers).then(val => {
            console.log(val);
            this.setState({corrects: val.corrects});
            this.setState({points: val.points});
            localStorage.removeItem('session_id');
            this.setState({endTestDialog: true});
            localStorage.removeItem('start_test');
        })
    };

    startTest = () => {
        if (this.state.questions !== null || this.state.questions !== []) {
            this.setState({startTestDialog: false});
            localStorage.setItem('start_test', 'true');
            localStorage.removeItem('endTest')
        }
    };

    render() {
        const Transition = React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });
        return (
            <div>
                <AppBar>
                    <Toolbar className={s.header}>
                        <Typography variant='h6'> {this.state.quiz_name}</Typography>
                        <Button onClick={this.onClickSubmit}>End Test</Button>
                    </Toolbar>
                </AppBar>
                <div className={s.quiz}>
                    <div
                        className={s.questions}> {this.state.questions === undefined || this.state.questions === null ? ' ' :
                        this.state.questions.map((val, index) => <Question
                            onChangeCheck={this.onChangeCheck}
                            onChangeAnswer={this.onChangeAnswer}
                            key={val._id.toString()}
                            index={index}
                            value={val}
                        />)}
                    </div>
                    <div className={s.info}>

                        {this.state.questions === undefined || this.state.questions === null ? ' ' :
                            this.state.questions.map((val, index) =>
                                <Link
                                    key={index}
                                    activeClass="active"
                                    to={index.toString()}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    <Button key={index}>{index+1}

                                    </Button></Link>)}

                    </div>
                </div>
                <Dialog open={this.state.startTestDialog} className={s.dialog} fullScreen>

                    <div className={s.dialogActions}>
                        <div className={s.typography}><Typography
                            variant='h4'> {this.state.quiz_name}</Typography>
                        </div>
                        <Button color='primary' variant='contained' onClick={this.startTest}>Start test</Button>
                    </div>
                    <DialogContent className={s.dialogContent}>
                        <Typography variant='h6' color='textSecondary'>There are {this.state.questions_count} questions</Typography>
                        <Typography className={s.description} variant='h3'>{this.state.description}</Typography>
                    </DialogContent>
                </Dialog>
                <Dialog open={this.state.endTestDialog} fullScreen TransitionComponent={Transition}>
                    <DialogContent>
                        <Typography variant='h5'>
                            Thank you for passing the test
                            {this.state.showResults ?  ' You result: '+ (this.state.corrects === undefined ? this.state.points :this.state.corrects)+' points' : ''}
                        </Typography>
                    </DialogContent>

                    <DialogActions>
                        <NavLink className={s.button} to='/'>
                            <Button color='primary' variant='contained'>Back to home
                                page</Button>
                        </NavLink>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default StartQuiz;