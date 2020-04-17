import React from "react"
import {login} from "../services/serverlog"
import {Redirect} from "react-router-dom"
import s from '../css/Login.module.css'
import Button from "@material-ui/core/Button"
import {TextField} from "@material-ui/core";
import Link from '@material-ui/core/Link'
import logo from "../images/logoPng.png";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            disabledButton: false,
            error:false
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }


    onChangePassword(event) {
        this.setState({password: event.target.value});
        this.setState({error:false})
    }

    onChangeEmail(event) {
        this.setState({email: event.target.value});
        this.setState({error:false})
    }

    onClickButton = async () => {
        if (this.state.disabledButton) {
            return;
        }
        this.setState({disabledButton: true});
        await login(this.state.email, this.state.password).then(data => {
            localStorage.setItem('refresh_token',data['refresh_token']);
            localStorage.setItem("access_token", data["access_token"]);
            localStorage.setItem("status", data["type"]);
            localStorage.setItem('access_time', Date())
             if(data.Status==='Failed') {
                 this.setState({error: true})
             }
        });

        this.setState({loggedIn: true});
        this.setState({disabledButton: false});

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
                                error={this.state.error}
                            />
                        </div>
                        <div className={s.input}>
                            <TextField
                                error={this.state.error}
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
                                <Link underline='none'>Forgot password?</Link>
                                <Link underline='none'>SignUp</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;

