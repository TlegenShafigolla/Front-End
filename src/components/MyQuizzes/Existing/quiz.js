import React from "react";
import ShowQuiz from "../Editing/showQuiz";
import EditDescription from "../Editing/editDescription";
import {deleteQuiz, putQuiz} from "../../../services/adminAPI/quiz";
import {dark} from "@material-ui/core/styles/createPalette";
import home from "../../../pages/home";
import {ServerTimeToUserTime} from "../../../function/ServerTimeToUserTime";

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            id: this.props.value._id,
            description: this.props.value.description,
            quiz_name: this.props.value.quiz_name,
            quizChange: false,
            mixed: this.props.value.mixed,
            points: this.props.value.points,
            showResults: this.props.value.showResults,
            disabledSaveButton: false,
            last_edited_date: null,
        }
    }

    deleteQuizOnClick = async () => {
        if (this.state.id !== undefined) {
            await deleteQuiz(this.state.id)
        }
        this.props.deleteQuiz(this.props.value._id)
    };
    changeDescription = (event) => {
        this.setState({description: event.target.value});
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
        if (this.state.disabledSaveButton) {
            return;
        }
        this.setState({disabledSaveButton: true});
        this.setState({editMode: false});
        if (this.state.quizChange) {
            const quiz = {
                _id: this.state.id,
                quiz_name: this.state.quiz_name,
                description: this.state.description,
                mixed: this.state.mixed,
                points: this.state.points,
                showResults: this.state.showResults,
            };
            await putQuiz(quiz).then(val => {
                console.log(val)
                let dates = new Date(val.last_edited_date);
                this.setState({last_edited_date: dates.toLocaleString()})
            });
            this.setState({quizChange: false})
        }
        this.setState({disabledSaveButton: false});
    };

    componentDidMount() {
        let date = new Date(this.props.value.last_edited_date);
        this.setState({last_edited_date: date.toLocaleString()})
    }


    render() {
        if (this.state.last_edited_date === null) {
            return ''
        }
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
                    last_edited_date={this.state.last_edited_date}
                    {...this.props}
                />
            )
        }
    }
}

export default Quiz;
