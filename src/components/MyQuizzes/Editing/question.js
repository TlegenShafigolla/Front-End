import React from "react";
import ShowQuestion from "./showQuestion";
import EditQuestion from "./editQuestion";
import getAnswers, {deleteAnswers, postAnswers} from "../../../services/adminAPI/answers";
import {deleteQuestions, postQuestions} from "../../../services/adminAPI/questions";
import makeID from "../../../services/utils";
import Snackbar from "@material-ui/core/Snackbar";
import s from './css/editQuestion.module.css'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Typography from "@material-ui/core/Typography";

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: this.props.value.question === '',
            id: this.props.value.id,
            quiz_id: this.props.value.quiz_id,
            answerType: this.props.value.type,
            question: this.props.value.question,
            questionChanged: false,
            answersChanged: false,
            answers: [],
            image: this.props.value.image,
            disableSaveButton: false,
            index_key: {},
            addNewAnswerButton: false,
            dialogOpenAnswer: false
        };
    }

    componentDidMount() {
        if (this.state.id !== undefined) {
            getAnswers(this.state.id).then(val => {
                this.setState({answers: val.answers});
                let index_key = this.state.index_key;
                for (let i = 0; i < this.state.answers.length; i++) {
                    index_key[i] = makeID(8);
                }
                this.setState({index_key: index_key});
            })
        }
    }

    onChangePoint = (event) => {
        let answer = this.state.answers;
        answer[Number(event.target.id)].points = event.target.value;
        this.setState({answers: answer});
        this.setState({answersChanged: true});
    };

    changeCheck = (event) => {
        let answer = this.state.answers;
        answer[Number(event.target.id)].correct = Number(event.target.checked);
        this.setState({answers: answer});
        this.setState({answersChanged: true});
    };

    changeType = (newType) => {
        this.setState({answerType: newType});
        this.setState({questionChanged: true});
        this.setState({answersChanged: true});
        for (let i = 0; i < this.state.answers.length; i++) {
            this.deleteAnswerOnClick(i);
        }
    };

    editOnClick = () => {
        this.setState({editMode: true});
    };

    deleteAnswerOnClick = (index) => {
        let answers = this.state.answers;
        if (this.state.id !== undefined && answers[index].id !== undefined) {
            deleteAnswers(this.state.id, answers[index].id);
        }
        let index_key = this.state.index_key;
        for (let i = index; i < answers.length - 1; i++) {
            index_key[i] = this.state.index_key[i + 1];
        }
        delete index_key[answers.length - 1];
        answers.splice(index, 1);
        this.setState({answers: answers});
        this.setState({index_key: index_key});
    };

    deleteQuestionOnClick = () => {
        if (this.state.id !== undefined) {
            deleteQuestions(this.state.quiz_id, this.state.id).then(val => {
                    if (val.Status === 'Success') {
                        this.props.deleteQuestion(this.props.value.order_id);
                    }
                }
            );
        } else {
            this.props.deleteQuestion(this.props.value.order_id);
        }
    };

    saveOnClick = async (dialog) => {
        if (this.state.disableSaveButton) {
            return;
        }
        console.log(this.state.answers)
        console.log(this.state.question)

        this.setState({disableSaveButton: true});
        const answer = this.state.answers;
        let wrong = 0;
        for (let i = 0; i < answer.length; i++) {
            if (this.props.point) {
                if (answer[i].points === 0) {
                    wrong++
                }
            } else {
                if (answer[i].correct === 0) {
                    wrong++
                }
            }
        }

        let corrects = answer.length - wrong;
        console.log('c' + corrects)
        console.log('w' + wrong)
        console.log()
        if (this.state.answerType === 'MULTIPLE CHOICE' ? corrects > 0 && wrong > 0 : wrong === 0) {
            if (this.state.answersChanged) {
                let answers = this.state.answers;
                for (let i in answers) {
                    answers[i].question_id = this.state.id.toString();
                }
                await postAnswers(this.state.id, this.state.answers).then(json => console.log(json));
                await getAnswers(this.state.id).then(val => this.setState({answers: val.answers}));
                this.setState({answersChanged: false});
            }
            if (this.state.questionChanged) {
                const question = {
                    id: this.state.id,
                    quiz_id: this.state.quiz_id,
                    order_id: this.props.value.order_id,
                    type: this.state.answerType,
                    question: this.state.question,
                    image: this.state.image,
                };
                await postQuestions(this.state.quiz_id, [question]);
                this.setState({questionChanged: false});
                this.props.setQuestion(this.props.value.order_id, question);
            }
            this.setState({editMode: false});
        } else {
            console.log("ol" + this.state.dialogOpenAnswer)
            this.setState({dialogOpenAnswer: true})
        }

        this.setState({disableSaveButton: false});
    };
    onChangeAnswer = (event) => {
        let answer = this.state.answers;
        answer[Number(event.target.id)].answer = event.target.value;
        this.setState({answers: answer});
        this.setState({answersChanged: true});
    };
    onClose = () => {
        this.setState({dialogOpenAnswer: false})
    }
    onChangeQuestion = (event) => {
        this.setState({question: event.target.value});
        this.setState({questionChanged: true});
    };

    addNewAnswer = (correct = 0, points = 0) => {

        const answers = this.state.answers;
        answers.push({
            question_id: this.state.id,
            correct: correct,
            points: points,
            answer: '',
        });
        this.setState({answers: answers});
        let index_key = this.state.index_key;
        index_key[answers.length - 1] = makeID(8);
        this.setState({index_key: index_key});
        console.log(answers)
    };
    onClick = () => {
        this.setState({dialogOpenAnswer: false})
    };

    render() {
        if (this.state.editMode) {
            return <div>
                <EditQuestion
                    changeCheck={this.changeCheck}
                    changePoint={this.onChangePoint}
                    deleteAnswerOnClick={this.deleteAnswerOnClick}
                    onChangeAnswer={this.onChangeAnswer}
                    addNewAnswer={this.addNewAnswer}
                    onChangeQuestion={this.onChangeQuestion}
                    saveOnClick={this.saveOnClick}
                    changeType={this.changeType}
                    editMode={this.state.editMode}
                    answerType={this.state.answerType}
                    answers={this.state.answers}
                    question={this.state.question}
                    question_id={this.state.id}
                    index_key={this.state.index_key}
                    {...this.props}/>
                <Snackbar
                    open={this.state.dialogOpenAnswer}
                    autoHideDuration={6000}
                    onClose={this.onClose}
                >
                    <div className={s.snackbar} color={'secondary'}>
                        <div><ErrorOutlineIcon/></div>
                        <Typography>There must be at least 1 correct and incorrect answer</Typography>
                    </div>
                </Snackbar>
            </div>
        } else {
            return <ShowQuestion editOnClick={this.editOnClick}
                                 deleteQuestionOnClick={this.deleteQuestionOnClick}
                                 editMode={this.state.editMode}
                                 answerType={this.state.answerType}
                                 answers={this.state.answers}
                                 question={this.state.question}
                                 question_id={this.state.id}
                                 {...this.props}/>
        }
    }
}

export default Question;
