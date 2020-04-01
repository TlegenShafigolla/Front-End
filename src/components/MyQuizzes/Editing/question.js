import React from "react";
import ShowQuestion from "./showQuestion";
import EditQuestion from "./editQuestion";
import getAnswers, {postAnswers} from "../../../services/api/answers";
import {postQuestions} from "../../../services/api/questions";


class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            id: this.props.value.id,
            answerType: this.props.value.type,
            question: this.props.value.question,
            questionChanged: false,
            answersChanged: false,
            answers: [],
            image: this.props.value.image,
            disableSaveButton: false,
        };
    }

    componentDidMount() {
        if(this.state.id !== undefined){
            getAnswers(this.state.id).then(val => this.setState({answers: val.answers}))
        }
    }
    changePoint=(event)=>{
        let answer = this.state.answers;
        answer[Number(event.target.id)].points = event.target.value;
        this.setState({answers: answer});
        this.setState({answersChanged: true});
    }
    changeType = (newType) => {
        this.setState({answerType: newType});
    };

    editOnClick = () => {
        this.setState({editMode: true});
    };

    deleteOnClick = () => {
    };

    saveOnClick = async () => {
        if(this.state.disableSaveButton){
            return;
        }
        this.setState({disableSaveButton: true});
        if(this.state.id == null && (this.state.questionChanged || this.state.answersChanged)){
            const question = {
                quiz_id: this.props.value.quiz_id,
                order_id: this.props.value.order_id,
                type: this.state.answerType,
                question: this.state.question,
                image: this.state.image,
            };
            await postQuestions(this.props.value.quiz_id, [question]).then(ret => this.setState({id: ret.created.id}));
            console.log(this.state.id);
            this.setState({questionChanged: false});
        }
        if(this.state.questionChanged){
            const question = {
                id: this.state.id,
                quiz_id: this.props.value.quiz_id,
                order_id: this.props.value.order_id,
                type: this.state.answerType,
                question: this.state.question,
                image: this.state.image,
            };
            console.log(question);
            await postQuestions(this.props.value.quiz_id, [question]);
            this.setState({questionChanged: false});
        }
        if(this.state.answersChanged){
            await postAnswers(this.state.id, this.state.answers);
            if(this.state.id !== undefined){
                await getAnswers(this.state.id).then(val => this.setState({answers: val.answers}))
            }
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
        this.setState({ question: event.target.value});
        this.setState({ questionChanged: true});
    };

    addNewAnswer =() => {
        const answers = this.state.answers;
        answers.push({
            question_id: this.props.value.id,
            correct: 0,
            points: 0,
            answer: 'New answer',
        });
        this.setState({answers: answers})
    };

    render() {
        if (this.state.editMode) {
            return <EditQuestion
                changePoint={this.changePoint}
                point={this.props.point}
                correctWrong={this.props.correctWrong}
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
                {...this.props}/>
        } else {
            return <ShowQuestion editOnClick={this.editOnClick}
                                 deleteOnClick={this.deleteOnClick}
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
