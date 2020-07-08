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
    return state.QuizQuestions.answers
};
export const answerChanged=(state)=>{
    return state.QuizQuestions.answerChanged
};
export const answer=(state)=>{
    return state.QuizQuestions.answer
};
export const point=(state)=>{
    return state.QuizQuestions.points
};
export const disabledButton=(state)=>{
    return state.QuizQuestions.disabledButton
};
export const errorDialog=(state)=>{
    return state.QuizQuestions.errorDialog
};
export const errorAnswer=(state)=>{
    return state.QuizQuestions.error
};