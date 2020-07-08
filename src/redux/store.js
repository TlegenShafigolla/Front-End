import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import AuthReducer from "./Auth/Auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import ProfileReducer from "./Profile/Profile-reducer";
import QuizQuestionsReducer from "./QuizEditor/Questions/QuizQuestionsReducer";
import QuizEditorReducer from "./QuizEditor/QuizEditor-reducer";
import QuizInviteReducer from "./QuizEditor/Invite/Invite-reducer";
import SurveyEditorReducer from "./SurveyEditor/SurveyEditor-reducer";
import SurveyInviteReducer from "./SurveyEditor/Invite/Invite-reducer";
import SurveyQuestionsReducer from "./SurveyEditor/Questions/SurveyQuestionsReducer";
import GroupReducer from "./Group/group-reducer";

let reducers = combineReducers({
    Auth: AuthReducer,
    Profile: ProfileReducer,
    QuizEditor: QuizEditorReducer,
    SurveyEditor:SurveyEditorReducer,
    QuizQuestions: QuizQuestionsReducer,
    SurveyQuestions:SurveyQuestionsReducer,
    QuizInvite: QuizInviteReducer,
    SurveyInvite: SurveyInviteReducer,
    Groups:GroupReducer,
    form: formReducer,
});
// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers( applyMiddleware(thunkMiddleware)));
export default store;