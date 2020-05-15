import React from "react";
import ShowQuiz from "./showQuiz";
import {deleteQuiz} from "../../../services/API/adminAPI/Quiz/quiz";

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date(this.props.value.last_edited_date);
        this.state = {
            id: this.props.value._id,
            description: this.props.value.description,
            quiz_name: this.props.value.quiz_name,
            quizChange: false,
            mixed: this.props.value.mixed,
            points: this.props.value.points,
            showResults: this.props.value.showResults,
            disabledSaveButton: false,
            last_edited_date: date.toLocaleString(),
        }
    }

    deleteQuizOnClick = async () => {
        if (this.state.id !== undefined) {
            await deleteQuiz(this.state.id)
        }
        this.props.deleteQuiz(this.props.value._id)
    };


    render() {
        return (
            <ShowQuiz
                quiz_id={this.state.id}
                deleteQuizOnClick={this.deleteQuizOnClick}
                quiz_name={this.state.quiz_name}
                description={this.state.description}
                last_edited_date={this.state.last_edited_date}
                {...this.props}
            />
        );
    }
}

export default Quiz;
