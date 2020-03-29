import React from "react";
import ShowQuestion from "./showQuestion";
import EditQuestion from "./editQuestion";
import getAnswers from "../../../services/api/answers";


class Question extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
            answerType: this.props.value.type,
            answers: null
        };
    }

    componentDidMount() {
        getAnswers(this.state.question_id).then(val => this.setState({answers: val}));
    }

    changeType = (newType) => {
        this.setState({answerType: newType});
    };

    editOnClick = () => {
        this.setState({editMode: true});
    };

    deleteOnClick = () => {
    };

    saveOnClick = () => {
        this.setState({editMode: false});
    };

    render() {
        if(this.state.editMode){
            return <EditQuestion saveOnClick={this.saveOnClick}
                                 changeType={this.changeType}
                                 editMode={this.state.editMode}
                                 answerType={this.state.answerType}
                                 answers={this.state.answers}
                                 {...this.props}/>
        } else{
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
