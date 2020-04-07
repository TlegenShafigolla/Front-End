import Question from "./Questions";
import {Dialog} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {postQuizAnswer} from "../../services/userAPI/answers";
import {postTakeQuestion} from "../../services/userAPI/questions";

class StartQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTestDialog: false,
            questions: [],
            answers: [],
            finished: 0,
        }
    }

    onChangeCheck = (event) => {
        let answers = this.state.answers;
        if (event.target.checked) {
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].question_id === Number(event.target.name)) {
                    answers[i].answer_ids.push(Number(event.target.value));
                    this.setState({answers: answers});
                    return;
                }
            }
            let newQuestion = {
                "question_id": Number(event.target.name),
                "answer_ids": [Number(event.target.value)]
            };
            answers.push(newQuestion);
            this.setState({answers: answers});
        }

        if (!event.target.checked) {
            for (let i = 0; i < answers.length; i++) {
                for (let j = 0; j < answers[i].answer_ids.length; j++) {
                    if (answers[i].question_id === Number(event.target.name)) {
                        if (answers[i].answer_ids[j] === Number(event.target.value)) {
                            answers[i].answer_ids.splice(j, 1);
                            this.setState({answers: answers});
                            return;
                        }
                    }
                }
            }

            }
        }



    onChangeAnswer = (event) => {
        let answers = this.state.answers;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].question_id === Number(event.target.id)) {
                answers[i].answer = event.target.value;
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

    componentDidMount() {
        const path = window.location.pathname.split('/');
        const session_id = localStorage.getItem('session_id');
        postTakeQuestion(path[2], session_id).then(json => {
            this.setState({questions: json.questions});
            console.log(json)

        });
    }

    componentWillMount() {
        this.setState({startTestDialog: true})
    }

    onClickSubmit = async () => {
        this.setState({finished: 1});
        if (this.state.finished === 1) {
            const path = window.location.pathname.split('/');
            const session_id = localStorage.getItem('session_id');
            let answer = this.state.answers;
            await postQuizAnswer(path[2], session_id, this.state.finished, answer).then(val => console.log(val))
            localStorage.clear()
        }
    };
    startTest = () => {
        this.setState({startTestDialog: false})
    }

    render() {
        console.log(this.state.answers);
        return (
            <div >
                <div> {this.state.questions === undefined || this.state.questions === null ? ' ' :
                    this.state.questions.map((val, index) => <Question
                        onChangeCheck={this.onChangeCheck}
                        onChangeAnswer={this.onChangeAnswer}
                        key={val.id}
                        index={index}
                        value={val}
                    />)}
                </div>
                <div>
                    <Button onClick={this.onClickSubmit}>Submit</Button>
                </div>
                <Dialog open={this.state.startTestDialog} fullScreen={this.state.startTestDialog}>
                    <DialogActions>
                        <Button color='primary' onClick={this.startTest}>Start test</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default StartQuiz;