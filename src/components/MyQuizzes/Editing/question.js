import React from "react";
import ShowQuestion from "./showQuestion";
import EditQuestion from "./editQuestion";
import getAnswers, {deleteAnswers, postAnswers} from "../../../services/adminAPI/answers";
import {deleteQuestions, postQuestions} from "../../../services/adminAPI/questions";
import makeID from "../../../services/utils";

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
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
        };
    }

    componentDidMount() {
        if (this.state.id !== undefined) {
            getAnswers(this.state.id).then(val => {
                this.setState({answers: val.answers});
                let index_key = this.state.index_key;
                for(let i = 0; i < this.state.answers.length; i++){
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
        for(let i = 0; i < this.state.answers.length; i++){
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
        for(let i = index; i < answers.length - 1; i++){
            index_key[i] = this.state.index_key[i+1];
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

    saveOnClick = async () => {
        if (this.state.disableSaveButton) {
            return;
        }
        this.setState({disableSaveButton: true});
        if (this.state.id === undefined && (this.state.questionChanged || this.state.answersChanged)) {
            const question = {
                quiz_id: this.state.quiz_id,
                order_id: this.props.value.order_id,
                type: this.state.answerType,
                question: this.state.question,
                image: this.state.image,
            };
            await postQuestions(this.state.quiz_id, [question]).then(ret => {
                this.setState({id: ret.created[0].id});
            });
            this.setState({questionChanged: false});
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
        }
        if (this.state.answersChanged) {
            let answers = this.state.answers;
            for (let i in answers) {
                answers[i].question_id = this.state.id.toString();
            }
            await postAnswers(this.state.id, this.state.answers).then(json => console.log(json));
            await getAnswers(this.state.id).then(val => this.setState({answers: val.answers}));
            this.setState({answersChanged: false});
        }
        this.setState({editMode: false});
        this.setState({disableSaveButton: false});
    };

    onChangeAnswer = (event) => {
        let answer = this.state.answers;
        answer[Number(event.target.id)].answer = event.target.value;
        this.setState({answers: answer});
        this.setState({answersChanged: true});
    };

    onChangeQuestion = (event) => {
        this.setState({question: event.target.value});
        this.setState({questionChanged: true});
    };

    addNewAnswer = (correct=0, points=0) => {
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

    render() {
        if (this.state.editMode) {
            return <EditQuestion
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
