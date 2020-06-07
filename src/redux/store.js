import {applyMiddleware, combineReducers, createStore} from "redux";
import AuthReducer from "./Auth/Auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
let reducers = combineReducers({
    Auth: AuthReducer,
    form: formReducer,
});
let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;