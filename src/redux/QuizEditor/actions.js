import getQuiz, {deleteQuiz, postQuiz, putQuiz} from "../../services/API/adminAPI/Quiz/quiz";
import getQuestions, {deleteQuestions, postQuestions, putQuestions} from "../../services/API/adminAPI/Quiz/questions";
import {deleteAnswer} from "./Questions/actions";

export const QUIZ_LIST = "QUIZ_EDITOR/QUIZ_LIST";
export const IS_FETCHING = "QUIZ_EDITOR/IS_FETCHING";
export const DISABLE_BUTTON = "QUIZ_EDITOR/DISABLE_BUTTON";
export const PUSH_QUIZ = "QUIZ_EDITOR/PUSH_QUIZ";
export const DELETE_QUIZ = "QUIZ_EDITOR/DELETE_QUIZ";
export const SET_QUESTIONS = "QUIZ_EDITOR/SET_QUESTIONS";
export const ADD_QUESTION = "QUIZ_EDITOR/ADD_QUESTION";
export const CHANGE_QUESTION_NAME = "QUIZ_EDITOR/CHANGE_QUESTION_NAME";
export const DELETE_QUESTION = "QUIZ_EDITOR/DELETE_QUESTION";
export const QUESTION_NUMBER_CHANGED = "QUIZ_EDITOR/QUESTION_CHANGED";
export const CHANGE_TYPE = "QUIZ_EDITOR/CHANGE_TYPE";
export const FALSE = "QUIZ_EDITOR/FALSE";
export const ERROR_QUESTION = "QUIZ_EDITOR/ERROR_QUESTION";
export const POINTS_CHECKED = "QUIZ_EDITOR/POINTS_CHECKED";
export const EDIT_DESCRIPTION = "QUIZ_EDITOR/EDIT_DESCRIPTION";
export const EDIT_QUIZ_NAME = "QUIZ_EDITOR/EDIT_QUIZ_NAME";

const setQuizList = (data) => ({type: QUIZ_LIST, data});
const pushQuiz = (data) => ({type: PUSH_QUIZ, data});
const setQuestions = (data) => ({type: SET_QUESTIONS, data});
const disableButton = (data) => ({type: DISABLE_BUTTON, data});
const isFetching = (data) => ({type: IS_FETCHING, data});
const popQuiz = (data) => ({type: DELETE_QUIZ, data});
const addQuestion = (data) => ({type: ADD_QUESTION, data});
const deleteQuestionDispatch = (data) => ({type: DELETE_QUESTION, data});
const questionChangeFalse = (data) => ({type: FALSE, data});
const errorQuestion = () => ({type: ERROR_QUESTION});

export const editDescription = (data) => ({type: EDIT_DESCRIPTION, data});
export const editQuizName = (data) => ({type: EDIT_QUIZ_NAME, data});
export const pointChecked=(data)=>({type:POINTS_CHECKED,data});
export const questionsChanged = (data) => ({type: QUESTION_NUMBER_CHANGED, data});
export const changeQuestion = (index, data) => ({type: CHANGE_QUESTION_NAME, index, data});
export const changeTypes = (index, data) => ({type: CHANGE_TYPE, data, index});
export const addNewQuiz = () => async (dispatch) => {
    dispatch(disableButton(true));
    const newQuiz = {
        quiz_name: "Quiz name",
        description: "Description",
        mixed: null,
        showResults: null,
        points: null,
    };
    let data = await postQuiz(newQuiz);
    dispatch(pushQuiz(data));
    dispatch(disableButton(false))
};
export const deleteQuizzes = (id) => async (dispatch) => {
    dispatch(disableButton(true));
    let data = await deleteQuiz(id);
    dispatch(popQuiz(data));
    dispatch(disableButton(false))
};
export const requestQuiz = () => async (dispatch) => {
    dispatch(isFetching(true));
    let data = await getQuiz();
    dispatch(setQuizList(data.quizzes));
    dispatch(isFetching(false))
};

export const requestQuestions = (id) => async (dispatch) => {
    let data = await getQuestions(id);
    dispatch(setQuestions(data))
};
export const addQuestions = (order_id, id,) => async (dispatch) => {
    dispatch(disableButton(true));
    const question = {
        order_id: order_id + 1,
        quiz_id: id,
        image: null,
        question: " ",
        type: "FILL THE BLANK"
    };
    let data = await postQuestions(id, [question]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(addQuestion(data.created[0]));
    dispatch(disableButton(false))
};
export const PutQuiz=(quiz)=>async ()=>{
    await putQuiz(quiz);
};
export const saveQuestion = (id, question) => async (dispatch) => {
    dispatch(disableButton(true));
    if (question.question.trim() !== '') {
     let data= await putQuestions(id, question);
        if(data!==null){
            dispatch(questionChangeFalse(false));
        }
    } else {
        dispatch(errorQuestion())
    }
    dispatch(disableButton(false))
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
