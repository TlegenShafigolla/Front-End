import React from "react";
import ShowQuestion from "./showQuestion";
import EditQuestion from "./editQuestion";
import getAnswers from "../../../services/api/answers";


class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            answerType: this.props.value.type,
            answers: [],
        };
        this.onChangeAnswer=this.onChangeAnswer.bind(this)

    }

    componentDidMount() {
        getAnswers(this.props.value.id).then(val => this.setState({answers: val.answers}))
    }

    changeType = (newType) => {
        this.setState({answerType: newType});
    };

    editOnClick = () => {
        this.setState({editMode: true});
    };

    deleteOnClick = () => {
    };

    saveOnClick = (answer, correct, point) => {
        this.setState({editMode: false});
    };

    onChangeAnswer = (event) => {
        let answer = this.state.answers;
        answer[Number(event.target.id)].answer = event.target.value;
        this.setState({answers: answer});
    };

    addNewAnswer =() => {
        const answers = this.state.answers;
        answers.push({
            question_id: this.props.value.question_id,
            correct: 0,
            points: 0,
            answer: ''
        });
        this.setState({answers: answers})
    };
    render() {
        if (this.state.editMode) {
            return <EditQuestion
                onChangeAnswer={this.onChangeAnswer}
                addNewAnswer={this.addNewAnswer}
                saveOnClick={this.saveOnClick}
                changeType={this.changeType}
                editMode={this.state.editMode}
                answerType={this.state.answerType}
                answers={this.state.answers}
                {...this.props}/>
        } else {
            return <ShowQuestion editOnClick={this.editOnClick}
                                 deleteOnClick={this.deleteOnClick}
                                 editMode={this.state.editMode}
                                 answerType={this.state.answerType}
                                 answers={this.state.answers}
                                 {...this.props}/>
        }
    }
}

export default Question;
