import {applyMiddleware, combineReducers, createStore} from "redux";
import LoginReducer from "./LoginPage/login-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
let reducers = combineReducers({
    loginPage: LoginReducer,
    form: formReducer,
});
let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;