import React from "react";
import ShowQuestion from "../../components/QuizEditor/Editing/Question/showQuestion";
import EditQuestion from "../../components/QuizEditor/Editing/Question/editQuestion";
import { postAnswers, putAnswers} from "../../services/API/adminAPI/Quiz/answers";
import {deleteQuestions, putQuestions} from "../../services/API/adminAPI/Quiz/questions";
import makeID from "../../services/utils";
import Snackbar from "@material-ui/core/Snackbar";
import s from '../../components/QuizEditor/Editing/css/editQuestion.module.css'
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import {Draggable} from "react-beautiful-dnd";
import {connect} from "react-redux";
import {
    addNewAnswer,
    changeAnswer,
    changePoint,
    deleteAnswer,
    requestAnswers
} from "../../redux/QuizEditor/Questions/actions";
import {getAnswers} from "../../redux/Reselects/QuizEditor-reselect";

class Question extends React.Component {
    state = {
        editMode: this.props.value.question === " ",
        id: this.props.value._id,
        quiz_id: this.props.value.quiz_id,
        answerType: this.props.value.type,
        question: this.props.value.question,
        questionChanged: false,
        answersChanged: false,
        answers: this.props.answers,
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
        this.props.requestAnswers(this.state.id)
    }

    onChangePoint = (event) => {
        this.props.changePoint(Number(event.target.id), event.target.value);
        this.setState({answersChanged: true});
    };

    changeCheck = (event,index) => {
        this.props.changePoint(index,Number(event.target.id), Number(event.target.checked));
        this.setState({answersChanged: true});
    };

    changeType = (index,newType) => {
        console.log(index)
        this.setState({answerType: newType});
        this.setState({questionChanged: true});
        this.setState({answersChanged: true});
        for (let i = this.props.answers[index].length - 1; i >= 0; i--) {
            this.deleteAnswerOnClick(index,i);
        }
    };

    editOnClick = () => {
        this.setState({editMode: true});
    };

    deleteAnswerOnClick = (index,id) => {
        // let answers = this.state.answers;
        this.props.deleteAnswer(index,id)
        // this.setState({answersChanged: true});
        // if (this.state.id !== undefined && answers[index]._id !== undefined) {
        //     deleteAnswers(this.state.id, answers[index]._id);
        // }
        // let index_key = this.state.index_key;
        // for (let i = index; i < answers.length - 1; i++) {
        //     index_key[i] = this.state.index_key[i + 1];
        // }
        // delete index_key[answers.length - 1];
        // answers.splice(index, 1);
        // this.setState({answers: answers});
        // this.setState({index_key: index_key});
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
            await this.props.deleteQuestion(this.props.value.order_id);
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
        for (let j in answer) {
            if (answer[j].answer === '') {
                empty = 1
            }
            if (answer[j].points === 0) {
                wrong++
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
                                await putAnswers(this.state.id, value);
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

    onChangeAnswer = (event,index,id) => {
        this.props.changeAnswer(event.target.value,index,id);
    };

    onCloseDialogAnswer = () => {
        this.setState({dialogOpenAnswer: false})
    };

    onChangeQuestion = (event) => {
        this.setState({question: event.target.value.trim()});
    };

    addNewAnswers = (index) => {
        this.props.addNewAnswer(index);

    };
    onClick = () => {
        this.setState({dialogOpenAnswer: false})
    };

    render() {
        console.log(this.props.answers)
        if (this.state.editMode) {
            return <> <EditQuestion
                errorAnswer={this.state.errorAnswer}
                errorQuestion={this.state.errorQuestion}
                changeCheck={this.changeCheck}
                changePoint={this.onChangePoint}
                deleteAnswerOnClick={this.deleteAnswerOnClick}
                onChangeAnswer={this.onChangeAnswer}
                addNewAnswers={this.addNewAnswers}
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
                    onClose={this.onCloseDialogAnswer}>
                    <Alert variant='filled' severity="error">
                        <Typography>There must be at least 1 correct and 1 incorrect answer</Typography>
                    </Alert>
                </Snackbar>
            </>
        }
        return (
            <Draggable draggableId={this.props.value._id} index={this.props.index}>
                {provided => (
                    <div {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         ref={provided.innerRef}
                         className={s.Question}
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

let mapStateToProps = (state) => {
    return {
        answers: getAnswers(state)
    }
};
export default connect(mapStateToProps, {requestAnswers, changePoint, changeAnswer,deleteAnswer,addNewAnswer})(Question);
