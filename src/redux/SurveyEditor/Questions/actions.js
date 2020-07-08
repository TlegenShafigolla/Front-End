import {deleteAnswers, getAnswers, postAnswers, putAnswers} from "../../../services/API/adminAPI/Survey/answers";

export const SET_ANSWERS = "SURVEY_QUESTIONS/SET_ANSWERS";
export const CHANGE_ANSWER = "SURVEY_QUESTIONS/CHANGE_ANSWER";
export const DELETE_ANSWER = "SURVEY_QUESTIONS/DELETE_ANSWER";
export const DELETE_ANSWER_SERVER = "SURVEY_QUESTIONS/DELETE_ANSWER_SERVER";
export const ADD_NEW_ANSWER = "SURVEY_QUESTIONS/ADD_NEW_ANSWER";
export const DISABLE_BUTTON = "SURVEY_QUESTIONS/DISABLE_BUTTON";
export const CHANGE_ANSWER_FALSE = "SURVEY_QUESTIONS/CHANGE_ANSWER_FALSE";

const setAnswers = (index, data) => ({type: SET_ANSWERS, index, data});
const deleteAnswerServer = (id, index) => ({type: DELETE_ANSWER_SERVER, id, index});
const disableButton = (data) => ({type: DISABLE_BUTTON, data});
const answerChanged = () => ({type: CHANGE_ANSWER_FALSE});

export const deleteAnswer = (id, index,) => ({type: DELETE_ANSWER, index, id});
export const changeAnswer = (value, index, id,) => ({type: CHANGE_ANSWER, value, index, id});
export const addNewAnswer = (index, id,) => (
    {
        type: ADD_NEW_ANSWER, index, data: {
            question_id: id,
            answer: "",
        }
    });

export const requestAnswers = (id, index) => async (dispatch) => {
    let data = await getAnswers(id);
    await dispatch(setAnswers(index, data.answers));
};
export const saveAnswer = (answer, type, id, index,) => async (dispatch) => {
    dispatch(disableButton(true));
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
};

export const deleteAnswersOnclick = (question_id, answer_id, index, id) => async (dispatch) => {
    dispatch(disableButton(true));
    if (answer_id !== undefined) {
        let data = await deleteAnswers(question_id, answer_id);
        dispatch(deleteAnswerServer(data._id, index));
    } else (dispatch(deleteAnswer(id, index)));
    dispatch(disableButton(false))
};