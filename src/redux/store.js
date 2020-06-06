import {combineReducers, createStore} from "redux";
import LoginReducer from "./LoginPage/login-reducer";

let reducers = combineReducers({
    loginPage: LoginReducer,
});
let store = createStore(reducers);
window.store=store;
export default store;