import React, {useEffect, useState} from "react";
import ShowQuestion from "./showQuestion";
import EditQuestion from "./editQuestion";
import s from '../css/editQuestion.module.css'
import Typography from "@material-ui/core/Typography";
import {Draggable} from "react-beautiful-dnd";
import Alerts from "../../../common/Alert";

const Question = (props) => {
    let [editMode, setMode] = useState(props.value.question.trim() === '');

    useEffect(() => {
        props.requestAnswers(props.value._id, props.index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangePoint = (event, index, id) => {
        props.changePoint(event, index, id);
    };
    const onChangeAnswer = (event, index, id) => {
        props.changeAnswer(event.target.value, index, id)
    };
    useEffect(() => {
        if (props.answers[props.index] !== undefined) {
            if (props.answers[props.index][0].answer.trim() === '') {
                setMode(true)
            }
        }
    }, [props.answers, props.index]);
    const changeType = (index, newType) => {
        props.changeTypes(props.index, newType);
        for (let i = props.answers[index].length - 1; i >= 0; i--) {
            props.deleteAnswersOnclick(props.value._id, props.answers[index][i]._id, index, i);
        }
        props.addNewAnswer(props.index, props.value._id, 1);

    };
    const editOnClick = () => {
        setMode(true)
    };

    const deleteAnswerOnClick = (index, id, number) => {
        if (props.disabledButton) {
            return null;
        }
        props.deleteAnswersOnclick(props.value._id, id, index, number)
    };

    const deleteQuestionOnClick = () => {
        props.deleteQuestion(props.value.quiz_id, props.value._id);
    };

    const saveOnClick = () => {
        if (props.disabledButton && props.disableButton) {
            return;
        }
        if (props.answerChanged) {
            props.saveAnswer(props.answers[props.index], props.value.type, props.value._id, props.index, setMode);
        }
        if (props.questionChanged) {
            props.saveQuestion(props.value.quiz_id, props.questionsqw[props.index], setMode)
        }
        if (!props.questionChanged && !props.answerChanged) {
            setMode(false)
        }
    };


    const onChangeQuestion = (event) => {
        props.changeQuestion(props.index, event.target.value)
    };

    const addNewAnswers = (index) => {
        props.addNewAnswer(index, props.value._id);

    };
    if (editMode) {
        return <> <EditQuestion
            changePoint={onChangePoint}
            deleteAnswerOnClick={deleteAnswerOnClick}
            onChangeAnswer={onChangeAnswer}
            addNewAnswers={addNewAnswers}
            onChangeQuestion={onChangeQuestion}
            saveOnClick={saveOnClick}
            changeType={changeType}
            deleteQuestionOnClick={deleteQuestionOnClick}
            {...props}/>

            <Alerts variant='filled' severity="error" open={props.errorDialog}>
                <Typography>There must be at least 1 correct and 1 incorrect answer</Typography>
            </Alerts>
        </>
    }
    return (
        <Draggable draggableId={props.value._id} index={props.index}>
            {provided => (
                <div {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}
                     className={s.Question}
                >
                    <ShowQuestion editOnClick={editOnClick}
                                  deleteQuestionOnClick={deleteQuestionOnClick}
                                  {...props}/>
                </div>)}</Draggable>
    )
};

export default Question;
