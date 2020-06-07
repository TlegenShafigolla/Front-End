import React from "react";
import s from "../../css/Login.module.css";
import logo from "../../images/logoPng.png";
import {Link, Redirect} from "react-router-dom";
import LoginForm from "./loginForm";

const SignIn = (props) => {
    let onSubmit = (value) => {
        props.LogIn(value.email,value.password)
    }

    if(props.Auth!==null||localStorage.getItem('access_token')){
      return  <Redirect to='/admin/profile'/>
    }
    return (
        <div className={s.loginPage}>
            <div className={s.SignIn}>
                <img className={s.logo} src={logo} alt="Logo"/>
                <LoginForm Auth={props.Auth} onSubmit={onSubmit}/>
                <div className={s.forgot}>
                    <Link to='#' underline='none'>Forgot password?</Link>
                    <Link to='/registration' underline='none'>Register</Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;