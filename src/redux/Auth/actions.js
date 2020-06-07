import {login} from "../../services/API/login";
import {stopSubmit} from "redux-form";


export const LOGIN = "LOGIN";

const successLogIn = (data) => ({type: LOGIN, data})
export const LogIn = (email, password) => (dispatch) => {
    login(email, password).then(data => {
        if (data.message === "Auth successful") {
            localStorage.setItem("access_token", data["access_token"]);
            localStorage.setItem("access_time", Date());
            dispatch(successLogIn(data))
        } else {
            let action = stopSubmit("login",{_error:true});
            dispatch(action)
        }
    });


}
