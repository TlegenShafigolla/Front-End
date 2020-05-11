import React from "react";
import {Draggable} from "react-beautiful-dnd";
import ShowQuestion from "./showQuestion";
import s from "./question.module.css";
import {deleteQuestions} from "../../services/API/adminAPI/Survey/questions";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Alert from "@material-ui/lab/Alert/Alert";
import Typography from "@material-ui/core/Typography";
import EditQuestion from "./editQuestion";
import makeID from "../../../src/services/utils";
import {deleteAnswers} from "../../services/API/adminAPI/Survey/answers";

class Question extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
            id: this.props.value._id,
            survey_id: this.props.value.survey_id,
            answerType: this.props.value.type,
            question: this.props.value.question,
            image: this.props.value.image,
            answers: [],
            index_key: {},
            disabledDelete: false,
        };
    }

    editOnClick = () => {
        this.setState({editMode: true});
    };

    deleteQuestionOnClick = async () => {
        if (this.state.disabledDelete) {
            return ''
        }
        this.setState({disabledDelete: true});
        if (this.state.id !== undefined) {
            await deleteQuestions(this.state.survey_id, this.state.id).then(val => {
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

    onChangeAnswer = (event) => {
        let answers = this.state.answers;
        answers[Number(event.target.id)].answer = event.target.value.trim();
        this.setState({answers: answers});
        this.setState({answersChanged: true});
        this.setState({errorAnswer: false});
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

    onChangeQuestion = (event) => {
        this.setState({question: event.target.value.trim()});
        this.setState({questionChanged: true});
        this.setState({errorQuestion: false})
    };

    saveOnClick = () => {

    };

    changeType = (newType) => {
        this.setState({answerType: newType});
        this.setState({questionChanged: true});
        this.setState({answersChanged: true});
        /*
        for (let i = 0; i < this.state.answers.length; i++) {
            this.deleteAnswerOnClick(i);
        }*/
    };

    render() {
        if(this.state.editMode){
            return (
                <div>
                    <Draggable draggableId={this.props.value._id} index={this.props.index}>
                        {provided => (
                            <div {...provided.draggableProps}
                                 {...provided.dragHandleProps}
                                 ref={provided.innerRef}
                            >
                                <EditQuestion
                                    errorAnswer={this.state.errorAnswer}
                                    errorQuestion={this.state.errorQuestion}
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
                                    {...this.props}/></div>)}</Draggable>
                    <Snackbar
                        open={this.state.dialogOpenAnswer}
                        autoHideDuration={6000}
                        onClose={this.onCloseDialogAnswer}>
                        <Alert variant='filled' severity="error">
                            <Typography>There must be at least 1 correct and 1 incorrect answer</Typography>
                        </Alert>
                    </Snackbar>
                </div>
            );
        }
        return(
            <Draggable draggableId={this.props.value._id} index={this.props.index}>
                {provided => (
                    <div {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         ref={provided.innerRef}
                         className={s.Question}>
                        <ShowQuestion editOnClick={this.editOnClick}
                                      deleteQuestionOnClick={this.deleteQuestionOnClick}
                                      answerType={this.state.answerType}
                                      answers={this.state.answers}
                                      question={this.state.question}
                                      question_id={this.state.id}
                                      {...this.props}/>
                    </div>)}
            </Draggable>
        );
    }
}

export default Question;