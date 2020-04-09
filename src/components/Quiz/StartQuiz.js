import Question from "./Questions";
import {Dialog} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {postQuizAnswer} from "../../services/userAPI/answers";
import {postTakeQuestion} from "../../services/userAPI/questions";
import s from './Quiz.module.css'
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

class StartQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTestDialog: localStorage.getItem('start_test') === null,
            endTestDialog: false,
            showResult: false,
            questions: [],
            answers: [],
            corrects: null,
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
                "question_id": Number(event.target.id),
                "answer_ids": [Number(event.target.value)]
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
            if (answers[i].question_id === Number(event.target.id)) {
                answers[i].answer = event.target.value;
                if (answers[i].answer === null || answers[i].answer === '') {
                    answers.splice(i, 1)
                }
                this.setState({answers: answers});
                return;
            }
        }
        let newQuestion = {
            "question_id": Number(event.target.id),
            "answer": [event.target.value]
        };
        answers.push(newQuestion);
        this.setState({answers: answers});

    };


    componentDidMount = ()=> {
        const path = window.location.pathname.split('/');
        const session_id = localStorage.getItem('session_id');
          postTakeQuestion(path[2], session_id).then(json => {
            this.setState({questions: json.questions});
            console.log(json)
        });
    }

    onClickSubmit = () => {
            const finished = 1;
            const path = window.location.pathname.split('/');
            const session_id = localStorage.getItem('session_id');
            let answer = this.state.answers;
            postQuizAnswer(path[2], session_id, finished, answer).then(val => {this.setState({corrects: val.corrects});
            console.log(val)
            localStorage.removeItem('session_id');
            this.setState({endTestDialog: true});
            localStorage.removeItem('start_test');
    })
    };
    startTest = () => {
        if(this.state.questions!==null||this.state.questions!==[]) {
            this.setState({startTestDialog: false});
            localStorage.setItem('start_test', 'true')
            localStorage.removeItem('endTest')
        }
    };
    render() {
        console.log(this.state.correct);
        return (
            <div>
                <AppBar>
                    <Toolbar>
                        header
                    </Toolbar>
                </AppBar>
                <div className={s.quiz}>
                    <div
                        className={s.questions}> {this.state.questions === undefined || this.state.questions === null ? ' ' :
                        this.state.questions.map((val, index) => <Question
                            onChangeCheck={this.onChangeCheck}
                            onChangeAnswer={this.onChangeAnswer}
                            key={val.id}
                            index={index}
                            value={val}
                        />)}
                    </div>
                    <div className={s.info}>
                        <div className={s.board}>
                            {this.state.questions === undefined || this.state.questions === null ? ' ' :
                                this.state.questions.map((val, index) => <div key={index}>{val.order_id}</div>)}
                        </div>
                        <Button variant='contained' color='primary' onClick={this.onClickSubmit}>End</Button>
                    </div>
                </div>
                <Dialog open={this.state.startTestDialog} fullScreen={this.state.startTestDialog}>
                    <DialogActions>
                        <Button color='primary' onClick={this.startTest}>Start test</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.endTestDialog} fullScreen={this.state.endTestDialog}>
                    <DialogContent>
                        <Typography>
                            Thank you for passing the test
                            {this.state.corrects===null?' null':'You result: '+ this.state.corrects+'/'+this.state.questions.length}
                        </Typography>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default StartQuiz;