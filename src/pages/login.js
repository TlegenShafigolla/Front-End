import React from "react"

import s from '../css/Login.module.css'
import SignIn from "../components/Login/login";

class Login extends React.Component {


    render() {

        return (
            <div>
                <div className={s.loginPage}>
                    <SignIn/>
                </div>
            </div>
        );
    }
}

export default Login;

