import {login} from "../../services/API/login";
import {stopSubmit} from "redux-form";
import {registration} from "../../services/API/userAPI/registration";

export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER"

const register = () => ({type: REGISTER,})
const successLogIn = (data) => ({type: LOGIN, data})
export const LogIn = (email, password) => (dispatch) => {
    login(email, password).then(data => {
        if (data.message === "Auth successful") {
            localStorage.setItem("access_token", data["access_token"]);
            localStorage.setItem("access_time", Date());
            dispatch(successLogIn(data))
            console.log(data)
        } else {
            let action = stopSubmit("login", {_error: true});
            dispatch(action)
        }
    });
}
export const Registration = (name, surname, password, occupation, email) => (dispatch) => {
    registration(name, surname, password, occupation, email).then(data => {
        if (data.Status === "Success") {
            dispatch(LogIn(email, password))
            dispatch(register())
        } else {
            let action = stopSubmit("registration", {_error: data.message})
            dispatch(action)
        }
        console.log(data)
    })
}

