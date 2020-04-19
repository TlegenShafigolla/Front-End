import React from "react";
import s from '../css/SignUp.module.css'
import logo from "../images/logoPng.png";
import {TextField, Button, Snackbar} from "@material-ui/core";
import {registration} from "../services/userAPI/registration";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            surname: '',
            password: '',
            occupation: '',
            confirmPassword: '',
            errorEmail: false,
            errorName: false,
            errorPassword: false,
            errorSurname: false,
            errorOccupation: false,
            openErrorSnackbar: false,
            openSnackbar: false
        }
    }

    onChangeEmail = (event) => {
        this.setState({email: event.target.value})
        this.setState({errorEmail: false})
    };
    onChangeName = (event) => {
        this.setState({name: event.target.value})
        this.setState({errorName: false})
    };
    onChangeSurname = (event) => {
        this.setState({surname: event.target.value})
        this.setState({errorSurname: false})
    };
    onChangeOccupation = (event) => {
        this.setState({occupation: event.target.value})
        this.setState({errorOccupation: false})
    };
    onChangePassword = (event) => {
        this.setState({password: event.target.value})
        this.setState({errorPassword: false})
    };
    onChangeConfirmPassword = (event) => {
        this.setState({confirmPassword: event.target.value})
        this.setState({errorPassword: false})
    };
    onClose = () => {
        this.setState({openErrorSnackbar: false})
        this.setState({openSnackbar: false})
    };
    onClickSubmitButton = async () => {
        let email = this.state.email;
        let name = this.state.name.trim();
        let surname = this.state.surname.trim();
        let occupation = this.state.occupation.trim();
        let password = this.state.password.trim();
        let emailTest = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
        let confirmPassword = this.state.confirmPassword.trim();
        if (!emailTest.test(email)) {
            this.setState({errorEmail: true})
        }
        if (name === '') {
            this.setState({errorName: true})
        }
        if (surname === '') {
            this.setState({errorSurname: true})
        }
        if (password === '' || password !== confirmPassword) {
            this.setState({errorPassword: true})
        }
        if (occupation === '') {
            this.setState({errorOccupation: true})
        }

        if (emailTest.test(email) && name !== '' && surname !== '' && occupation !== '' && password === confirmPassword && password !== '') {
            await registration(name, surname, password, occupation, email).then(val => {
                if (val.status !== 'Success') {
                    this.setState({openErrorSnackbar: true})
                }
            })
        }
        ;
    }

    render() {

        return (
            <div className={s.registrationPage}>
                <div className={s.SignUp}>
                    <img className={s.logo} src={logo} alt="Logo"/>
                    <TextField
                        error={this.state.errorEmail}
                        margin='dense'
                        type="email"
                        name="email"
                        label='Email'
                        variant='outlined'
                        autoComplete='off'
                        onChange={this.onChangeEmail}
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        error={this.state.errorName}
                        margin='dense'
                        type='name'
                        name="name"
                        label='Name'
                        variant='outlined'
                        autoComplete='off'
                        onChange={this.onChangeName}
                        fullWidth
                    />
                    <TextField
                        error={this.state.errorSurname}
                        margin='dense'
                        type="surname"
                        name="surname"
                        label='Surname'
                        variant='outlined'
                        autoComplete='off'
                        onChange={this.onChangeSurname}
                        fullWidth
                    />
                    <TextField
                        error={this.state.errorOccupation}
                        margin='dense'
                        type="occupation"
                        name="occupation"
                        label='Occupation'
                        variant='outlined'
                        autoComplete='off'
                        onChange={this.onChangeOccupation}
                        fullWidth
                    />
                    <TextField
                        error={this.state.errorPassword}
                        margin='dense'
                        fullWidth
                        label='Password'
                        variant='outlined'
                        type="password"
                        name="password"
                        onChange={this.onChangePassword}
                    />
                    <TextField
                        error={this.state.errorPassword}
                        margin='dense'
                        fullWidth
                        label='Confirm password'
                        variant='outlined'
                        type="password"
                        name="password"
                        onChange={this.onChangeConfirmPassword}
                    />
                    <div className={s.Button}>
                        <Button onClick={this.onClickSubmitButton} variant='contained' color='primary'>Submit</Button>
                    </div>
                </div>
                <Snackbar
                    open={this.state.openErrorSnackbar}
                    autoHideDuration={6000}
                    onClose={this.onClose}>
                    <div className={s.snackbar} color={'secondary'}>
                        <div><ErrorOutlineIcon/></div>
                        Admin with such email {this.state.email} already exists
                    </div>
                </Snackbar>
                <Snackbar
                    open={this.state.openSnackbar}
                    autoHideDuration={6000}
                    onClose={this.onClose}>
                    <div className={s.success} color={'secondary'}>
                        <div><ErrorOutlineIcon/></div>
                        Success
                    </div>
                </Snackbar>
            </div>
        );
    }
}

export default SignUp;