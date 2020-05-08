import React from "react";
import s from '../css/SignUp.module.css'
import Registration from "../components/SignUp/SignUp";

class Signup extends React.Component {


    render() {
        return (
            <div className={s.registrationPage}>
              <Registration/>
            </div>
        );
    }
}

export default Signup;