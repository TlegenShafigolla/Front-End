import React from "react"
import {login} from "../services/serverlog"
import {Redirect} from "react-router-dom"
import s from '../css/Login.module.css'
import Button from "@material-ui/core/Button"
import {TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Link from '@material-ui/core/Link'
import logo from "../images/192x192logoGray.png";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            disabledButton: false
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }


    onChangePassword(event) {
        this.setState({password: event.target.value});
    }

    onChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    onClickButton = async () => {
        if (this.state.disabledButton) {
            return;
        }
        this.setState({disabledButton: true})
        await login(this.state.email, this.state.password);
        this.setState({loggedIn: true});
        this.setState({disabledButton: false})

        console.log('ok')
    };

    render() {
        const status = localStorage.getItem('status');

        if (status === 'admin') {
            return <Redirect to='/admin/profile'/>;
        }
        if (status === 'user') {
            return <Redirect to="/user"/>;
        }

        return (
            <div>
                <div className={s.loginPage}>
                    <div className={s.SignIn}>
                        <img className={s.logo} src={logo} alt="Logo"/>
                        <div className={s.input}>
                            <TextField
                                type="email"
                                placeholder="Email"
                                name="email"
                                label='Email'
                                variant='outlined'
                                autoComplete='off'
                                onChange={this.onChangeEmail}
                                autoFocus
                                fullWidth

                            />
                        </div>
                        <div className={s.input}>
                            <TextField
                                fullWidth
                                label='Password'
                                variant='outlined'
                                type="password"
                                placeholder="password"
                                name="password"
                                onChange={this.onChangePassword}
                            />
                        </div>
                        <Button variant='contained' color='primary' onClick={this.onClickButton}>Continue</Button>
                        <div className={s.forgot}>
                                <Link  >Forgot password?</Link>
                                <Link>SignUp</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;

