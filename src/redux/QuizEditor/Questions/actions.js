import {deleteAnswers, getAnswers, postAnswers, putAnswers} from "../../../services/API/adminAPI/Quiz/answers";

export const SET_ANSWERS = "QUESTIONS/SET_ANSWERS";
export const CHANGE_POINT = "QUESTIONS/CHANGE_POINT";
export const CHANGE_ANSWER = "QUESTIONS/CHANGE_ANSWER";
export const DELETE_ANSWER = "QUESTIONS/DELETE_ANSWER";
export const DELETE_ANSWER_SERVER = "QUESTIONS/DELETE_ANSWER_SERVER";
export const ADD_NEW_ANSWER = "QUESTIONS/ADD_NEW_ANSWER";
export const DISABLE_BUTTON = "QUESTIONS/DISABLE_BUTTON";
export const CHANGE_ANSWER_FALSE = "QUESTIONS/CHANGE_ANSWER_FALSE";
export const OPEN_ERROR_DIALOG = "QUESTIONS/OPEN_ERROR_DIALOG";
export const ERROR = "QUESTIONS/ERROR";

const setAnswers = (index, data) => ({type: SET_ANSWERS, index, data});
const deleteAnswerServer = (id, index) => ({type: DELETE_ANSWER_SERVER, id, index});
const disableButton = (data) => ({type: DISABLE_BUTTON, data});
const answerChanged = () => ({type: CHANGE_ANSWER_FALSE});
const openErrorDialog = () => ({type: OPEN_ERROR_DIALOG});
const Error = () => ({type: ERROR});

export const deleteAnswer = (id, index,) => ({type: DELETE_ANSWER, index, id});
export const changePoint = (point, index, id) => ({type: CHANGE_POINT, index, id, point});
export const changeAnswer = (value, index, id,) => ({type: CHANGE_ANSWER, value, index, id});
export const addNewAnswer = (index, id, point = 0) => (
    {
        type: ADD_NEW_ANSWER, index, data: {
            question_id: id,
            answer: "",
            correct: 0,
            points: point,
        }
    });

export const requestAnswers = (id, index) => async (dispatch) => {
    let data = await getAnswers(id);
    await dispatch(setAnswers(index, data.answers));
    if (await data.answers.length === 0) {
        dispatch(addNewAnswer(index, id, 1))
    }
};
export const saveAnswer = (answer, type, id, index, mode) => async (dispatch) => {
    dispatch(disableButton(true));
    let wrong = 0;
    let empty = 0;
    for (let j = 0; j < answer.length; j++) {
        if (answer[j].answer === '') {
            empty = 1
        }
        if (answer[j].points === 0) {
            wrong++
        }
    }
    let corrects = answer.length - wrong;
    if (empty === 0) {
        if (type === 'MULTIPLE CHOICE' ? corrects > 0 && wrong > 0 : wrong === 0) {
            await Promise.all(answer.map(async value => {
                if ('_id' in value) {
                    await putAnswers(id, value);
                } else {
                    await postAnswers(id, value);
                }
            }))
                .then(() => {
                    dispatch(answerChanged(false));
                    dispatch(requestAnswers(id, index));
                    dispatch(disableButton(false))
                });
        } else {
            dispatch(openErrorDialog());
        }
    } else {
        dispatch(Error())
    }
};

export const deleteAnswersOnclick = (question_id, answer_id, index, id) => async (dispatch) => {
    dispatch(disableButton(true));
    if (answer_id !== undefined) {
        let data = await deleteAnswers(question_id, answer_id);
        dispatch(deleteAnswerServer(data._id, index));
    } else (dispatch(deleteAnswer(id, index)));
    dispatch(disableButton(false))
};