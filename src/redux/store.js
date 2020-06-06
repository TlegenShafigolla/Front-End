import {combineReducers, createStore} from "redux";
import LoginReducer from "./login-reducer";

let reducers = combineReducers({
    loginPage: LoginReducer,
});
let store = createStore(reducers);
export default store;