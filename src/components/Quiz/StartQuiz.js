import Question from "./Questions";
import {Dialog} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {postTakeQuestion} from "../../services/userAPI/questions";
import {postQuizAnswer} from "../../services/userAPI/answers";

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

        // const answers = this.state.answers;
        // const answer_ids = [];
        // answer_ids[Number(event.target.id)] = (event.target.checked);
        // answers.push({
        //     // question_id:Number(event.target.id),
        //     answer_ids: answer_ids
        // })
        // console.log('=' + event.target.id);
        // console.log(this.state.answers);
        // console.log(answer_ids)
    };
    onChangeAnswer = (event) => {
        let answers=this.state.answers;
        const answer=event.target.value.trim();
        answers[Number(event.target.id)]={
            question_id:Number(event.target.id),
            answer:answer}
        console.log(answers)

    };

    componentDidMount() {
        const path = window.location.pathname.split('/');
        const session_id = localStorage.getItem('session_id');
        postTakeQuestion(path[2], session_id).then(json => {
            this.setState({questions: json.questions})
            console.log(json)
        });
    }

    componentWillMount() {
        this.setState({startTestDialog: true})
    }

    onClickSubmit = async () => {
        this.setState({finished: 1})
        if (this.state.finished === 1) {
            const path = window.location.pathname.split('/');
            const session_id = localStorage.getItem('session_id');
            let answer = this.state.answers;
            await postQuizAnswer(path[2], session_id, this.state.finished, answer).then(val => console.log(val))
            localStorage.clear()
        }
    }
    startTest = () => {
        this.setState({startTestDialog: false})
    }

    render() {
        return (
            <div>
                <div> {this.state.questions === undefined || this.state.questions === null ? ' ' :
                    this.state.questions.map(val => <Question
                        onChangeCheck={this.onChangeCheck}
                        onChangeAnswer={this.onChangeAnswer}
                        key={val.id}
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