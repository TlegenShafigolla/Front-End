import React, {useEffect, useState} from "react";
import {Draggable} from "react-beautiful-dnd";
import ShowQuestion from "./showQuestion";
import s from "../question.module.css";
import EditQuestion from "./editQuestion";

const Question = (props) => {
    useEffect(() => {
        props.requestAnswers(props.value._id, props.index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [editMode, setMode] = useState(props.value.question.trim() === '');

    const editOnClick = () => {
        setMode(true)
    };

    const deleteQuestionOnClick =  () => {
        props.deleteQuestion(props.value.survey_id, props.value._id);
    };

    const deleteAnswer = (index, id, number) => {
        if (props.disabledButton) {
            return null;
        }
        props.deleteAnswersOnclick(props.value._id, id, index, number)
    };

    const onChangeAnswer = (event, index, id) => {
        props.changeAnswer(event.target.value, index, id)
    };

    const addNewAnswers = () => {
        props.addNewAnswer(props.index, props.value._id);
    };

    const onChangeQuestion = (event) => {
        props.changeQuestion(props.index, event.target.value)
    };

    const saveOnClick = async () => {
        if (props.disabledButton && props.disableButton) {
            return;
        }
        if (props.answerChanged) {
            props.saveAnswer(props.answers[props.index], props.value.type, props.value._id, props.index,);
        }
        if (props.questionChanged) {
            props.saveQuestion(props.value.survey_id, props.questionsqw[props.index],setMode )
        }else {
            setMode(false)
        }
    };

    const changeType = (index, newType) => {
        props.changeTypes(props.index, newType);
        for (let i = props.answers[index].length - 1; i >= 0; i--) {
            props.deleteAnswersOnclick(props.value._id, props.answers[index][i]._id, index, i);
        }
    };
    if (editMode) {
        return (
                            <EditQuestion
                                deleteAnswer={deleteAnswer}
                                onChangeAnswer={onChangeAnswer}
                                addNewAnswers={addNewAnswers}
                                onChangeQuestion={onChangeQuestion}
                                saveOnClick={saveOnClick}
                                changeType={changeType}
                                deleteQuestionOnClick={deleteQuestionOnClick}
                                {...props}/>
        );
    }
    return (
        <Draggable draggableId={props.value._id} index={props.index}>
            {provided => (
                <div {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}
                     className={s.Survey}>
                    <ShowQuestion editOnClick={editOnClick}
                                  deleteQuestionOnClick={deleteQuestionOnClick}
                                  {...props}/>
                </div>)}
        </Draggable>
    );
};

export default Question;