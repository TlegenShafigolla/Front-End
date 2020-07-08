import getSurvey, {deleteSurvey, postSurvey, putSurvey} from "../../services/API/adminAPI/Survey/survey";
import getQuestions, {deleteQuestions, postQuestions, putQuestions} from "../../services/API/adminAPI/Survey/questions";
import {deleteAnswer} from "./Questions/actions";

export const DISABLE_BUTTON = "SURVEY_EDITOR/DISABLE_BUTTON";
export const PUSH_SURVEY = "SURVEY_EDITOR/PUSH_QUIZ";
export const IS_FETCHING = "SURVEY_EDITOR/IS_FETCHING";
export const SURVEY_LIST = "SURVEY_EDITOR/SURVEY_LIST";
export const DELETE_SURVEY = "SURVEY_EDITOR/DELETE_SURVEY";
export const EDIT_SURVEY_NAME = "SURVEY_EDITOR/EDIT_SURVEY_NAME";
export const SET_QUESTIONS = "SURVEY_EDITOR/SET_QUESTIONS";
export const EDIT_DESCRIPTION = "SURVEY_EDITOR/EDIT_DESCRIPTION";
export const ADD_QUESTION = "SURVEY_EDITOR/ADD_QUESTION";
export const QUESTION_NUMBER_CHANGED = "SURVEY_EDITOR/QUESTION_NUMBER_CHANGED";
export const CHANGE_QUESTION_NAME = "SURVEY_EDITOR/CHANGE_QUESTION_NAME";
export const CHANGE_TYPE = "SURVEY_EDITOR/CHANGE_TYPE";
export const FALSE = "SURVEY_EDITOR/FALSE";
export const ERROR_QUESTION = "SURVEY_EDITOR/ERROR_QUESTION";
export const DELETE_QUESTION = "SURVEY_EDITOR/DELETE_QUESTION";

const disableButton = (data) => ({type: DISABLE_BUTTON, data});
const pushSurvey = (data) => ({type: PUSH_SURVEY, data});
const isFetching = (data) => ({type: IS_FETCHING, data});
const setSurveyList = (data) => ({type: SURVEY_LIST, data});
const popSurvey = (data) => ({type: DELETE_SURVEY, data});
const addQuestion = (data) => ({type: ADD_QUESTION, data});
const questionChangeFalse = (data) => ({type: FALSE, data});
const setQuestions = (data) => ({type: SET_QUESTIONS, data});
const errorQuestion = () => ({type: ERROR_QUESTION});
const deleteQuestionDispatch = (data) => ({type: DELETE_QUESTION, data});


export const changeQuestion = (index, data) => ({type: CHANGE_QUESTION_NAME, index, data});
export const questionsChanged = (data) => ({type: QUESTION_NUMBER_CHANGED, data});
export const editSurveyName = (data) => ({type: EDIT_SURVEY_NAME, data});
export const editDescription = (data) => ({type: EDIT_DESCRIPTION, data});
export const changeTypes = (index, data) => ({type: CHANGE_TYPE, data, index});

export const requestQuestions = (id) => async (dispatch) => {
    let data = await getQuestions(id);
    dispatch(setQuestions(data))
};
export const addQuestions = (order_id, id,) => async (dispatch) => {
    dispatch(disableButton(true));
    const question = {
        order_id: order_id + 1,
        survey_id: id,
        image: null,
        question: " ",
        type: "FILL THE BLANK",
        required: false,
    };
    let data = await postQuestions(id, [question]);
    dispatch(addQuestion(data["created"][0]));
    dispatch(disableButton(false))
};
export const deleteSurveys = (id) => async (dispatch) => {
    dispatch(disableButton(true));
    let data = await deleteSurvey(id);
    dispatch(popSurvey(data));
    dispatch(disableButton(false))
};
export const requestSurvey = () => async (dispatch) => {
    dispatch(isFetching(true));
    let data = await getSurvey();
    dispatch(setSurveyList(data.surveys));
    dispatch(isFetching(false))
};
export const saveQuestion = (id, question,mode) => async (dispatch) => {
    dispatch(disableButton(true));
    if (question.question.trim() !== '') {
        mode(false);
        let data = await putQuestions(id, question);
        if (data !== null) {
            dispatch(questionChangeFalse(false));
        }
    } else {
        dispatch(errorQuestion())
    }
    dispatch(disableButton(false))
};
export const addNewSurvey = () => async (dispatch) => {
    dispatch(disableButton(true));
    const newSurvey = {
        survey_name: "Survey",
        description: "Description"
    };
    let data = await postSurvey(newSurvey);
    dispatch(pushSurvey(data));
    dispatch(disableButton(false))
};
export const PutSurvey = (survey) => async () => {
    await putSurvey(survey);
};
export const deleteQuestion = (quiz_id, question_id) => async (dispatch) => {
    dispatch(disableButton(true));
    let data = await deleteQuestions(quiz_id, question_id);
    dispatch(deleteAnswer(null, data.order_id - 1));
    dispatch(deleteQuestionDispatch(data));
    dispatch(disableButton(false));
};
export const PutQuestion = (id, questions) => async () => {
    await putQuestions(id, questions);
};
