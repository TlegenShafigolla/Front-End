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
            points: this.props.value.points,
            showResults: this.props.value.showResults,
            disabledSaveButton: false,
            last_edited_date: this.props.value.last_edited_date
        }
    }

    deleteQuizOnClick = () => {
        if (this.state.id !== undefined) {
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
        if(this.state.disabledSaveButton){
            return;
        }
        this.setState({disabledSaveButton:true});
        this.setState({editMode: false});
        if (this.state.quizChange) {
            const quiz = {
                id: this.state.id,
                quiz_name: this.state.quiz_name,
                description: this.state.description,
                mixed: this.state.mixed,
                points: this.state.points,
                showResults: this.state.showResults,
                last_edited_date: this.props.value.last_edited_date
            };
            await postQuiz(quiz).then(val => console.log(val));
            this.setState({quizChange: false})
        }
        this.setState({disabledSaveButton:false});

    };

    render() {
        if (!this.state.editMode) {
            return (<div>
                    <ShowQuiz
                        quiz_id={this.state.id}
                        deleteQuizOnClick={this.deleteQuizOnClick}
                        editMode={this.editMode}
                        quiz_name={this.state.quiz_name}
                        description={this.state.description}
                        last_edited_date={this.state.last_edited_date}
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
