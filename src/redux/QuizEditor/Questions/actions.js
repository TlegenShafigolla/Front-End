import {getAnswers} from "../../../services/API/adminAPI/Quiz/answers";

export const SET_ANSWERS = "QUESTIONS/SET_ANSWERS";
export const CHANGE_POINT = "QUESTIONS/CHANGE_POINT";
export const CHANGE_ANSWER = "QUESTIONS/CHANGE_ANSWER";
export const DELETE_ANSWER = "QUESTIONS/DELETE_ANSWER";
export const ADD_NEW_ANSWER = "QUESTIONS/ADD_NEW_ANSWER";

const setAnswers = (data) => ({type: SET_ANSWERS, data});

export const changePoint = (index, id, point) => ({type: CHANGE_POINT, index, id, point});
export const changeAnswer = (value, index, id,) => ({type: CHANGE_ANSWER, value, index, id});
export const deleteAnswer = (index, id,) => ({type: DELETE_ANSWER, index, id});
export const addNewAnswer = (index) => (
    {
    type: ADD_NEW_ANSWER, index, data: {
            answer: "",
            correct: 0,
            points: 0,
    }
});

export const requestAnswers = (id) => async (dispatch) => {
    let data = await getAnswers(id);
    dispatch(setAnswers(data.answers));
    console.log(data)
};