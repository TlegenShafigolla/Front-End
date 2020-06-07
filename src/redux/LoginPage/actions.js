import {login} from "../../services/API/login";


export const LOGIN = 'LOGIN';

const successLogIn = () => ({type: LOGIN, })
export const LogIn = (email, password) => (dispatch) => {
    login(email, password).then(data => {
        console.log(data)
        if (data.message === "Auth successful") {
            dispatch(successLogIn(true))
            localStorage.setItem("access_token", data["access_token"]);
            localStorage.setItem('access_time', Date());
        }
    });


}
