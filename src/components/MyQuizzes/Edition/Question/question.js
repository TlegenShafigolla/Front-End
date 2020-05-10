import React from "react";
import ShowQuestion from "./showQuestion";
import EditQuestion from "./editQuestion";
import {getAnswers, deleteAnswers, postAnswers, putAnswers} from "../../../../services/API/adminAPI/answers";
import {deleteQuestions, putQuestions} from "../../../../services/API/adminAPI/questions";
import makeID from "../../../../services/utils";
import Snackbar from "@material-ui/core/Snackbar";
import s from '../css/editQuestion.module.css'
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import $ from "jquery";
import {Draggable} from "react-beautiful-dnd";

class Question extends React.Component {
    state = {
        editMode: this.props.value.question === " ",
        id: this.props.value._id,
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
        dialogOpenAnswer: false,
        errorQuestion: false,
        errorAnswer: false,
        disabledDelete: false
    };


    componentDidMount() {
        if (this.state.id !== undefined) {
            getAnswers(this.state.id).then(val => {
                this.setState({answers: val.answers});
                this.props.setAnswers(this.state.id, val.answers);
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
        if (this.state.id !== undefined && answers[index]._id !== undefined) {
            deleteAnswers(this.state.id, answers[index]._id);
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

    deleteQuestionOnClick = async () => {
        if (this.state.disabledDelete) {
            return ''
        }
        this.setState({disabledDelete: true});
        if (this.state.id !== undefined) {
            await deleteQuestions(this.state.quiz_id, this.state.id).then(val => {
                    if (val._id !== undefined) {
                        this.props.deleteQuestion(this.props.value.order_id);
                    }
                }
            );
        } else {
            this.props.deleteQuestion(this.props.value.order_id);
        }
        this.setState({disabledDelete: false})

    };

    saveOnClick = async () => {
        if (this.state.disableSaveButton) {
            return;
        }
        this.setState({disableSaveButton: true});
        const answer = this.state.answers;
        let wrong = 0;
        let empty = 0;
        for (let j = 0; j < answer.length; j++) {
            if (answer[j].answer === '') {
                empty = 1
            }
            if (this.props.point) {
                if (answer[j].points === 0) {
                    wrong++
                }
            } else {
                if (answer[j].correct === 0) {
                    wrong++
                }
            }
        }
        let corrects = answer.length - wrong;
        if (this.state.question !== '' && this.state.question !== ' ') {
            if (empty === 0) {
                if (this.state.answerType === 'MULTIPLE CHOICE' ? corrects > 0 && wrong > 0 : wrong === 0) {
                    this.setState({editMode: false});
                    if (this.state.answersChanged) {
                        let answers = this.state.answers;
                        for (let i in answers) {
                            answers[i].question_id = this.state.id.toString();
                        }
                        await Promise.all(this.state.answers.map(async value => {
                            if ('_id' in value) {
                                await putAnswers(this.state.id, value).then(val => console.log(val));
                            } else {
                                await postAnswers(this.state.id, value);
                            }
                        })).then((ret) => {
                            getAnswers(this.state.id).then(val => {
                                this.setState({answers: val.answers});
                                this.props.setAnswers(this.state.id, val.answers);
                            });
                        });
                        this.setState({answersChanged: false});
                    }
                    if (this.state.questionChanged) {
                        const question = {
                            _id: this.state.id,
                            quiz_id: this.state.quiz_id,
                            order_id: this.props.value.order_id,
                            type: this.state.answerType,
                            question: this.state.question,
                            image: this.state.image,
                        };
                        await putQuestions(this.state.quiz_id, question);
                        this.setState({questionChanged: false});
                        this.props.setQuestion(this.props.value.order_id, question);
                    }
                } else {
                    this.setState({dialogOpenAnswer: true})
                }
            } else {
                this.setState({errorAnswer: true})
            }
        } else {
            this.setState({errorQuestion: true})
        }

        this.setState({disableSaveButton: false});
    };

    onChangeAnswer = (event) => {
        let answers = this.state.answers;
        answers[Number(event.target.id)].answer = event.target.value.trim();
        this.setState({answers: answers});
        this.setState({answersChanged: true});
        this.setState({errorAnswer: false});
    };

    onClose = () => {
        this.setState({dialogOpenAnswer: false})
    };

    onChangeQuestion = (event) => {
        this.setState({question: event.target.value.trim()});
        this.setState({questionChanged: true});
        this.setState({errorQuestion: false})
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
    };
    onClick = () => {
        this.setState({dialogOpenAnswer: false})
    };

    render() {
        if (this.state.editMode) {
            return <div>
                <EditQuestion
                    errorAnswer={this.state.errorAnswer}
                    errorQuestion={this.state.errorQuestion}
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
                    deleteQuestionOnClick={this.deleteQuestionOnClick}
                    {...this.props}/>
                <Snackbar
                    open={this.state.dialogOpenAnswer}
                    autoHideDuration={6000}
                    onClose={this.onClose}
                >
                    <Alert variant='filled' severity="error"><Typography>There must be at least 1 correct and incorrect
                        answer</Typography></Alert>
                </Snackbar>
            </div>
        }
        return (
            <Draggable draggableId={this.props.value._id} index={this.props.index}>
                {provided => (
                    <div {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         ref={provided.innerRef}
                    >
            <ShowQuestion editOnClick={this.editOnClick}
                          deleteQuestionOnClick={this.deleteQuestionOnClick}
                          editMode={this.state.editMode}
                          answerType={this.state.answerType}
                          answers={this.state.answers}
                          question={this.state.question}
                          question_id={this.state.id}
                          {...this.props}/>
                    </div>)}</Draggable>
        )
    }
}

export default Question;
