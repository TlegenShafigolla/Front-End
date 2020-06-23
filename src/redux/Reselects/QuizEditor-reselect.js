export const getQuiz = (state) => {
    return state.QuizEditor.quizzes
};

export const getId = (state) => {
    return state.QuizEditor.id
};
export const isFetching = (state) => {
    return state.QuizEditor.isFetching
};
export const disableButton = (state) => {
    return state.QuizEditor.disabledButton
};
export const getQuestions = (state) => {
    return state.QuizEditor.questions
};
export const getAnswers=(state)=>{
    return state.Questions.answers
};