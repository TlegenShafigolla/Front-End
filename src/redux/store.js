import {applyMiddleware, combineReducers, createStore} from "redux";
import AuthReducer from "./Auth/Auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import ProfileReducer from "./Profile/Profile-reducer";
import QuestionsReducer from "./QuizEditor/Questions/Questions-reducer";
import QuizEditorReducer from "./QuizEditor/QuizEditor-reducer";
import QuizInviteReducer from "./Invite/Invite-reducer";
let reducers = combineReducers({
    Auth: AuthReducer,
    Profile:ProfileReducer,
    QuizEditor:QuizEditorReducer,
    Questions:QuestionsReducer,
    QuizInvite:QuizInviteReducer,
    form: formReducer,
});
let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;