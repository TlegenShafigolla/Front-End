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
export const questionChanged = (state) => {
    return state.QuizEditor.questionChanged
};
export const errorQuestion = (state) => {
    return state.QuizEditor.errorQuestion
};
export const questionNumberChanged = (state) => {
    return state.QuizEditor.questionNumberChanged
};
export const getQuestions = (state) => {
    return state.QuizEditor.questions
};

export const getAnswers=(state)=>{
    return state.Questions.answers
};
export const answerChanged=(state)=>{
    return state.Questions.answerChanged
};
export const answer=(state)=>{
    return state.Questions.answer
};
export const point=(state)=>{
    return state.Questions.points
};
export const disabledButton=(state)=>{
    return state.Questions.disabledButton
};
export const errorDialog=(state)=>{
    return state.Questions.errorDialog
};
export const errorAnswer=(state)=>{
    return state.Questions.error
};