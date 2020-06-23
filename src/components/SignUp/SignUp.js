import React, {useState} from 'react'
import s from "../../css/SignUp.module.css";
import logo from "../../images/logoPng.png";
import {Redirect} from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import Alerts from "../common/Alert";

const RegistrationPage = (props) => {
    let [ErrorSnackbarPassword, openErrorSnackBar] = useState(false)
    let onSubmit = (value) => {
        if (value.password !== value.confirmPassword) {
            openErrorSnackBar(true)
        } else {
            props.Registration(value.name, value.surname, value.password, value.occupation, value.email)
        }
    }
    if (props.register) {
        return <Redirect to="/admin/profile"/>
    }
    return (
        <div className={s.registrationPage}>
            <div className={s.SignUp}>
                <img className={s.logo} src={logo} alt="Logo"/>
                <RegistrationForm onSubmit={onSubmit}/>
            </div>
            <Alerts open={ErrorSnackbarPassword} variant="filled" severity="error"
                    children={"Passwords do not match"}/>
        </div>
    )
}

export default RegistrationPage;