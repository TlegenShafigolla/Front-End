import React from 'react'
import s from "../../css/SignUp.module.css";
import logo from "../../images/logoPng.png";
import {Button, Snackbar, TextField} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {registration} from "../../services/API/userAPI/registration";
import {Link, Redirect} from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import Alerts from "../common/Alert";

class RegistrationPage extends React.Component {
    state = {
        openErrorSnackbarPassword: false,
    }

    onSubmit = (value) => {
        if (value.password !== value.confirmPassword) {
            this.setState({openErrorSnackbarPassword: true})
        } else {
            this.props.Registration(value.name, value.surname, value.password, value.occupation, value.email)
        }
    }

    render() {
        if (this.props.register) {
           return <Redirect to="/admin/profile"/>
        }
        return (
            <div className={s.registrationPage}>
                <div className={s.SignUp}>
                    <img className={s.logo} src={logo} alt="Logo"/>
                    <RegistrationForm onSubmit={this.onSubmit}/>
                </div>
                <Alerts open={this.state.openErrorSnackbarPassword} variant="filled" severity="error"
                        children={"Passwords do not match"}/>
            </div>
        )
    }
}

export default RegistrationPage;