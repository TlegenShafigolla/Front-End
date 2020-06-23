import getQuiz, {deleteQuiz, postQuiz} from "../../services/API/adminAPI/Quiz/quiz";
import getQuestions, {postQuestions} from "../../services/API/adminAPI/Quiz/questions";

export const QUIZ_LIST = "QUIZ_EDITOR/QUIZ_LIST";
export const GROUPS = "QUIZ_EDITOR/GROUPS";
export const IS_FETCHING = "QUIZ_EDITOR/IS_FETCHING";
export const DISABLE_BUTTON = "QUIZ_EDITOR/DISABLE_BUTTON";
export const PUSH_QUIZ = "QUIZ_EDITOR/PUSH_QUIZ";
export const DELETE_QUIZ = "QUIZ_EDITOR/DELETE_QUIZ";
export const SET_QUESTIONS = "QUIZ_EDITOR/SET_QUESTIONS";
export const ADD_QUESTION = "QUIZ_EDITOR/ADD_QUESTION";

const setQuizList = (data) => ({type: QUIZ_LIST, data});
const pushQuiz = (data) => ({type: PUSH_QUIZ, data});
const setQuestions = (data) => ({type: SET_QUESTIONS, data});
const disableButton = (data) => ({type: DISABLE_BUTTON, data});
const isFetching = (data) => ({type: IS_FETCHING, data});
const popQuiz = (data) => ({type: DELETE_QUIZ, data});
const addQuestion=(data)=>({type: ADD_QUESTION,data});

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
export const addNewQuestion = (order_id, id) => async (dispatch) => {
    dispatch(disableButton(true));
    const question = {
        order_id: order_id+1,
        quiz_id: id,
        image: null,
        question: " ",
        type: "FILL THE BLANK"
    };
    let data = await postQuestions(id,[question]);
    console.log(data);
    dispatch(addQuestion(data.created[0]));
    dispatch(disableButton(false))
};