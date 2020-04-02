import React from "react";
import ShowQuiz from "../Editing/showQuiz";
import EditDescription from "../Editing/editDescription";
import {deleteQuiz, postQuiz} from "../../../services/api/myquizzes";

class Quiz extends React.Component {
//quiz_name, questions_count, description, last_edited_date
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            id: this.props.value.id,
            description: this.props.value.description,
            quiz_name: this.props.value.quiz_name,
            quizChange: false,
            mixed: this.props.value.mixed,
            point: this.props.value.point,
            showResult: this.props.value.showResult
        }
    }

    deleteQuizOnClick = () => {
        if(this.state.id !== undefined) {
            deleteQuiz(this.state.id)
        }
        this.props.deleteQuiz(this.props.value.id)
    };

    changeDescription = (event) => {
        this.setState({description: event.target.value})
        this.setState({quizChange: true})

    };
    changeQuizName = (event) => {
        this.setState({quiz_name: event.target.value});
        this.setState({quizChange: true})
    };
    editMode = () => {
        this.setState({editMode: true})
    };
    saveButton = async () => {
        this.setState({editMode: false});
        if (this.state.quizChange) {
            const quiz = {
                quiz_name: this.state.quiz_name,
                description: this.state.description,
                mixed: this.state.mixed,
                point: this.state.point,
                showResult: this.state.showResult
            };
            // await postQuiz([quizzes]);
            this.setState({quizChange: false})
        }
    };

    render() {
        if (!this.state.editMode) {
            return (<div>
                    <ShowQuiz
                        deleteQuizOnClick={this.deleteQuizOnClick}
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
                    saveButton={this.saveButton}
                    {...this.props}
                />
            )
        }
    }
}

export default Quiz;
