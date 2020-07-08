export const getSurvey=(state)=>{
  return state.SurveyEditor.surveys
};
export const getId=(state)=>{
  return state.SurveyEditor.id
};
export const disableButton=(state)=>{
  return state.SurveyEditor.disabledButton
};
export const isFetching=(state)=>{
    return state.SurveyEditor.isFetching
};
export const getQuestions = (state) => {
    return state.SurveyEditor.questions
};
export const questionNumberChanged = (state) => {
    return state.SurveyEditor.questionNumberChanged
};
export const errorQuestion = (state) => {
    return state.SurveyEditor.errorQuestion
};
export const questionChanged = (state) => {
    return state.SurveyEditor.questionChanged
};


export const getAnswers=(state)=>{
    return state.SurveyQuestions.answers
};
export const answerChanged=(state)=>{
    return state.SurveyQuestions.answerChanged
};
export const answer=(state)=>{
    return state.SurveyQuestions.answer
};
export const disabledButton=(state)=>{
    return state.SurveyQuestions.disabledButton
};