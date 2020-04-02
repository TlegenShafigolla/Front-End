import React from "react";
import ShowQuiz from "../Editing/showQuiz";
import EditDescription from "../Editing/editDescription";

class Quiz extends React.Component {
//quiz_name, questions_count, description, last_edited_date
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.value.description,
            quiz_name: this.props.value.quiz_name,
            editMode: false,
        }
    }

    changeDescription = (event) => {
        this.setState({description: event.target.value})
    }
    changeQuizName = (event) => {
        this.setState({quiz_name: event.target.value});
    }
    editMode = () => {
        this.setState({editMode: true})
    }
    showMode = () => {
        this.setState({editMode: false})
    }

    render() {
        if (!this.state.editMode) {
            return (<div>
                    <ShowQuiz
                        editMode={this.editMode}
                        quiz_name={this.state.quiz_name}
                        description={this.state.description}
                        {...this.props}
                    />
                </div>
            );
        } else {
            return (
                <EditDescription
                    quiz_name={this.state.quiz_name}
                    description={this.state.description}
                    changeDescription={this.changeDescription}
                    changeQuizName={this.changeQuizName}
                    showMode={this.showMode}
                    {...this.props}
                />
            )
        }
    }
}

export default Quiz;
