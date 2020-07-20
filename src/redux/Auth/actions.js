    import {login} from "../../services/API/login";
import {stopSubmit} from "redux-form";
import {registration} from "../../services/API/userAPI/registration";
import Profile from "../../services/API/adminAPI/profile";

export const GET_PROFILE = "AUTH/GET_PROFILE";
export const LOGIN = "AUTH/LOGIN";
export const REGISTER = "AUTH/REGISTER";
export const LOGOUT = "AUTH/LOGOUT";
export const ERROR = "AUTH/ERROR";

const profile = (data) => ({type: GET_PROFILE, data});
const register = () => ({type: REGISTER,});

export const logout = () => ({type: LOGOUT,});
export const requestProfile = (push) => async (dispatch) => {
    let data = await Profile();
    if (data === "403") {
        dispatch(logout())
    } else {
        dispatch(profile(data))
        if (push !== null) {
            push('/admin/profile')
        }
    }
};
export const LogIn = (email, password, push) => async (dispatch) => {
    let data = await login(email, password);
    if (data.message === "Auth successful") {
        localStorage.setItem("access_token", data["access_token"]);
        localStorage.setItem("access_time", Date());
        dispatch(requestProfile(push))
    } else {
        let action = stopSubmit("login", {_error: true});
        dispatch(action)
    }
};
export const Registration = (name, surname, password, occupation, email) => async (dispatch) => {
    let data = await registration(name, surname, password, occupation, email);
    if (data.Status === "Success") {
        dispatch(LogIn(email, password));
        dispatch(register())
    } else {
        let action = stopSubmit("registration", {_error: data.message});
        dispatch(action)
    }
};

