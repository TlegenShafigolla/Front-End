import React from "react";
import {Draggable} from "react-beautiful-dnd";
import ShowQuestion from "./showQuestion";
import s from "./question.module.css";

class Question extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
            id: this.props.value._id,
            quiz_id: this.props.value.quiz_id,
            answerType: this.props.value.type,
            question: this.props.value.question,
            image: this.props.value.image,
        };
    }

    editOnClick = () => {

    };

    deleteQuestionOnClick = () => {

    };

    render() {
        if(this.state.editMode){
            return (
                <div>Edit Question</div>
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